# Use Node.js official image as base image
FROM node:16-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire frontend project into the container
COPY . .

# Expose port 3000 for React app
EXPOSE 3001

# Run the React development server
CMD ["npm", "start"]
