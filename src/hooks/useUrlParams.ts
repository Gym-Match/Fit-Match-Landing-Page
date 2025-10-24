"use client";

import { useEffect, useState } from 'react';

export function useUrlParams() {
  const [refCode, setRefCode] = useState<string | null>(null);

  useEffect(() => {
    // Verificar se estamos no lado do cliente
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get('ref');
      
      if (ref) {
        setRefCode(ref);
      }
    }
  }, []);

  return { refCode };
}
