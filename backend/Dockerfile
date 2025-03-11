# Use official Node.js image
FROM node:18-alpine
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose port
EXPOSE 5001


# CMD ["node", "src/server.js"]
CMD ["npm", "run", "dev"]
