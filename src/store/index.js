import { configureStore } from "@reduxjs/toolkit";
import websiteReducer from "./slices/websiteSlice";
import servicesReducer from "./slices/servicesSlice";
import projectsReducer from "./slices/projectsSlice";
import blogsReducer from "./slices/blogsSlice";
import testimonialsReducer from "./slices/testimonialsSlice";
import teamReducer from "./slices/teamSlice";
import faqReducer from "./slices/faqSlice";
import contactReducer from "./slices/contactSlice";
import settingsReducer from "./slices/settingsSlice";
import partnersReducer from "./slices/partnersSlice";

export const store = configureStore({
  reducer: {
    website: websiteReducer,
    services: servicesReducer,
    projects: projectsReducer,
    blogs: blogsReducer,
    testimonials: testimonialsReducer,
    team: teamReducer,
    faq: faqReducer,
    contact: contactReducer,
    settings: settingsReducer,
    partners: partnersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
});
