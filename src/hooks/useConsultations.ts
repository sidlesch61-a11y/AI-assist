import { useCallback, useEffect, useState } from "react";
import { fetchConsultations } from "../api/consultations";
import { useConsultationStore } from "../stores/consultation.store";

export interface ConsultationFilters {
  license_plate?: string;
  is_resolved?: boolean;
  q?: string;
  start_date?: string;
  end_date?: string;
}

export function useConsultations(initialFilters?: ConsultationFilters) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState<ConsultationFilters>(
    initialFilters || {},
  );
  const consultations = useConsultationStore((s) => s.consultations);
  const setConsultations = useConsultationStore((s) => s.setConsultations);

  const load = useCallback(
    async (append: boolean, currentFilters: ConsultationFilters, currentCursor: string | null) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchConsultations({
          ...currentFilters,
          cursor: append ? currentCursor || undefined : undefined,
        });
        if (append) {
          setConsultations((prev) => [...prev, ...res.items]);
        } else {
          setConsultations(res.items);
        }
        setCursor(res.next_cursor || null);
        setHasMore(Boolean(res.next_cursor));
      } catch (err) {
        console.error(err);
        setError("Failed to load consultations");
      } finally {
        setLoading(false);
      }
    },
    [setConsultations],
  );

  // Load data when filters change (including initial mount)
  useEffect(() => {
    setCursor(null);
    void load(false, filters, null);
  }, [filters, load]);

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;
    void load(true, filters, cursor);
  }, [hasMore, loading, load, filters, cursor]);

  const updateFilters = useCallback((next: ConsultationFilters) => {
    setFilters(next);
  }, []);

  return {
    consultations,
    loading,
    error,
    hasMore,
    loadMore,
    filters,
    setFilters: updateFilters,
  };
}


