import { useState, useEffect } from 'react';
import { fetchStudyCenters } from '../services/api';
import type { StudyCenter } from '../types';

export function useStudyCenters() {
  const [centers, setCenters] = useState<StudyCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudyCenters()
      .then(setCenters)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { centers, loading, error };
}
