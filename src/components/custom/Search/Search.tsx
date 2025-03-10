import { Input } from "@/components/ui/input";
import React from "react";

type SearchProps = {
  search: string;
  setSearch: (value: string) => void;
};

export const Search = ({ search, setSearch }: SearchProps) => {
  return (
    <Input
      type="text"
      placeholder="Search schedules..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};
