# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make gcc g++ curl

# Copy package files and .npmrc
COPY package*.json .npmrc ./

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps --verbose

# Copy entire project
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy package files and .npmrc
COPY --from=build /app/package*.json /app/.npmrc ./

# Install only production dependencies
RUN npm install --omit=dev --legacy-peer-deps --verbose

# Copy built artifacts from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./server.js

# Expose the application port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

# Start the server
CMD ["node", "server.js"]
