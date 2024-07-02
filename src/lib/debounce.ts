type AnyFunction = (...args: any[]) => any;

/**
 * Creates a debounced version of the `callback` that controls
 * how many times we allow a function to be executed over time.
 *
 * @param callback The function to defer the execution
 * @param delay Milliseconds to delay the execution
 */
export default function debounce<TFunc extends AnyFunction>(callback: TFunc, delay: number) {
  let timer: NodeJS.Timeout;
  
  return function debouncedCallback(...args: Parameters<typeof callback>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
      clearTimeout(timer);
    }, delay);
  };
}
