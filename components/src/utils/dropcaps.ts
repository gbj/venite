import { DisplayFormat } from "@venite/ldf";

export type Dropcaps = "force" | "disable" | "auto";

export function useDropcap(
  language: string,
  display_format: DisplayFormat,
  index: number
): "enabled" | "force" | "disabled" {
  if (language == "iu" || language == "he") {
    return "disabled";
  }

  if (display_format === "force_dropcap") {
    return "enabled";
  }

  if (display_format === "disable_dropcap") {
    return "disabled";
  }

  if (index == 0) {
    return "enabled";
  } else {
    return "disabled";
  }
}
