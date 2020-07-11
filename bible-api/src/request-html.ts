import { parse, HTMLElement } from 'node-html-parser';
import * as https from 'https';

export async function requestHTML(url : string) : Promise<HTMLElement> {
  const raw = await httpsGet(url);
  return parse(raw);
}

export async function httpsGet(url : string, headers : any = {}) : Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res: any) => {
      res.setEncoding('utf8');
      let body = '';
      res.on('data', (chunk : string) => body += chunk);
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
};

