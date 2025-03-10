'use client'

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Text } from '@/components/custom/Text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/');
    } else {
      toast('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className='flex flex-col h-svh justify-center max-w-96 m-auto'>
      <Text.Title className='text-center'>Login</Text.Title>

      <div className='space-y-2 mt-10'>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" className='w-full'>Login</Button>
      </div>
    </form>
  )
}
