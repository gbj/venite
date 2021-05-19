import { Injectable, Inject } from "@angular/core";

import { Reminder } from "./reminder";
import {
  BibleServiceInterface,
  PlatformServiceInterface,
  BIBLE_SERVICE,
  PLATFORM_SERVICE,
} from "@venite/ng-service-api";
import { RemindersConfig } from "./reminders-config";
import { BibleReadingVerse } from "@venite/ldf";

import {
  ActionPerformed,
  LocalNotificationActionPerformed,
  LocalNotifications,
  PendingResult,
} from "@capacitor/local-notifications";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ReminderService {
  pending: PendingResult;

  constructor(
    @Inject("reminder-config") private config: RemindersConfig,
    @Inject(BIBLE_SERVICE) private bible: BibleServiceInterface,
    @Inject(PLATFORM_SERVICE) private platform: PlatformServiceInterface,
    private router: Router
  ) {
    if (!this.platform.is("server") && this.platform.is("capacitor")) {
      this.loadPending();
      LocalNotifications.addListener(
        "localNotificationActionPerformed",
        (event: ActionPerformed) => {
          console.log("localNotificationActionPerformed", this.config);
          const url = this.config.url;
          if (url) {
            this.router.navigateByUrl(url);
          }
        }
      );
    }
  }

  async loadPending() {
    this.pending = await LocalNotifications.getPending();
  }

  async clear() {
    if (this.pending?.notifications?.length > 0) {
      LocalNotifications.cancel(this.pending);
    }
    this.pending = await LocalNotifications.getPending();
  }

  async schedule(reminders: Reminder[]) {
    await this.clear();
    let notifications = await Promise.all(
      reminders
        .filter((reminder) => !!reminder.active)
        .map(async (reminder) => {
          // reminder.time is an ISO 8601 format like 2020-03-02T11:51:37.265-05:00
          const [hour, minute] = reminder.time.split(":");
          return {
            title: reminder.title,
            body: await this.getMessage(parseInt(hour)),
            id: new Date().getTime(),
            extra: this.config.url,
            schedule: {
              on: {
                hour: parseInt(hour),
                minute: parseInt(minute),
              },
            },
          };
        })
    );

    console.log(`scheduling notifications: ${JSON.stringify(notifications)}`);

    await LocalNotifications.requestPermissions();

    const scheduled = await LocalNotifications.schedule({ notifications });
  }

  async getMessage(hour: number): Promise<string> {
    let timeOfDay: string = "night";
    if (hour >= 4 && hour <= 10) {
      timeOfDay = "morning";
    } else if (hour >= 11 && hour <= 14) {
      timeOfDay = "noon";
    } else if (hour >= 15 && hour <= 19) {
      timeOfDay = "evening";
    }

    try {
      const verses = VERSES[timeOfDay],
        randomVerse = verses[Math.floor(Math.random() * verses.length)],
        bibleReading = await this.bible
          .getText(randomVerse, this.config?.bibleVersion || "ESV")
          .toPromise(),
        bibleText = bibleReading.value
          ?.flat()
          .map(
            (verse) =>
              verse.hasOwnProperty("text") && (verse as BibleReadingVerse).text
          )
          .join("")
          .replace("(ESV)", "")
          .replace(/\s+/g, " ")
          .trim();
      if (!bibleText) {
        throw new Error(
          `Bible API returned an empty text for ${randomVerse} (${
            this.config?.bibleVersion || "ESV"
          })`
        );
      }
      return `“${bibleText}” – ${randomVerse}`;
    } catch (e) {
      console.warn(e);
      return "“I was glad when they said to me, ‘Let us go to the house of the Lord!’” – Psalm 122:1";
    }
  }
}

const VERSES = {
  morning: ["Psalm 5:3", "Psalm 55:17", "Psalm 119:164", "Mark 1:35"],
  noon: ["Psalm 55:17", "Daniel 6:10", "Acts 10:9"],
  evening: ["Psalm 55:17", "Daniel 6:10", "Acts 3:1", "Psalm 119:164"],
  night: ["Psalm 119:164", "Psalm 63:5-6", "Psalm 134:1", "Acts 16:25"],
};
