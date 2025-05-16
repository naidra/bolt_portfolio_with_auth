# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to install dependencies first
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your application code into the container
COPY . .

# Step 6: Expose port 3000 (matching your docker-compose.yml)
EXPOSE 3000

# Step 7: Set environment variables (optional, you can also use Docker Compose for this)
ENV NODE_ENV=development

# Step 8: Start the Next.js application in development mode
CMD ["npm", "run", "dev"]
