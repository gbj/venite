import {  LiturgicalDocument, Liturgy, Option } from '@venite/ldf';

export function isCompletelyCompiled(doc : LiturgicalDocument | undefined) : boolean {
  let isCompiled : boolean = false;
  if(doc == undefined) {
    console.log('isCompletelyCompiled -- undefined', isCompiled, doc);
    isCompiled = true;
  } else if(doc?.type === 'liturgy') {
    isCompiled = ((doc as Liturgy).value || [])
      .map(subDoc => isCompletelyCompiled(subDoc))
      .reduce((a, b) => a && b, true);
    console.log('isCompletelyCompiled — liturgy', isCompiled, doc)
  } else if(doc?.type === 'option') {
    isCompiled = isCompletelyCompiled(((doc as Option).value || [])[(doc as Option)?.metadata?.selected]);
  } else if(doc?.type === 'meditation') {
    isCompiled = true;
  } else {
    isCompiled = Boolean(doc?.day && doc?.value && doc?.value?.length > 0 && !JSON.stringify(doc.value).includes("Loading..."));
    console.log('isCompletelyCompiled', isCompiled, doc);
  }

  return isCompiled;
}