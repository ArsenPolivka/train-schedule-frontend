'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

import { Text } from '@/components/custom/Text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@/context/user';

export const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { setUser } = useUser()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast('Passwords do not match');
      return;
    }

    const res = await fetch('/api/sign-up', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();

    if (res.ok) {
      setUser({ id: data.id, username: data.username })
      router.push('/');
    } else {
      toast('Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister} className='flex flex-col h-svh justify-center max-w-96 m-auto'>
      <Text.Title className='text-center'>Sign up</Text.Title>

      <div className='space-y-2 mt-10'>
        <Input
          placeholder='Enter your username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className='relative'>
          <Input
            placeholder='Enter your password'
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type='button'
            className='absolute right-3 top-1/2 transform -translate-y-1/2'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <div className='relative'>
          <Input
            placeholder='Confirm your password'
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type='button'
            className='absolute right-3 top-1/2 transform -translate-y-1/2'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <Button type='submit' className='w-full'>Sign up</Button>

        <p>Already have an account? <Link href='/login' className='text-blue-600 font-semibold'>Log in</Link></p>
      </div>
    </form>
  );
};
