export type SSGRefreshMap = Record<string, () => Promise<SSGRefreshMap>>;
