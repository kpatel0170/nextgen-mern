
# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package.json ./

# Install app dependencies
RUN npm install

# Copy all the app source code to the container
COPY . .

ENV PORT=3001
# Expose the port your app runs on
EXPOSE $PORT

# Define the command to run your app
CMD ["npm", "run", "dev"]
