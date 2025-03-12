'use client';

import { useEffect } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useUser } from '@/context/user';

export const Header = () => {
  const { user, loading, logout, refetchUser } = useUser();

  useEffect(() => {
    refetchUser()
  }, []);

  return (
    <header className="flex items-center gap-4 justify-end px-16 pt-8">
      {!loading && user ? (
        <span className="font-medium">{user.username}</span>
      ) : null}

      <Image
        src="https://fakeimg.pl/600x400"
        alt="placeholder user image"
        width={60}
        height={60}
        className="block rounded-full w-14 h-14 object-cover"
      />

      <Button variant="outline" onClick={logout}>
        Log out
      </Button>
    </header>
  );
};
