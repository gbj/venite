declare const https : any;

import { parse, HTMLElement, NodeType } from 'node-html-parser';

export async function requestHTML(url : string) : Promise<HTMLElement> {
  const raw = await httpsGet(url);
  return parse(raw);
}

async function httpsGet(url : string) : Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res: any) => {
      res.setEncoding('utf8');
      let body = '';
      res.on('data', (chunk : string) => body += chunk);
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
};

