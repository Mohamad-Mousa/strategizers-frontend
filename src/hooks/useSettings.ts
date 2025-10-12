import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchSettings, clearError } from "@/store/slices/settingsSlice";

export const useSettings = () => {
  const dispatch = useAppDispatch();
  const { settings, loading, error } = useAppSelector(
    (state) => state.settings
  );

  // Fetch settings on mount if not already loaded
  useEffect(() => {
    if (!settings && !loading && !error) {
      dispatch(fetchSettings());
    }
  }, [dispatch, settings, loading, error]);

  // Helper functions
  const refetchSettings = () => {
    dispatch(fetchSettings());
  };

  const clearSettingsError = () => {
    dispatch(clearError());
  };

  return {
    settings,
    loading,
    error,
    refetchSettings,
    clearSettingsError,
  };
};
