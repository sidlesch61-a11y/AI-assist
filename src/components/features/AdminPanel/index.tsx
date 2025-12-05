import { useEffect, useState } from "react";
import { fetchAdminHealth } from "../../../api/admin";

export function AdminPanel() {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchAdminHealth();
        setStatus(res.status);
      } catch (err) {
        console.error(err);
        setError("Failed to reach admin health endpoint");
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-2">
      <div className="rounded-md border border-slate-800 bg-slate-950 p-3 text-sm text-slate-200">
        <div className="mb-1 font-semibold text-slate-100">
          Backend admin health
        </div>
        {error && <div className="text-red-400">{error}</div>}
        {status && !error && (
          <div className="text-emerald-400">Status: {status}</div>
        )}
        {!status && !error && (
          <div className="text-slate-400">Checking backend...</div>
        )}
      </div>
      <p className="text-xs text-slate-500">
        This section will evolve into a full admin console (user management,
        rate limits, usage metrics).
      </p>
    </div>
  );
}


