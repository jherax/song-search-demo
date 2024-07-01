type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
type Callback = (...args: any[]) => void;

/**
 * Creates a debounced version of the `callback` that controls
 * how many times we allow a function to be executed over time.
 *
 * @param callback The function to defer the execution
 * @param delay Milliseconds to delay the execution
 */
export default function debounce<TFunc extends Function = Callback>(callback: TFunc, delay: number) {
  let timer: NodeJS.Timeout;
  
  return function debouncedCallback(...args: ArgumentTypes<typeof callback>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
      clearTimeout(timer);
    }, delay);
  };
}
