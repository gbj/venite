import { Injectable } from '@angular/core';
import { Liturgy } from '@venite/ldf';

@Injectable({
  providedIn: 'root'
})
export class LiturgyMenuService {

  constructor() { }

  async getOptions(language : string, version : string) : Promise<Liturgy[]> {
    const findURL = new URL(`https://www.venite.app/api/liturgy/menu`);
    findURL.searchParams.append('language', language);
    findURL.searchParams.append('version', version);

    const response = await fetch(findURL.toString());
    return await response.json();
  }
}
