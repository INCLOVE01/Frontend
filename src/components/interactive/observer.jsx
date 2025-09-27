import { useEffect, useState } from "react";

export function useIntersectionObserver(ref, options, unobserveOnIntersect = false) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    setIsIntersecting(() => entry.isIntersecting);
    if (unobserveOnIntersect && entry.isIntersecting && ref.current) {
      observer.unobserve(ref.current);
    }
  }, options);
  if (ref.current) observer.observe(ref.current);
  return () => observer.disconnect();
  }, [ref, options,unobserveOnIntersect]);
  
  return isIntersecting;
}
