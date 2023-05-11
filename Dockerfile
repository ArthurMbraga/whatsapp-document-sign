# Define the base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy dependencies file
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production=true --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Start the application
CMD ["yarn", "start"]
