# Server Dockerfile for JARS CMS API
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package manifests
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy server sources
COPY server ./server

# Build server
RUN npm run build:api

# Expose port
EXPOSE 4010

# Start the compiled server
CMD ["node", "server/dist/server.js"]
