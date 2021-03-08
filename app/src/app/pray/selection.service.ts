import { Injectable } from '@angular/core';
import { SelectableCitation } from '@venite/ldf';
import { BehaviorSubject } from 'rxjs';

type SelectionData = {
  target: HTMLElement;
  text: string;
  citation: SelectableCitation;
  fragment: string | undefined;
};
export type SelectedTextEvent = {
  text: string;
  fragment: string;
  citation: string;
  els: HTMLElement[];
}

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  public selection$ : BehaviorSubject<SelectedTextEvent | null> = new BehaviorSubject(null);
  public selections : SelectionData[] = [];
  undone : SelectionData[] = [];
  public canUndo$ : BehaviorSubject<boolean> = new BehaviorSubject(false);
  public canRedo$ : BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  clear() {
    this.selections = [];
    this.undone = [];
    this.updateSelection();
    this.canRedo$.next(this.undone.length > 0);
    this.canUndo$.next(this.selections.length > 0);
  }

  add(data : SelectionData) {
    // if this element is not already in the list, add it
    const there = this.selections.find(test => test.target == data.target);
    if(!there) {
      this.selections.push(data);
    }
    // otherwise, undo it
    else {
      this.selections = this.selections.filter(data => data != there);
      this.undone.push(there);
    }
    this.selections.sort(this.documentPositionComparator);
    this.updateSelection();
    this.canRedo$.next(this.undone.length > 0);
    this.canUndo$.next(this.selections.length > 0);
  }

  undo() {
    const undone = this.selections.pop();
    this.undone.push(undone);
    this.canUndo$.next(this.selections.length > 0);
    this.canRedo$.next(this.undone.length > 0);
    this.updateSelection();
  }

  redo() {
    const redone = this.undone.pop();
    this.selections.push(redone);
    this.canRedo$.next(this.undone.length > 0);
    this.canUndo$.next(this.selections.length > 0);
    this.updateSelection();
  }

  updateSelection() {
    const els = this.selections.map(s => s.target),
      text = this.selections.map(s => s.text).join(' '),
      fragment = this.selections.map(s => s.fragment).filter(s => !!s)[0], // TODO
      citation = this.getCitation(this.selections);

    this.undone.forEach(s => {
      s.target.shadowRoot.querySelector('span').classList.remove('selected')
    });
    this.selections.forEach(s => {
      s.target.shadowRoot.querySelector('span').classList.add('selected')
    });

    this.selection$.next({text, fragment, citation, els});
  }

  documentPositionComparator(aSel : SelectionData, bSel : SelectionData) {
      const a = aSel.target, b = bSel.target;

      if (a === b) {
        return 0;
      }

      const position = a.compareDocumentPosition(b);

      if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        return -1;
      } else if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
        return 1;
      } else {
        return 0;
      }
  }

  getCitation(selects : SelectionData[]) : string {
    const citations : SelectableCitation[] = selects.map(s => s.citation);

    let currentBook : string,
        startingChapter : string,
        startingVerse : string,
        compiledCitations : string[] = new Array(),
        bookFrags : string[] = new Array(),
        chapterFrags : string[] = new Array();
    citations.forEach((cite, index) => {
      if(!cite.hasOwnProperty('book')) {
        compiledCitations.push(cite.string || cite.label || null);

        if(bookFrags && chapterFrags && bookFrags.length > 0 && chapterFrags.length > 0) {
          bookFrags.push(`${startingChapter}:${chapterFrags.join(', ')}`);
          compiledCitations.push(`${currentBook} ${bookFrags.join('; ')}`);
        }

        currentBook = startingChapter = startingVerse = undefined;
        chapterFrags = new Array();
        bookFrags = new Array();
      } else {
        if(!currentBook) {
          currentBook = cite.book;
        }
        if(!startingChapter) {
          startingChapter = cite.chapter;
        }
        if(!startingVerse) {
          startingVerse = cite.verse;
        }

        if(cite.book !== currentBook) {
          bookFrags.push(`${startingChapter}:${chapterFrags.join(', ')}`);
          compiledCitations.push(`${currentBook} ${bookFrags.join('; ')}`);
          currentBook = cite.book;
          startingChapter = cite.chapter;
          startingVerse = cite.verse;
          chapterFrags = new Array();
          bookFrags = new Array();
        }
        if(cite.chapter !== startingChapter) {
          bookFrags.push(`${startingChapter}:${chapterFrags.join(', ')}`);
          startingVerse = cite.verse;
          startingChapter = cite.chapter;
          chapterFrags = new Array();
        }

        let range : string = cite.verse == startingVerse ? cite.verse : `${startingVerse}-${cite.verse}`;
        let nextVerse = citations[index + 1];
        if(!nextVerse) {
          chapterFrags.push(range);
          bookFrags.push(`${startingChapter}:${chapterFrags.join(', ')}`);
        } else if(parseInt(nextVerse.verse) - parseInt(cite.verse) > 1 || nextVerse.chapter !== startingChapter) {
          chapterFrags.push(range);
          startingVerse = undefined;
        }
      }
    });
    if(currentBook && bookFrags && bookFrags.length > 0) {
      compiledCitations.push(`${currentBook} ${bookFrags.join('; ')}`)
    }

    return compiledCitations
      .filter(s => !!s)
      .reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
      .join('; ');
  }
}
