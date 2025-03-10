'use client';

import { Search } from '@/components/custom/Search';
import { SideModal } from '@/components/custom/SideModal/SideModal';
import { Schedule } from '../Schedule';
import { Text } from '@/components/custom/Text';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { useTrains } from '@/context/trains';

export const HomeSection = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('departure');
  const [order, setOrder] = useState('ASC');

  const debouncedSearch = useDebounce(search, 500);
  const { refetchTrains } = useTrains();

  useEffect(() => {
    refetchTrains(debouncedSearch, sortBy, order);
  }, [debouncedSearch, sortBy, order]);

  return (
    <main className="p-16">
      <Text.Title>Train Schedules</Text.Title>

      <div className="flex gap-4 mt-4 mb-8">
        <Search search={search} setSearch={setSearch} />
        <SideModal />
      </div>

      <Schedule />
    </main>
  );
};
