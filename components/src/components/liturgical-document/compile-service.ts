import { LiturgicalDocument } from '@venite/ldf';

export class CompileServiceController {
  async compile(
    doc : LiturgicalDocument,
    api : string = 'https://www.venite.app/api'
  ) : Promise<LiturgicalDocument> {
    const findURL = new URL(`${api}/compile/${doc.lookup?.type}`);
    findURL.searchParams.append('doc', JSON.stringify(doc));

    const response = await fetch(findURL.toString());
    const json = await response.json();
    return new LiturgicalDocument(json);
  }
}

export const CompileService = new CompileServiceController();
