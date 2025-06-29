# 🎬 Movie Search Frontend

A beautiful, responsive movie search application built with Next.js 15, TypeScript, and modern React patterns. Features real-time search, detailed movie information, user ratings, and a polished UI with dark mode support.

## 🏗️ Architecture

\`\`\`
frontend/
├── app/                    # Next.js App Router
│   ├── movies/            # Movie pages
│   │   ├── [id]/         # Dynamic movie details
│   │   └── page.tsx      # Movie search page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── providers.tsx     # App providers
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── movie-card.tsx    # Movie display card
│   ├── search-bar.tsx    # Search input with suggestions
│   ├── search-filters.tsx # Advanced filters
│   ├── star-rating.tsx   # Interactive rating system
│   ├── navbar.tsx        # Navigation bar
│   ├── theme-toggle.tsx  # Dark/light mode toggle
│   └── loading-skeleton.tsx # Loading states
├── store/                # Redux Toolkit
│   ├── slices/           # Redux slices
│   │   ├── moviesSlice.ts
│   │   ├── searchSlice.ts
│   │   └── ratingsSlice.ts
│   ├── hooks.ts          # Typed Redux hooks
│   └── index.ts          # Store configuration
├── hooks/                # Custom React hooks
│   ├── useMovies.ts      # Movie data fetching
│   └── useDebounce.ts    # Debounced values
├── lib/                  # Utilities
│   ├── api.ts            # OMDB API client
│   └── utils.ts          # Helper functions
├── package.json
├── .env.example
└── README.md
\`\`\`

## 🔧 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack Query (React Query)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes (Dark/Light mode)
- **API**: OMDB (Open Movie Database)

## ⚡ Quick Start

### Prerequisites

- Node.js (v18 or higher)
- OMDB API key (free from [omdbapi.com](http://omdbapi.com/))
- npm or yarn

### Installation

1. **Navigate to frontend directory**:
   \`\`\`bash
   cd frontend
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment setup**:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. **Configure environment variables**:
   \`\`\`env
   # OMDB API Configuration
   NEXT_PUBLIC_OMDB_API_KEY="your-omdb-api-key-here"
   
   # Backend API Configuration (if integrating with backend)
   NEXT_PUBLIC_API_BASE_URL="http://localhost:5000"
   
   # App Configuration
   NEXT_PUBLIC_APP_NAME="Movie Search App"
   NEXT_PUBLIC_APP_VERSION="1.0.0"
   \`\`\`

5. **Start development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

Application will be running at \`http://localhost:3000\`

## 🎯 Features

### Core Features ✅

#### 🏠 Home Page
- **Hero section** with search functionality
- **Feature highlights** with animations
- **Call-to-action** sections
- **Responsive design** for all devices

#### 🔍 Movie Search (/movies)
- **Real-time search** with debounced API calls
- **Search suggestions** with autocomplete
- **Recent searches** with local storage
- **Advanced filters** (Year, Type)
- **Infinite scroll** pagination
- **Loading states** with skeleton UI
- **Error handling** with user-friendly messages

#### 🎬 Movie Details (/movies/[id])
- **Comprehensive movie information**:
  - Poster, title, year, genre
  - Plot summary
  - Director, actors, writer
  - Runtime, release date
  - Language, country, awards
  - Multiple rating sources (IMDb, Rotten Tomatoes, etc.)
- **Interactive star rating** system
- **Persistent user ratings** (localStorage)
- **Responsive layout** with sticky poster

#### ⭐ Star Rating System
- **5-star interactive rating**
- **Hover effects** and animations
- **Persistent storage** in localStorage
- **Visual feedback** for user ratings
- **Rating display** on movie cards

#### 🌙 Dark Mode Toggle
- **System preference detection**
- **Manual theme switching**
- **Persistent theme storage**
- **Smooth transitions**
- **Consistent theming** across all components

### Bonus Features ✅

#### 🚀 React Query Integration
- **Efficient data fetching** with caching
- **Background refetching**
- **Optimistic updates**
- **Error retry logic**
- **Stale-while-revalidate** pattern

#### 💫 Framer Motion Animations
- **Page transitions**
- **Component entrance animations**
- **Hover effects**
- **Loading animations**
- **Smooth state transitions**

#### 🎛️ Advanced Search Filters
- **Movie type filtering** (Movies, TV Series, Episodes)
- **Year filtering** (Last 30 years)
- **Active filter display**
- **Filter persistence**
- **Clear all filters** functionality

#### 📱 Responsive Design
- **Mobile-first approach**
- **Tablet optimization**
- **Desktop enhancements**
- **Touch-friendly interactions**
- **Adaptive layouts**

## 🎨 UI/UX Features

### Design System
- **Consistent color palette** with CSS variables
- **Typography scale** with proper hierarchy
- **Spacing system** using Tailwind utilities
- **Component variants** with class-variance-authority
- **Accessible design** with proper ARIA labels

### Interactive Elements
- **Hover states** on all interactive elements
- **Focus indicators** for keyboard navigation
- **Loading states** for better UX
- **Error boundaries** for graceful failures
- **Toast notifications** for user feedback

### Performance Optimizations
- **Image optimization** with Next.js Image component
- **Code splitting** with dynamic imports
- **Bundle optimization** with Next.js
- **Caching strategies** with React Query
- **Debounced search** to reduce API calls

## 📋 Pages & Components

### Pages

#### / (Home)
- Landing page with hero section
- Feature showcase
- Search functionality
- Call-to-action sections

#### /movies (Search)
- Movie search interface
- Filter controls
- Results grid with pagination
- Empty states and error handling

#### /movies/[id] (Details)
- Detailed movie information
- User rating interface
- Related information display
- Navigation controls

### Key Components

#### SearchBar
- Real-time search input
- Debounced API calls
- Autocomplete suggestions
- Recent searches
- Keyboard navigation

#### MovieCard
- Movie poster display
- Basic information
- User rating indicator
- Hover animations
- Click navigation

#### StarRating
- Interactive 5-star system
- Hover preview
- Click to rate
- Persistent storage
- Visual feedback

#### SearchFilters
- Type and year filters
- Active filter display
- Clear functionality
- Responsive design

## 🔌 API Integration

### OMDB API Client
\`\`\`typescript
// Search movies
const response = await omdbApi.searchMovies(
  query,     // Search term
  page,      // Page number
  type,      // movie/series/episode
  year       // Release year
);

// Get movie details
const movie = await omdbApi.getMovieDetails(imdbId);

// Get suggestions
const suggestions = await omdbApi.getMovieSuggestions(query);
\`\`\`

### React Query Integration
\`\`\`typescript
// Infinite query for search results
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['movies', query, filters],
  queryFn: ({ pageParam = 1 }) => omdbApi.searchMovies(query, pageParam),
  getNextPageParam: (lastPage) => lastPage.hasNextPage ? lastPage.page + 1 : undefined
});

// Single movie query
const { data: movie, isLoading } = useQuery({
  queryKey: ['movie', imdbId],
  queryFn: () => omdbApi.getMovieDetails(imdbId),
  staleTime: 30 * 60 * 1000 // 30 minutes
});
\`\`\`

## 🗄️ State Management

### Redux Toolkit Slices

#### Movies Slice
- Movie search results
- Selected movie details
- Loading and error states
- Pagination information

#### Search Slice
- Current search query
- Active filters
- Search suggestions
- Recent searches

#### Ratings Slice
- User movie ratings
- Persistent storage
- Rating management

### Local Storage Integration
\`\`\`typescript
// Ratings persistence
const ratingsSlice = createSlice({
  name: 'ratings',
  initialState: loadFromLocalStorage('movieRatings', {}),
  reducers: {
    setRating: (state, action) => {
      state.ratings[action.payload.movieId] = action.payload.rating;
      saveToLocalStorage('movieRatings', state.ratings);
    }
  }
});
\`\`\`

## 🎨 Styling & Theming

### Tailwind CSS Configuration
\`\`\`javascript
// Custom color palette
colors: {
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: {
    DEFAULT: "hsl(var(--primary))",
    foreground: "hsl(var(--primary-foreground))",
  },
  // ... more colors
}
\`\`\`

### CSS Custom Properties
\`\`\`css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... more variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode overrides */
}
\`\`\`

## 🧪 Testing

### Component Testing
\`\`\`bash
npm test
\`\`\`

### Manual Testing Checklist
- [ ] Search functionality works
- [ ] Movie details load correctly
- [ ] Star ratings persist
- [ ] Dark mode toggles properly
- [ ] Responsive design on mobile
- [ ] Error states display correctly
- [ ] Loading states show appropriately

## 🚀 Deployment

### Build for Production
\`\`\`bash
npm run build
\`\`\`

### Deployment Platforms

#### Vercel (Recommended)
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

#### Netlify
\`\`\`bash
# Build command
npm run build

# Publish directory
out/
\`\`\`

### Environment Variables for Production
Set these in your deployment platform:
- \`NEXT_PUBLIC_OMDB_API_KEY\`
- \`NEXT_PUBLIC_API_BASE_URL\` (if using backend)

## 📊 Performance Metrics

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: &lt; 2.5s
- **FID (First Input Delay)**: &lt; 100ms
- **CLS (Cumulative Layout Shift)**: &lt; 0.1

### Optimization Techniques
- Image optimization with Next.js
- Code splitting and lazy loading
- Bundle size optimization
- Caching with React Query
- Debounced API calls

## 📝 Development Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npm test\` - Run test suite

## 🔧 Configuration Files

### Next.js Configuration
\`\`\`javascript
// next.config.mjs
const nextConfig = {
  images: {
    domains: ['m.media-amazon.com'],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};
\`\`\`

### TypeScript Configuration
\`\`\`json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
\`\`\`

## 🎯 Assignment Requirements Met

### Core Requirements ✅
- [x] Movie list page with OMDB integration
- [x] Movie details page with comprehensive info
- [x] Search functionality with debouncing
- [x] Star rating system with persistence
- [x] Dark mode toggle with persistence
- [x] Next.js App Router usage
- [x] TypeScript throughout
- [x] Redux Toolkit state management
- [x] Tailwind CSS styling
- [x] shadcn/ui components
- [x] Responsive design

### Bonus Features ✅
- [x] React Query for data fetching
- [x] Loading and error states
- [x] Framer Motion animations
- [x] Search filters (Year, Type)
- [x] Autocomplete suggestions
- [x] Recent searches
- [x] Infinite scroll pagination
- [x] Performance optimizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of a fullstack intern assignment and is for educational purposes.

---

**Assignment 2 Complete! 🚀**

A beautiful, feature-rich movie search application with all requirements and bonus features implemented using modern React patterns and best practices.
