import React from 'react'

import { Loader } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader className="animate-spin w-12 h-12 text-slate-950" />
    </div>
  );
};
