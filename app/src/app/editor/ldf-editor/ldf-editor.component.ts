import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import { LocalDocumentManager, ServerDocumentManager, DocumentManagerChange } from './document-manager';
import { LiturgicalDocument, Change, Option, docsToLiturgy, Sharing, docsToOption } from '@venite/ldf';
import { switchMap, debounceTime, tap, map, mapTo, startWith, filter } from 'rxjs/operators';
import { DocumentService } from 'src/app/services/document.service';
import { EditorService } from './editor.service';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertController, ModalController } from '@ionic/angular';
//import { LdfEditableAddBlockMenu } from '@venite/angular/src/directives/proxies';
import { AddBlockComponent } from '../add-block/add-block.component';
import { SharingComponent } from '../sharing/sharing.component';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'venite-ldf-editor',
  templateUrl: './ldf-editor.component.html',
  styleUrls: ['./ldf-editor.component.scss'],
})
export class LdfEditorComponent implements OnInit, OnDestroy {
  @Input() docId : string;

  mode : 'edit' | 'code' | 'preview' = 'edit';

  state$ : Observable<{
    localManager: LocalDocumentManager,
    serverManager: ServerDocumentManager,
    docSaved : Date,
    bibleIntros: LiturgicalDocument[],
  }>;

  // Handle external revisions
  revisions$ : Observable<DocumentManagerChange[]>;
  revisionSubscription : Subscription;

  // For Gloria Patri requests
  glorias : Record<string, LiturgicalDocument> = {};
  gloriaSubscription : Subscription;

  constructor(
    public auth : AuthService,
    private documents : DocumentService,
    private editorService : EditorService,
    private modal : ModalController,
    private router : Router,
    private alert : AlertController
  ) { }

  ngOnInit() {
    // Document manager
    const serverManager$ = this.editorService.join(this.docId);

    const localManager$ = serverManager$.pipe(
      switchMap(serverManager => this.editorService.localManager(serverManager.docId)),
    );

    // List of revisions
    const revisions$ = this.editorService.findRevisions(this.docId);
  
    // Apply changes from revisions
    this.revisionSubscription = combineLatest(localManager$, serverManager$, revisions$).subscribe(
      ([localManager, serverManager, revisions]) => {
        this.editorService.applyChanges(localManager, serverManager, revisions);
      });

    // update the document once every 3s
    const docSaved$ = combineLatest(localManager$, revisions$).pipe(
      tap(([localManager, revisions]) => console.log('change made, saving')),
      debounceTime(3000),
      switchMap(([localManager, ]) => this.documents.saveDocument(localManager.docId, {
        ... localManager.document,
        lastRevision: localManager.lastSyncedRevision
      })),
      mapTo(new Date())
    );

    // Pull Bible reading introduction options based on language of document we're editing
    const bibleIntros$ = localManager$.pipe(
      map(localManager => localManager?.document),
      filter(doc => doc !== undefined),
      switchMap(doc => this.documents.findDocumentsByCategory(['Bible Reading Introduction'], doc.language))//, [ ... typeof doc.version === 'string' ? doc.version : undefined]))
    );

    this.state$ = combineLatest(
      serverManager$.pipe(startWith(undefined)),
      localManager$.pipe(startWith(undefined)), 
      docSaved$.pipe(startWith(undefined)),
      bibleIntros$.pipe(startWith([]))
    ).pipe(
      map(([serverManager, localManager, docSaved, bibleIntros]) => ({
        localManager,
        serverManager,
        docSaved,
        bibleIntros
      }))
    )
  }

  async ngOnDestroy() {
    if(this.revisionSubscription) {
      this.revisionSubscription.unsubscribe();
    }
    if(this.gloriaSubscription) {
      this.gloriaSubscription.unsubscribe();
    }
    await this.editorService.leave(this.docId);
  }


  // Called whenever the user's cursor moves within this editor
  updateCursor(docId : string, ev : CustomEvent) {
    console.log('update cursor', docId, ev.detail);
    this.editorService.updateCursor(docId, ev.detail);
  }

  // Called whenever the user changes a document within this editor
  processChange(manager : LocalDocumentManager, ev : CustomEvent) {
    this.editorService.processChange(manager, ev.detail);
  }

  addBlockDirectly(manager : LocalDocumentManager, ev : CustomEvent) {
    const { base, index } = ev.detail;
    this.addBlock((data) => this.add(manager, base, index, data));
  }

  addBlockAsOption(manager : LocalDocumentManager, ev : CustomEvent) {
    const { base, index, obj } = ev.detail;
    // Add an option to an existing `Option`
    if(obj.type == 'option') {
      this.addBlock((data) =>
        this.add(manager, `${base}/value`, index, data)
      );
    }
    // Otherwise, add a new doc and convert the whole thing to an `Option`
    else {
      this.addBlock((data) =>
        this.replace(
          manager, base, index, obj,
          [
            new Option({
              type: 'option',
              metadata: { selected: 0 },
              // TODO -- convert to Liturgy if data really has more than one member
              // do this by moving the docToLiturgy and docToOption stuff into LDF and calling it here and in PrayService
              value: [ obj, docsToLiturgy(data) ]
            })
          ]
        )
      )
    }
  }

  addGloriaPatri(manager: LocalDocumentManager, ev : CustomEvent) {
    console.log('ADD GLORIA PATRI');
    const { path, language, version, oldValue } = ev.detail;
    if(this.gloriaSubscription) {
      this.gloriaSubscription.unsubscribe();
    }
    if(this.glorias[`${language}-${version}`]) {
      this.editorService.processChange(manager, new Change({
        path: `${path}/metadata/gloria`,
        op: [{
          type: 'set',
          oldValue,
          value: this.glorias[`${language}-${version}`]
        }]
      }));
    } else {
      this.gloriaSubscription = this.documents.findDocumentsBySlug('gloria-patri', language, [version]).subscribe({
        next: (value) => {
          this.editorService.processChange(manager, new Change({
            path: `${path}/metadata/gloria`,
            op: [{
              type: 'set',
              oldValue,
              value: docsToOption(value)
            }]
          }));
          this.glorias[`${language}-${version}`] = docsToOption(value);
        }
      });
    }
  }

  async sharingModal(sharing : Sharing) {
    const modal = await this.modal.create({
      component: SharingComponent,
      swipeToClose: true
    });
    modal.componentProps = {
      modal,
      sharing
    };
    await modal.present();
  }
  
  // Called whenever the user wants to add a new LiturgicalDocument block at JSON pointer `base`/`index`
  async addBlock(callback : (data) => void) {
    const modal = await this.modal.create({
            component: AddBlockComponent,
            swipeToClose: true
          });
    modal.componentProps = { modal };

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if(data) {
      callback(data);
    }
  }

  add(manager: LocalDocumentManager, base : string, index: number, template : LiturgicalDocument[]) {
    const change = new Change({
      path: base, 
      op: template.reverse() // list inserts are *before* an index, so if we reverse the array it'll end up in the right order
        .map(value => ({
          type: 'insertAt',
          index: index,
          value
        }))
    });
    console.log(change);
    this.editorService.processChange(manager, change);
  }

  replace(manager : LocalDocumentManager, base : string, index : number,  oldValue : LiturgicalDocument, template : LiturgicalDocument[]) {
    const path = `${base}/${index}`;
    console.log('replacing', path, 'with', template[0]);
    // TODO: handle trying to insert an Array (like a hymn) as an Option field, which won't work unless we pack it up as a Liturgy
    const change = new Change({
      path,
      op: [{
        type: 'set',
        oldValue,
        value: template[0]
      }]
    });
    this.editorService.processChange(manager, change);
  }

  // ldf-editable-metadata-metadata-fields might emit an ldfAskForBibleIntros event
  // in response, we should call the setBibleIntros methods of that component
  sendBibleIntros(ev : CustomEvent, intros : LiturgicalDocument[] = []) {
    ev.detail.setBibleReadingIntros(intros);
    console.log('(sendBibleIntros)')
    console.log(ev.detail, intros);
  }

  async shareLink(manager : LocalDocumentManager, doc : LiturgicalDocument) {
    this.editorService.processChange(manager, new Change({
      path: '/sharing',
      op: [{
        type: 'set',
        index: 'status',
        value: 'published',
        oldValue: doc?.sharing?.status
      }]
    }));
    this.editorService.processChange(manager, new Change({
      path: '/sharing',
      op: [{
        type: 'set',
        index: 'privacy',
        value: 'public',
        oldValue: doc?.sharing?.privacy
      }]
    }));

    const orgId = doc?.sharing?.organization,
      slug = doc?.slug;
    console.log('Publishing\n\n', orgId, slug);
    if(orgId && slug) {
      const alert = await this.alert.create({
        header: 'Bulletin Published',
        message: `Your bulletin is now available at\n\n${environment.baseUrl}pray/${orgId}/${slug}\n\n`,
        buttons: [
          {
            text: 'Keep Editing',
            role: 'cancel'
          },
          {
            text: 'Go',
            handler: () => this.router.navigate(['pray', orgId, slug])
          }
        ]
      });

      await alert.present();
    }
  }
}
