FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application code
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
