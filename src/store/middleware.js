// Custom middleware for logging Redux actions
export const loggerMiddleware = (store) => (next) => (action) => {
  if (process.env.NODE_ENV === "development") {
    console.group(action.type);
    console.info("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    console.groupEnd();
    return result;
  }
  return next(action);
};

// Middleware for handling API errors globally
export const errorMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Check if action was rejected
  if (action.type && action.type.endsWith("/rejected")) {
    const error =
      action.payload || action.error?.message || "An error occurred";

    // You can add global error handling here
    // For example, showing a toast notification
    if (process.env.NODE_ENV === "development") {
      console.error("Redux Error:", error);
    }

    // You could dispatch a global error action here
    // store.dispatch(setGlobalError(error));
  }

  return result;
};

// Middleware for analytics tracking
export const analyticsMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Track specific actions for analytics
  if (action.type && action.type.includes("/fulfilled")) {
    // You can add analytics tracking here
    // For example, tracking successful API calls
    if (process.env.NODE_ENV === "development") {
      console.log("Analytics: Action completed successfully", action.type);
    }
  }

  return result;
};
