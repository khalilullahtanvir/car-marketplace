export function debounce<T extends (...args: Parameters<T>) => void>(callback: T, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => callback(...args), delay);
  };
}
