import { useEffect, useRef } from 'react';

export default function useAutoScroll(deps = []) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, deps);

  return bottomRef;
}
