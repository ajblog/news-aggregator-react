# News Aggregator Application

A modern React-based news aggregator that fetches content from multiple news sources including NYT, Guardian, and NewsAPI. Built with TypeScript, Vite, and featuring a modular component architecture.

## Overview

This project demonstrates a client-side news aggregation system with mocked authentication and user preference management. While designed as a learning project, it implements several industry-standard practices and architectural patterns.

## Architecture

### Frontend Stack

- **Framework**: React19 with TypeScript
- **Build Tool**: Vite
- **State Management**: Context API (scoped to necessary features)
- **Styling**: Tailwind CSS + ShadCN UI components
- **API Client**: Axios + React Query
- **Local Storage**: IndexedDB

### Project Structure

```plaintext
src/
├── components/
│   ├── ui/           # Reusable UI components
|   ├── widgets/      # More complex and entangled components
│   └── Wrappers/     # Wrapper components design patter including Providers etc...
├── hooks/           # Custom React hooks
├── services/        # API, data, database and other services
├── tests/           # Test configuration and Integration tests for the future...
├── constants/       # Reused Constants
├── pages/           # Different pages that are consumed by the router
├── types/           # Reused types
└── utils/           # Utility functions

```

## Key Features

### News Aggregation System

- Fetches news from NYT, Guardian, and NewsAPI
- Implements caching with React Query
- Handles rate limiting and API errors
- Supports user preference-based filtering

### Mock Authentication System

⚠️ **Development Implementation Notice**
The authentication system uses IndexedDB for storage, which is suitable for prototyping but not secure for production use. In a real-world application, proper backend authentication would be required.

#### Why This Approach Is Not Production-Ready:

1. Security Risks:

   - Credentials stored client-side
   - Vulnerable to XSS attacks
   - No session management

2. Limitations:
   - Data persistence issues
   - No multi-device sync
   - Limited scalability
   - No proper audit logging

### User Preferences

The main point of using a User management system has been to implement Preferences foe each user indivually, users can set and edit their preferences and then use them to have a personalized news feed

- Stores preferences with userId foreign key
- Manages user-specific settings
- Persists data locally using IndexedDB

## Deployment

### Docker Configuration

The application provides two Docker configurations for different environments:

1. **Development Environment**

   - Uses Vite's development server
   - Hot module replacement enabled
   - Source maps included
   - Optimized for development workflow

2. **Production Environment**
   - Optimized builds with Vite
   - Nginx for serving static assets
   - Production-ready configuration

### Running Docker Containers

To run the containers, use the following commands:

#### Development Environment

```bash
# Build development image
docker build -f ./Dockerfile.dev -t ${container-name}:${container-version} .

# Run development container
docker run -p ${PORT}:5173 --rm ${container-name}:${container-version}
```

#### Production Environment

```bash
# Build production image
docker build -f ./Dockerfile.prod -t ${container-name}:${container-version} .

# Run production container
docker run -p ${PORT}:80 --rm ${container-name}:${container-version}
```

Replace `PORT` and `container-name` and `container-version` and with your desired port number. The container will be automatically removed when stopped due to the `--rm` flag.

### Port Mapping Explanation

- **Development**: Maps host port `${PORT}` to container port `5173` (Vite's default development port)
- **Production**: Maps host port `${PORT}` to container port `80` (Nginx default port)
- The `--rm` flag ensures containers are cleaned up after stopping
- The `-p` flag enables port mapping between host and container

### Dockerfile Structure

The Dockerfiles are organized as follows:

```plaintext
Dockerfile.dev
Dockerfile.prod
news-aggregator.nginx.conf  # Production Nginx configuration
```

### Environment Configuration

Create environment files in the root directory:

**`.env.development`**

```makefile
VITE_NYT_API_KEY=your_development_nyt_key
VITE_GUARDIAN_API_KEY=your_development_guardian_key
VITE_NEWSAPI_KEY=your_development_newsapi_key
```

**`.env.production`**

```makefile
VITE_NYT_API_KEY=your_production_nyt_key
VITE_GUARDIAN_API_KEY=your_production_guardian_key
VITE_NEWSAPI_KEY=your_production_newsapi_key
```

### Running the Application

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## Testing Strategy

The project currently includes unit tests for core components. Due to time constraints, integration tests were not implemented. Future improvements should include:

1. Component Integration Tests
2. API Service Tests
3. State Management Tests
4. End-to-End Testing

## Deployment

### Docker Configuration

Two separate Dockerfiles are provided:

1. **Dockerfile.dev** - Development environment
2. **Dockerfile.prod** - Production environment

Production setup includes Nginx configuration for optimal serving of static assets.

## Best Practices Implemented

1. **Environment Separation**

   - Separate API keys for development and production
   - Secure handling of sensitive data

2. **Modular Architecture**

   - Component-based structure
   - Clear separation of concerns
   - Reusable UI components

3. **State Management**

   - Context API used judiciously
   - Scoped to necessary features
   - Avoids prop drilling

4. **Performance Optimization**

   - React Query for API caching
   - Efficient re-renders
   - Optimized asset loading

5. **Type Safety**
   - Full TypeScript implementation
   - Proper interface definitions
   - Runtime type checking

## Future Improvements

1. Replace mock authentication with proper backend
2. Implement complete test suite
3. Add error boundaries
4. Enhance accessibility features
5. Optimize performance metrics
