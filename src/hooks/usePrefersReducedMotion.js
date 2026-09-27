import { useEffect, useState } from 'react';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (!window.matchMedia) {
      return undefined;
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => setReduced(event.matches);

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export default usePrefersReducedMotion;
