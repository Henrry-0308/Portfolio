# ---- STAGE 1: Build ----
# Build the Next.js application and generate static files

# Use an official Node.js runtime as a parent image
# Choose a version compatible with your Next.js app (e.g., 18-alpine, 20-alpine)
# FROM node:22-alpine AS builder

# Set the working directory in the container
# WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
# COPY package.json package-lock.json* ./

# Install project dependencies
# RUN npm ci

# Copy the rest of your application source code
# COPY . .

# Build the Next.js application for static export
# This will create the 'out' folder
# RUN npm run build

# ---- STAGE 2: Serve ----
# Use Nginx to serve the static files

# Use an official Nginx image (alpine version is lightweight)
FROM nginx:stable-alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration file from your project to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static built files from the 'builder' stage's 'out' directory
# to Nginx's default web root directory
COPY out /usr/share/nginx/html

# Expose port 80 (which Nginx listens on by default as per our nginx.conf)
EXPOSE 80

# The command to start Nginx when the container launches
# "daemon off;" keeps Nginx running in the foreground, which is required for Docker containers
CMD ["nginx", "-g", "daemon off;"]