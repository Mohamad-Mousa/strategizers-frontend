import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchWebsite, clearError } from "@/store/slices/websiteSlice";

export const useWebsite = () => {
  const dispatch = useAppDispatch();
  const { website, loading, error } = useAppSelector((state) => state.website);

  // Fetch website data on mount if not already loaded
  useEffect(() => {
    if (!website && !loading && !error) {
      dispatch(fetchWebsite());
    }
  }, [dispatch, website, loading, error]);

  // Helper functions
  const refetchWebsite = () => {
    dispatch(fetchWebsite());
  };

  const clearWebsiteError = () => {
    dispatch(clearError());
  };

  return {
    website,
    loading,
    error,
    refetchWebsite,
    clearWebsiteError,
  };
};
