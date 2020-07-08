export function versionToString(version : string | { preference: string; }) : string {
  if(typeof version === 'string') {
    return version;
  } else {
    return JSON.stringify(version);
  }
}