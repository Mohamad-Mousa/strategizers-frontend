# Redux Store Documentation

This document explains the Redux setup and usage patterns in the Strategizers frontend application.

## Overview

The application uses Redux Toolkit for state management with the following structure:

```
src/store/
├── index.js              # Main store configuration
├── hooks.js              # Typed Redux hooks
├── selectors.js          # Common selectors
├── middleware.js         # Custom middleware
├── slices/               # Redux slices
│   ├── websiteSlice.js
│   ├── servicesSlice.js
│   ├── projectsSlice.js
│   ├── blogsSlice.js
│   ├── testimonialsSlice.js
│   ├── teamSlice.js
│   ├── faqSlice.js
│   └── contactSlice.js
└── README.md
```

## Store Configuration

The main store is configured in `src/store/index.js` with the following features:

- **Redux Toolkit**: Uses `configureStore` for simplified setup
- **Serializable Check**: Configured to ignore certain action types and paths
- **Middleware**: Includes default middleware with custom configuration

## Available Slices

### 1. Website Slice (`websiteSlice.js`)

- **Purpose**: Manages website configuration data
- **Actions**:
  - `fetchWebsiteData`: Fetch website data from API
  - `updateWebsiteData`: Update website data (with FormData support)
- **State**: `{ data, loading, error, updateLoading, updateError }`

### 2. Services Slice (`servicesSlice.js`)

- **Purpose**: Manages services data with pagination and filtering
- **Actions**:
  - `fetchServices`: Fetch services with pagination and filters
  - `fetchServiceBySlug`: Fetch single service by slug
- **State**: `{ services, currentService, loading, pagination, filters }`

### 3. Projects Slice (`projectsSlice.js`)

- **Purpose**: Manages projects data with pagination and filtering
- **Actions**:
  - `fetchProjects`: Fetch projects with pagination and filters
  - `fetchProjectBySlug`: Fetch single project by slug
- **State**: `{ projects, currentProject, loading, pagination, filters }`

### 4. Blogs Slice (`blogsSlice.js`)

- **Purpose**: Manages blogs data with pagination and filtering
- **Actions**:
  - `fetchBlogs`: Fetch blogs with pagination and filters
  - `fetchBlogBySlug`: Fetch single blog by slug
- **State**: `{ blogs, currentBlog, loading, pagination, filters }`

### 5. Testimonials Slice (`testimonialsSlice.js`)

- **Purpose**: Manages testimonials data with pagination
- **Actions**:
  - `fetchTestimonials`: Fetch testimonials with pagination and filters
- **State**: `{ testimonials, loading, pagination, filters }`

### 6. Team Slice (`teamSlice.js`)

- **Purpose**: Manages team members data with pagination
- **Actions**:
  - `fetchTeam`: Fetch team members with pagination and filters
- **State**: `{ team, loading, pagination, filters }`

### 7. FAQ Slice (`faqSlice.js`)

- **Purpose**: Manages FAQ data with pagination
- **Actions**:
  - `fetchFaqs`: Fetch FAQs with pagination and filters
- **State**: `{ faqs, loading, pagination, filters }`

### 8. Contact Slice (`contactSlice.js`)

- **Purpose**: Manages contact form submissions
- **Actions**:
  - `submitContactForm`: Submit contact form data
- **State**: `{ loading, error, success, submittedData }`

## Usage Examples

### Basic Usage in Components

```jsx
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchServices } from "../store/slices/servicesSlice";
import { selectServices, selectServicesLoading } from "../store/selectors";

const ServicesPage = () => {
  const dispatch = useAppDispatch();
  const services = useAppSelector(selectServices);
  const loading = useAppSelector(selectServicesLoading);

  useEffect(() => {
    dispatch(fetchServices({ page: 1, limit: 10 }));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {services.map((service) => (
        <div key={service._id}>{service.title.en}</div>
      ))}
    </div>
  );
};
```

### Using Selectors with Parameters

```jsx
import { useAppSelector } from "../store/hooks";
import { selectServicesByCategory } from "../store/selectors";

const ServiceCategory = ({ category }) => {
  const services = useAppSelector((state) =>
    selectServicesByCategory(state, category)
  );

  return (
    <div>
      {services.map((service) => (
        <div key={service._id}>{service.title.en}</div>
      ))}
    </div>
  );
};
```

### Handling Form Submissions

```jsx
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { submitContactForm } from "../store/slices/contactSlice";
import { selectContactLoading, selectContactSuccess } from "../store/selectors";

const ContactForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectContactLoading);
  const success = useAppSelector(selectContactSuccess);

  const handleSubmit = (formData) => {
    dispatch(submitContactForm(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
      {success && <div>Form submitted successfully!</div>}
    </form>
  );
};
```

### Error Handling

```jsx
import { useAppSelector } from "../store/hooks";
import { selectServicesError } from "../store/selectors";

const ServicesPage = () => {
  const error = useAppSelector(selectServicesError);

  if (error) {
    return (
      <div className="error">
        Error: {error}
        <button onClick={() => dispatch(fetchServices())}>Retry</button>
      </div>
    );
  }

  // rest of component
};
```

## Best Practices

### 1. Use Typed Hooks

Always use `useAppDispatch` and `useAppSelector` instead of the plain Redux hooks for better TypeScript support.

### 2. Use Selectors

Use selectors to access state data instead of directly accessing the state object.

### 3. Handle Loading States

Always check loading states before rendering data to provide better UX.

### 4. Error Handling

Implement proper error handling for all async operations.

### 5. Cleanup on Unmount

Clear errors and reset state when components unmount:

```jsx
useEffect(() => {
  return () => {
    dispatch(clearServicesError());
  };
}, [dispatch]);
```

### 6. Optimize Re-renders

Use memoized selectors for expensive computations and filtering operations.

## API Integration

All slices use the same API base URL: `${process.env.NEXT_PUBLIC_SERVER_API_BASEURL}/`

### Common API Patterns

1. **Public Endpoints**: `/public/[resource]`
2. **Admin Endpoints**: `/admin/[resource]`
3. **Pagination**: Uses query parameters `page`, `limit`, `sortBy`, `sortDirection`
4. **Filtering**: Uses query parameters `term`, `service`, `tags`
5. **Response Format**: All APIs return `{ code: 200, results: data, message: "Success" }`

### Error Handling

All async thunks use `rejectWithValue` to handle API errors consistently:

```javascript
if (data.code === 200) {
  return data.results;
} else {
  return rejectWithValue(data.message || "Failed to fetch data");
}
```

## Development Tools

### Redux DevTools

The store is configured to work with Redux DevTools for debugging. Install the browser extension to inspect state changes and actions.

### Logging Middleware

Custom logging middleware is included for development that logs all actions and state changes to the console.

## Performance Considerations

1. **Memoized Selectors**: Use `createSelector` for expensive computations
2. **Pagination**: Implement proper pagination to avoid loading large datasets
3. **Caching**: Consider implementing caching strategies for frequently accessed data
4. **Bundle Size**: Redux Toolkit is tree-shakeable, so only used features are included in the bundle

## Migration from Local State

If you're migrating from local state to Redux:

1. Identify the data that needs to be shared across components
2. Create appropriate slices for that data
3. Replace `useState` with Redux state
4. Replace direct API calls with async thunks
5. Update components to use `useAppSelector` and `useAppDispatch`

## Troubleshooting

### Common Issues

1. **State not updating**: Check if the action is being dispatched correctly
2. **Infinite re-renders**: Ensure selectors are not creating new objects on every call
3. **API errors**: Check the network tab and ensure the API endpoint is correct
4. **TypeScript errors**: Make sure to use the typed hooks and selectors

### Debug Tips

1. Use Redux DevTools to inspect state changes
2. Add console logs in middleware to track actions
3. Check the browser's network tab for API calls
4. Use the React DevTools to inspect component props and state
