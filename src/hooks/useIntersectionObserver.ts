import { useEffect, useState } from "react";

interface useIntersectionObserverProps {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
  enabled?: boolean;
}

const useIntersectionObserver = ({
  root,
  rootMargin = "10px",
  threshold = 0,
  onIntersect,
  enabled = true
}: useIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);

  useEffect(() => {
    if (!target || !enabled) return;

    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersect,
      { root, rootMargin, threshold }
    );
    observer.observe(target);

    return () => observer.unobserve(target);
  }, [onIntersect, root, rootMargin, target, threshold, enabled]);

  return { setTarget };
};

export default useIntersectionObserver;
