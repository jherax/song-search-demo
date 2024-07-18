/**
 * Creates a debounced version of the `callback` that controls
 * how many times we allow a function to be executed over time.
 *
 * @see https://cutt.ly/debounce-throttle
 *
 * @param callback The function to defer the execution
 * @param delay Milliseconds to delay the execution
 */
export default function debounce<Args extends unknown[], R>(
  callback: (...args: Args) => R,
  delay: number,
) {
  let taskId: number | NodeJS.Timeout | null;

  return function debouncedCallback(...args: Args) {
    if (taskId == null) {
      taskId = setTimeout(() => {
        callback(...args);
        clearTimeout(taskId as number);
        taskId = null;
      }, delay);
    }
  };
}
