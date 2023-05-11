# Define the base image
FROM openwa/wa-automate
ENTRYPOINT []

# Copy dependencies file
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production=true

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "start"]
