# Define the base image
FROM openwa/wa-automate
ENTRYPOINT []

ENV PUPPETEER_CACHE_DIR=/app/.cache/puppeteer

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production=true --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Start the application
CMD ["yarn", "start"]
