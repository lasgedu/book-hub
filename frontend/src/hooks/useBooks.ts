import { useEffect, useState } from "react";
import { Book, fetchBooks } from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useBooks = () => {
  const filters = useSelector((state: RootState) => state.filters);
  const [data, setData] = useState<{ items: Book[]; total: number }>({
    items: [],
    total: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const response = await fetchBooks({
          search: filters.search || undefined,
          genre: filters.genre === "All" ? undefined : filters.genre,
          sort: filters.sort,
          page: filters.page,
          limit: 8
        });

        setData({ items: response.items, total: response.pagination.total });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filters]);

  return { ...data, loading };
};