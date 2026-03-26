import { useState, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

export default function Counter({ value, duration = 2 }: { value: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    let requestRef: number;
    if (isInView) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          requestRef = window.requestAnimationFrame(step);
        }
      };
      requestRef = window.requestAnimationFrame(step);
    }
    return () => {
      if (requestRef) window.cancelAnimationFrame(requestRef);
    };
  }, [value, duration, isInView]);

  return (
    <span ref={ref} aria-live="polite" aria-atomic="true">
      {count}
    </span>
  );
}
