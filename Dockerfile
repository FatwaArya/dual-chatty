# =============================================================================
# Stage 1: Build the Next.js frontend
# =============================================================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app/web

# Copy package files for dependency installation
COPY web/package.json web/package-lock.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy the rest of the frontend source code
COPY web/ ./

# Build the Next.js application
RUN npm run build

# =============================================================================
# Stage 2: Final production image
# =============================================================================
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=3001

# Copy server directory
COPY server/package.json server/package-lock.json ./server/
COPY server/server.js ./server/

# Install only production dependencies for the server
WORKDIR /app/server
RUN npm ci --only=production

# Install Next.js in server for production serving
RUN npm install next@16.1.1 react@19.2.3 react-dom@19.2.3

# Go back to app root
WORKDIR /app

# Copy the built Next.js application from Stage 1
COPY --from=frontend-builder /app/web/.next ./web/.next
COPY --from=frontend-builder /app/web/public ./web/public
COPY --from=frontend-builder /app/web/package.json ./web/package.json
COPY --from=frontend-builder /app/web/node_modules ./web/node_modules

# Create a directory for persistent data and set permissions
RUN mkdir -p /app/server/data

# Expose the application port
EXPOSE 3001

# Set working directory to server for the entrypoint
WORKDIR /app/server

# Start the server (which serves both frontend and WebSocket)
CMD ["node", "server.js"]

