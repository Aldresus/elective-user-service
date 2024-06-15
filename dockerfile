# Base image
FROM node:22.2.0-alpine

# ENV NODE_ENV production # breaks nestjs because CLI is dev only
USER node

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY --chown=node:node . .

RUN npx prisma generate

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/src/main.js" ]