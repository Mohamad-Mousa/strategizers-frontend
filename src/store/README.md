# Redux Store Documentation

This document describes the Redux store setup and usage for the Strategizers frontend application.

## Store Structure

The Redux store is configured with the following slices:

- **settings**: Website settings and configuration
- **website**: Complete website content and data

## Website Store

### Overview

The website store manages all website content including homepage data, about page, services, projects, testimonials, blogs, and partners.

### State Structure

```typescript
interface WebsiteState {
  website: Website | null;
  loading: boolean;
  error: string | null;
}
```

### Available Actions

- `fetchWebsite()`: Fetches website data from `/public/website` API
- `clearWebsite()`: Clears website data from store
- `clearError()`: Clears error state

### Usage

#### Using the Custom Hook (Recommended)

```typescript
import { useWebsite } from "@/hooks/useWebsite";

const MyComponent = () => {
  const { website, loading, error, refetchWebsite } = useWebsite();

  // The hook automatically fetches data if not already loaded

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!website) return <div>No data</div>;

  return (
    <div>
      <h1>{website.homePage.welcomeSection.title.en}</h1>
      {/* Use website data */}
    </div>
  );
};
```

#### Using Redux Hooks Directly

```typescript
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchWebsite } from "@/store/slices/websiteSlice";

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { website, loading, error } = useAppSelector((state) => state.website);

  useEffect(() => {
    if (!website) {
      dispatch(fetchWebsite());
    }
  }, [dispatch, website]);

  // Component logic
};
```

### Data Structure

The website data includes:

- **homePage**: Welcome section, banners, projects, testimonials, blogs, services, partners
- **aboutPage**: Company information, mission, vision, values, timeline
- **Page banners**: For different sections (service, blog, project, contact, team, FAQ, testimonial, terms, privacy)

### Features

- **Automatic Fetching**: Data is automatically fetched when component mounts if not already loaded
- **Error Handling**: Comprehensive error handling with retry functionality
- **Loading States**: Built-in loading states for better UX
- **TypeScript Support**: Full TypeScript support with proper type definitions
- **Multilingual**: Supports both English and Arabic content

### API Integration

- **Endpoint**: `/public/website`
- **Method**: GET
- **Response**: Complete website data structure
- **Error Handling**: Graceful error handling with user-friendly messages

### Console Logging

The website data is logged to console every time it's fetched:

```javascript
console.log("Website data fetched:", response.results);
```

This helps with debugging and development.

### Example Components

See `src/components/WebsiteDisplay.tsx` for a complete example of how to use the website data in a component.

## Best Practices

1. **Use the Custom Hook**: Prefer `useWebsite()` over direct Redux hooks
2. **Check Loading States**: Always handle loading and error states
3. **Multilingual Support**: Use locale-aware content rendering
4. **Error Recovery**: Provide retry mechanisms for failed requests
5. **Type Safety**: Use TypeScript interfaces for type safety

## File Structure

```
src/
├── store/
│   ├── index.ts                 # Store configuration
│   ├── hooks.ts                 # Typed Redux hooks
│   ├── slices/
│   │   ├── settingsSlice.ts     # Settings slice
│   │   └── websiteSlice.ts      # Website slice
│   └── README.md               # This documentation
├── types/
│   ├── settings.ts             # Settings types
│   └── website.ts              # Website types
└── hooks/
    ├── useSettings.ts          # Settings hook
    └── useWebsite.ts           # Website hook
```

## Integration with Existing Components

The website store can be easily integrated with existing components:

1. Import the `useWebsite` hook
2. Use the website data in your component
3. Handle loading and error states appropriately
4. Ensure multilingual support using the locale

Example integration:

```typescript
const { website } = useWebsite();
const locale = useLocale();

const title =
  website?.homePage.welcomeSection.title[
    locale as keyof typeof website.homePage.welcomeSection.title
  ] || website?.homePage.welcomeSection.title.en;
```
