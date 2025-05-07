# ---- Base Stage ----
FROM node:22-alpine

WORKDIR /app

# Copy the standalone output
COPY .next/standalone ./
# Copy the public folder
COPY public ./public
# Copy the .next/static folder for static assets
COPY .next/static ./.next/static

EXPOSE 3000
# The command to run your application using the server.js from the standalone output
CMD ["node", "server.js"]