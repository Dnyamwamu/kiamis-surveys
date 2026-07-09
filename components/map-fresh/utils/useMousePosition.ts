import { useEffect, useState, useRef } from 'react';

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<[number, number] | null>(
    null,
  );

  const rafHandle = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (rafHandle.current) {
        return;
      }

      rafHandle.current = requestAnimationFrame(() => {
        rafHandle.current = null;

        setMousePosition([event.clientX, event.clientY]);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);

      if (rafHandle.current) {
        cancelAnimationFrame(rafHandle.current);
      }
    };
  }, []);

  return mousePosition;
};
