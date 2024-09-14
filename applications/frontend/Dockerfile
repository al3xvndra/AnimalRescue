# Dockerfile for frontend service

# Use a Node.js base image
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code (including Vite configuration)
COPY code/ .

# Expose the port on which your Vite development server will run
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]
