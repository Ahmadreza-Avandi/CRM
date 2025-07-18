'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser && window.location.pathname !== '/login') {
            router.push('/login');
        }
    }, [router]);

    return <>{children}</>;
}
