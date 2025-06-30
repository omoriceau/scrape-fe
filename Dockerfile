
# Use a Node.js base image
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the SvelteKit application
RUN npm run build

# Use a smaller image for production
FROM node:20-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

# Expose the port SvelteKit runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "build"]
