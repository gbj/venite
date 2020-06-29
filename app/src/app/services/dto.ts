type DataPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type DataPropertiesOnly<T> = {
  [P in DataPropertyNames<T>]: T[P] extends object ? Partial<DTO<T[P]>> : T[P]
};

/** DTO is a type that includes JSON-able fields, i.e., not methods */
export type DTO<T> = DataPropertiesOnly<T>;

