import { useEffect, useState, useRef } from 'react';

export const useAnimationFrameThrottle = <T>(value: T) => {
  const lastRenderTime = useRef<DOMHighResTimeStamp | undefined>(undefined);
  const [throttledValue, setThrottledValue] = useState<T>(value);

  useEffect(() => {
    const rafHandle = requestAnimationFrame((timestamp) => {
      if (timestamp === lastRenderTime.current) {
        return;
      }

      lastRenderTime.current = timestamp;
      setThrottledValue(value);
    });

    return () => {
      cancelAnimationFrame(rafHandle);
    };
  }, [value]);

  return throttledValue;
};
