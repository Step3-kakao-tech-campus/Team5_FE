import { useEffect, useRef } from "react";

export default function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    if (!delay) return;

    function tick() {
      savedCallback.current();
    }

    const id = setInterval(tick, delay);
    // eslint-disable-next-line consistent-return
    return () => clearInterval(id);
  }, [delay]);
}
