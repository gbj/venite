import h from "https://cdn.skypack.dev/vhtml@2.2.0";

export const Fragment = ({ children }: { children: string[] }) =>
  h(null as any, null, ...children);
