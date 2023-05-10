# Define the base image
FROM openwa/wa-automate
ENTRYPOINT []

USER root

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production=true --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Print the contents of the directory
RUN ls -R ./src

# Build the application
RUN yarn build


RUN ls -R ./build

# Start the application
CMD ["yarn", "start"]
