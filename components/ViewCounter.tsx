'use client';

import { useEffect, useRef } from 'react';
import { incrementReads } from '@/app/actions/article';

export default function ViewCounter({ slug }: { slug: string }) {
  const isIncremented = useRef(false);

  useEffect(() => {
    if (!isIncremented.current) {
      incrementReads(slug);
      isIncremented.current = true;
    }
  }, [slug]);

  return null;
}
