'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/#dashboard');
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#080808]">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#a855f7] border-t-transparent"></div>
    </div>
  );
}
