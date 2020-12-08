import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { EditorState } from '../editor/ldf-editor/editor-state';
import { EditorService, EditorStatus } from '../editor/ldf-editor/editor.service';

@Component({
  selector: 'venite-template',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
})
export class TemplatePage implements OnInit {
  docId$ : Observable<string>;
  state$ : Observable<EditorState>;
  editorStatus$ : Observable<EditorStatus>;

  loadingInstance : any;

  constructor(
    private route : ActivatedRoute,
    private loading : LoadingController,
    private editorService : EditorService
  ) { }

  ngOnInit() {
    this.showLoading();

    this.docId$ = this.route.params.pipe(
      map(({ docId }) => docId)
    );

    this.state$ =  this.docId$.pipe(
      switchMap(docId =>this.editorService.editorState(docId)),
      tap(() => {
        if(this.loadingInstance) {
          this.loadingInstance.dismiss();
        }
      })
    );

    this.editorStatus$ = this.editorService.status;
  }

  async showLoading() {
    this.loadingInstance = await this.loading.create();
    await this.loadingInstance.present();
  }

}
