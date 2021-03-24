import { SelectableCitation } from "@venite/ldf";

export function selectableCitationToString(
  citation: string | SelectableCitation | undefined
): string {
  return typeof citation === "string"
    ? citation
    : citation?.label ??
        (citation?.book &&
          `${citation?.book} ${citation?.chapter}:${citation?.verse}`) ??
        undefined;
}
