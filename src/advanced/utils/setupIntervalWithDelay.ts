export function setupIntervalWithDelay(callback: () => void, interval: number, delay: number) {
  setTimeout(function () {
    setInterval(callback, interval);
  }, delay);
}
