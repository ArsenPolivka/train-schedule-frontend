'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { TTrain } from "@/utils/types";

interface TrainsContextType {
  trains: TTrain[];
  error: string;
  loading: boolean;
  refetchTrains: (search?: string, sortBy?: string, order?: string) => void;
}

const TrainsContext = createContext<TrainsContextType | undefined>(undefined);

export const TrainsProvider = ({ children }: { children: React.ReactNode }) => {
  const [trains, setTrains] = useState<TTrain[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const fetchTrains = async (search = '', sortBy = 'departure', order = 'ASC') => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/trains?search=${encodeURIComponent(search)}&sortBy=${sortBy}&order=${order}`);

      if (res.status === 401) {
        router.push('/login')
      }

      if (!res.ok) {
        throw new Error('Error fetching trains');
      }

      const data = await res.json();
      setTrains(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrains();
  }, []);

  return (
    <TrainsContext.Provider value={{ trains, error, loading, refetchTrains: fetchTrains }}>
      {children}
    </TrainsContext.Provider>
  );
};

export const useTrains = () => {
  const context = useContext(TrainsContext);
  if (!context) {
    throw new Error("useTrains must be used within a TrainsProvider");
  }
  return context;
};
