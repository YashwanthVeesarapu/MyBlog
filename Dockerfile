# Step 1: Build Stage
FROM node:18-alpine AS build-stage

# Set working directory inside container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Step 2: Production Stage
FROM node:18-alpine AS production-stage

# Set working directory
WORKDIR /app

# Copy built application from the build-stage
COPY --from=build-stage /app /app

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
