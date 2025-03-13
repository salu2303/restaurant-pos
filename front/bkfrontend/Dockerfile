# Use Node.js official image
FROM node:18-alpine
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm cache clean --force
RUN npm install

# Copy all files
COPY . .

# Force rebuild esbuild inside Docker
RUN npm rebuild esbuild

# Run the app in development mode (Only for local development)
CMD ["npm", "run", "dev", "--", "--host"]

EXPOSE 5173
