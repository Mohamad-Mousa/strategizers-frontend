import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchWebsiteData } from "../store/slices/websiteSlice";
import { fetchSettings } from "../store/slices/settingsSlice";

const DataLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch website and settings data on component mount
    dispatch(fetchWebsiteData());
    dispatch(fetchSettings());
  }, [dispatch]);

  return children;
};

export default DataLoader;
