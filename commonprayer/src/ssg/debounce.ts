export function debounce<T extends Function>(f: T, delay = 250) {
  let timer: number;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => f(...args), delay);
  };
}
