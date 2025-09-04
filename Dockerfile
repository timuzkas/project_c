# Stage 1: Build the React app
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists) first for caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy React build output to Nginx folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
