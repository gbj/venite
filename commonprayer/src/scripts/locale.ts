export function getLocale(): string {
  const SUPPORTED_LANGUAGES = ["en"],
    userLanguage = (navigator.language || "en-US").split("-")[0] || "en";
  return SUPPORTED_LANGUAGES.includes(userLanguage) ? userLanguage : "en";
}
