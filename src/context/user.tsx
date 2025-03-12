'use client';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCookie } from "@/utils/helpers";

import type { TUser } from "@/utils/types";

interface UserContextType {
  user: TUser | null;
  error: string;
  loading: boolean;
  setUser: Dispatch<SetStateAction<TUser | null>>
  refetchUser: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const token = getCookie('token');

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token])

  const fetchUser = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/profile`);

      if (res.status === 401) {
        router.push('/login');
        return;
      }

      if (!res.ok) {
        throw new Error('Error fetching user');
      }

      const data = await res.json();
      setUser(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError('');

    try {
      await fetch(`/api/logout`, {
        method: "POST",
      });

      setUser(null);
      router.push('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, error, loading, setUser, refetchUser: fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
