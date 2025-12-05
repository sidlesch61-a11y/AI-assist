import type { ReactNode } from "react";

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-md border border-industrial-800">
      <table className="min-w-full divide-y divide-industrial-800 text-sm text-industrial-100">
        {children}
      </table>
    </div>
  );
}


