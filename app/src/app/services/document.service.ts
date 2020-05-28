import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, from } from 'rxjs';

import { LiturgicalDocument, Liturgy } from '@venite/ldf';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private readonly afs: AngularFirestore) { }

  getLiturgyOptions(language : string, version : string) : Observable<Liturgy[]> {
    return from([
      new Array(
        new Liturgy({
          type: 'liturgy',
          language: 'en',
          version: 'Rite-II',
          slug: 'evening_prayer',
          label: 'Evening Prayer',
          metadata: {
            evening: true,
            preferences: {
                "lectionary": {
                  "label": "Lectionary",
                  "category": "Cycles and Tables",
                  "options": [
                    {
                      "value": "bcp1979_daily_office",
                      "label": "Daily Office Lectionary",
                      "whentype": "year"
                    },
                    {
                      "value": "rclsunday",
                      "label": "Revised Common Lectionary (RCL)",
                      "whentype": "date"
                    }
                  ]
                },
                "psalter": {
                  "label": "Psalm Cycle",
                  "category": "Cycles and Tables",
                  "options": [
                    {
                      "value": "bcp1979_daily_psalms",
                      "label": "Lectionary",
                      "whentype": "year"
                    },
                    {
                      "value": "bcp1979_30day_psalter",
                      "label": "30-day Cycle",
                      "whentype": "date"
                    },
                    {
                      "value": "rclsunday",
                      "label": "Revised Common Lectionary (RCL)",
                      "whentype": "date"
                    }
                  ]
                },
                "psalterVersion": {
                  "label": "Psalter Version",
                  "category": "Translations",
                  "options": [
                    {
                      "value": "bcp1979",
                      "label": "1979 Book of Common Prayer"
                    },
                    {
                      "value": "ip",
                      "label": "Inclusive Psalter"
                    },
                    {
                      "value": "coverdale",
                      "label": "Coverdale (1662 BCP)"
                    }
                  ]
                },
                "readingA": {
                  "label": "First Reading",
                  "category": "Readings",
                  "options": [
                    {
                      "value": "first_reading",
                      "label": "OT/First Reading (Alternate Year)",
                      "alternateYear": true,
                      "default": true
                    },
                    {
                      "value": "first_reading",
                      "label": "OT/First Reading"
                    },
                    {
                      "value": "second_reading",
                      "label": "Epistle/Second Reading"
                    },
                    {
                      "value": "gospel",
                      "label": "Gospel"
                    }
                  ]
                },
                "readingB": {
                  "label": "Second Reading",
                  "category": "Readings",
                  "options": [
                    {
                      "value": "none",
                      "label": "—"
                    },
                    {
                      "value": "second_reading",
                      "label": "Epistle/Second Reading",
                      "default": true
                    },
                    {
                      "value": "gospel",
                      "label": "Gospel"
                    }
                  ]
                },
                "readingC": {
                  "label": "Third Reading",
                  "category": "Readings",
                  "options": [
                    {
                      "value": "none",
                      "label": "—",
                      "default": true
                    },
                    {
                      "value": "second_reading",
                      "label": "Epistle/First Reading"
                    },
                    {
                      "value": "gospel",
                      "label": "Gospel",
                      "default": true
                    }
                  ]
                },
                "bibleVersion": {
                  "label": "Bible Translation",
                  "category": "Translations",
                  "options": [
                    {
                      "value": "NRSV",
                      "label": "New Revised Standard Version (NRSV)"
                    },
                    {
                      "value": "ESV",
                      "label": "English Standard Version (ESV)"
                    },
                    {
                      "value": "KJV",
                      "label": "King James Version (KJV)"
                    },
                    {
                      "value": "basicenglish",
                      "label": "Bible in Basic English (BBE)"
                    },
                    {
                      "value": "douayrheims",
                      "label": "Douay-Rheims"
                    }
                  ]
                },
                "canticleTable": {
                  "label": "Canticle Table",
                  "category": "Cycles and Tables",
                  "options": [
                    {
                      "value": "Mag+Nunc",
                      "label": "Magnificat and Nunc Dimittis"
                    },
                    {
                      "value": "bcp1979",
                      "label": "1979 Table of Suggested Canticles"
                    },
                    {
                      "value": "eow",
                      "label": "Enriching Our Worship"
                    },
                    {
                      "value": "ojn",
                      "label": "Order of St. Julian of Norwich"
                    }
                  ]
                },
                "original": {
                  "label": "Include Greek/Hebrew Texts",
                  "category": "Translations",
                  "options": [
                    {
                      "value": "none",
                      "label": "—"
                    },
                    {
                      "value": "allgreek",
                      "label": "Greek (LXX/NT)"
                    },
                    {
                      "value": "all",
                      "label": "Greek/Hebrew (BHS/LXX/NT)"
                    }
                  ]
                },
                "angelus": {
                  "label": "Angelus",
                  "category": "Supplemental Devotions",
                  "options": [
                    {
                      "value": "none",
                      "label": "—"
                    },
                    {
                      "value": "before",
                      "label": "Before the Office"
                    },
                    {
                      "value": "after",
                      "label": "After the Office"
                    }
                  ]
                },
                "andrewes_evening": {
                  "label": "Lancelot Andrewes’s Private Prayers",
                  "category": "Supplemental Devotions",
                  "options": [
                    {
                      "value": "none",
                      "label": "—"
                    },
                    {
                      "value": "after",
                      "label": "After the Office"
                    }
                  ]
                },
                "marian_antiphons": {
                  "label": "Hymns to Mary",
                  "category": "Supplemental Devotions",
                  "options": [
                    {
                      "value": "none",
                      "label": "—"
                    },
                    {
                      "value": "after",
                      "label": "After the Office"
                    }
                  ]
                }
              }
          },
          value: []
        }),
        new Liturgy({
          type: 'liturgy',
          language: 'en',
          version: 'Rite-II',
          slug: 'morning_prayer',
          label: 'Morning Prayer',
          metadata: {
            preferences: {
                "lectionary": {
                  "label": "Lectionary",
                  "options": [
                    {
                      "value": "bcp1979_daily_office",
                      "label": "Daily Office Lectionary",
                      "whentype": "year"
                    },
                    {
                      "value": "rclsunday",
                      "label": "Revised Common Lectionary (RCL)",
                      "whentype": "date"
                    }
                  ]
                },
                "psalter": {
                  "label": "Psalm Cycle",
                  "options": [
                    {
                      "value": "bcp1979_daily_psalms",
                      "label": "Lectionary",
                      "whentype": "year"
                    },
                    {
                      "value": "bcp1979_30day_psalter",
                      "label": "30-day Cycle",
                      "whentype": "date"
                    },
                    {
                      "value": "rclsunday",
                      "label": "Revised Common Lectionary (RCL)",
                      "whentype": "date"
                    }
                  ]
                },
                "psalterVersion": {
                  "label": "Psalter Version",
                  "options": [
                    {
                      "value": "bcp1979",
                      "label": "1979 Book of Common Prayer"
                    },
                    {
                      "value": "ip",
                      "label": "Inclusive Psalter"
                    },
                    {
                      "value": "coverdale",
                      "label": "Coverdale (1662 BCP)"
                    }
                  ]
                },
                "readingA": {
                  "label": "First Reading",
                  "options": [
                    {
                      "value": "first_reading",
                      "label": "OT/First Reading (Alternate Year)",
                      "alternateYear": true,
                      "default": true
                    },
                    {
                      "value": "first_reading",
                      "label": "OT/First Reading"
                    },
                    {
                      "value": "second_reading",
                      "label": "Epistle/Second Reading"
                    },
                    {
                      "value": "gospel",
                      "label": "Gospel"
                    }
                  ]
                },
                "readingB": {
                  "label": "Second Reading",
                  "options": [
                    {
                      "value": "none",
                      "label": "—"
                    },
                    {
                      "value": "second_reading",
                      "label": "Epistle/Second Reading",
                      "default": true
                    },
                    {
                      "value": "gospel",
                      "label": "Gospel"
                    }
                  ]
                },
                "readingC": {
                  "label": "Third Reading",
                  "options": [
                    {
                      "value": "none",
                      "label": "—",
                      "default": true
                    },
                    {
                      "value": "second_reading",
                      "label": "Epistle/First Reading"
                    },
                    {
                      "value": "gospel",
                      "label": "Gospel",
                      "default": true
                    }
                  ]
                },
                "bibleVersion": {
                  "label": "Bible Translation",
                  "options": [
                    {
                      "value": "NRSV",
                      "label": "New Revised Standard Version (NRSV)"
                    },
                    {
                      "value": "ESV",
                      "label": "English Standard Version (ESV)"
                    },
                    {
                      "value": "KJV",
                      "label": "King James Version (KJV)"
                    },
                    {
                      "value": "basicenglish",
                      "label": "Bible in Basic English (BBE)"
                    },
                    {
                      "value": "douayrheims",
                      "label": "Douay-Rheims"
                    }
                  ]
                },
                "canticleTable": {
                  "label": "Canticle Table",
                  "options": [
                    {
                      "value": "Mag+Nunc",
                      "label": "Magnificat and Nunc Dimittis"
                    },
                    {
                      "value": "bcp1979",
                      "label": "1979 Table of Suggested Canticles"
                    },
                    {
                      "value": "eow",
                      "label": "Enriching Our Worship"
                    },
                    {
                      "value": "ojn",
                      "label": "Order of St. Julian of Norwich"
                    }
                  ]
                },
                "original": {
                  "label": "Include Greek/Hebrew Texts",
                  "options": [
                    {
                      "value": "none",
                      "label": "—"
                    },
                    {
                      "value": "allgreek",
                      "label": "Greek (LXX/NT)"
                    },
                    {
                      "value": "all",
                      "label": "Greek/Hebrew (BHS/LXX/NT)"
                    }
                  ]
                },
                "angelus": {
                  "label": "Angelus",
                  "category": "Supplemental Devotions",
                  "options": [
                    {
                      "value": "none",
                      "label": "—"
                    },
                    {
                      "value": "before",
                      "label": "Before the Office"
                    },
                    {
                      "value": "after",
                      "label": "After the Office"
                    }
                  ]
                },
                "andrewes_evening": {
                  "label": "Lancelot Andrewes’s Private Prayers",
                  "category": "Supplemental Devotions",
                  "options": [
                    {
                      "value": "none",
                      "label": "—"
                    },
                    {
                      "value": "after",
                      "label": "After the Office"
                    }
                  ]
                },
                "marian_antiphons": {
                  "label": "Hymns to Mary",
                  "category": "Supplemental Devotions",
                  "options": [
                    {
                      "value": "none",
                      "label": "—"
                    },
                    {
                      "value": "after",
                      "label": "After the Office"
                    }
                  ]
                }
              }
          },
          value: []
        }),
        new Liturgy({
          type: 'liturgy',
          slug: 'compline',
          label: 'Compline',
          metadata: {
            evening: true,
            preferences: {
                "marian_antiphons": {
                  "label": "Hymns to Mary",
                  "category": "Supplemental Devotions",
                  "options": [
                    {
                      "value": "none",
                      "label": "—"
                    },
                    {
                      "value": "after",
                      "label": "After the Office"
                    }
                  ]
                }
              }
          },
          value: []
        })
      )
    ])
  }

  findDocumentBySlug(slug : string) : Observable<LiturgicalDocument[]> {
    return this.afs.collection<LiturgicalDocument>('Document', ref =>
      ref.where('slug', '==', slug)
    ).valueChanges();
  }
}
