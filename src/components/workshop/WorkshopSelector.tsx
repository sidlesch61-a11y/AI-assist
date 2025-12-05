import { useEffect, useState } from "react";
import { fetchWorkshops } from "../../api/workshops";
import { useWorkshopStore } from "../../stores/workshop.store";
import type { Workshop } from "../../types/workshop.types";
import { Button } from "../common/Button";

export function WorkshopSelector() {
  const { currentWorkshop, workshops, setCurrentWorkshop, setWorkshops } =
    useWorkshopStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWorkshops();
  }, []);

  const loadWorkshops = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchWorkshops();
      setWorkshops(response.workshops);
      
      // Auto-select first workshop if none selected
      if (!currentWorkshop && response.workshops.length > 0) {
        setCurrentWorkshop(response.workshops[0]);
      }
    } catch (err: any) {
      console.error("Failed to load workshops:", err);
      setError(err.response?.data?.detail || "Failed to load workshops");
    } finally {
      setLoading(false);
    }
  };

  if (loading && workshops.length === 0) {
    return (
      <div className="glass rounded-lg p-4 animate-fade-in">
        <div className="text-sm text-slate-400">Loading workshops...</div>
      </div>
    );
  }

  if (error && workshops.length === 0) {
    return (
      <div className="glass rounded-lg p-4 border border-red-500/20 animate-fade-in">
        <div className="text-sm text-red-400">{error}</div>
        <Button
          variant="secondary"
          className="mt-2 text-xs"
          onClick={loadWorkshops}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (workshops.length === 0) {
    return (
      <div className="glass rounded-lg p-4 animate-fade-in">
        <div className="text-sm text-slate-400 mb-3">No workshops available</div>
        <Button variant="primary" className="text-xs">
          Create Workshop
        </Button>
      </div>
    );
  }

  return (
    <div className="glass rounded-lg p-3 animate-fade-in">
      <label className="block text-xs font-medium text-slate-300 mb-2">
        Current Workshop
      </label>
      <select
        value={currentWorkshop?.id || ""}
        onChange={(e) => {
          const workshop = workshops.find((w) => w.id === e.target.value);
          if (workshop) setCurrentWorkshop(workshop);
        }}
        className="w-full glass rounded-lg border border-slate-700/50 px-3 py-2 text-sm text-slate-100 focus:border-primary-500/50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all bg-slate-900/50"
      >
        {workshops.map((workshop) => (
          <option key={workshop.id} value={workshop.id}>
            {workshop.name}
            {workshop.tokens_used_this_month > 0 && (
              <span className="text-slate-500">
                {" "}
                ({workshop.tokens_used_this_month.toLocaleString()} tokens used)
              </span>
            )}
          </option>
        ))}
      </select>
      {currentWorkshop && (
        <div className="mt-2 text-xs text-slate-400">
          <div>
            Monthly limit: {currentWorkshop.monthly_token_limit.toLocaleString()} tokens
          </div>
          <div>
            Used: {currentWorkshop.tokens_used_this_month.toLocaleString()} tokens
          </div>
        </div>
      )}
    </div>
  );
}

