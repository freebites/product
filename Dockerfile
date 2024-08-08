# Use an official Node.js runtime as the base image
FROM node:20

RUN npm install -g npm@latest

# Set the working directory in the container
WORKDIR ./
ENV HOST 0.0.0.0
# Copy package.json and package-lock.json to the container
COPY package*.json ./   
COPY react-native-map-web-fix.js ./
# Install dependencies
RUN npm install && npm run postinstall

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["npm", "run", "server"]
