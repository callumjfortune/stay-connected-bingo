# Use an official node image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install a simple server to serve the built app
RUN npm install -g serve

# Set the command to run the app on port 5000
CMD ["serve", "-s", "build", "-l", "5000"]

# Expose the port the app runs on
EXPOSE 5000
