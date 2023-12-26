FROM node:18-alpine AS runtime

ENV NODE_ENV=production
ENV TZ=Europe/Oslo

WORKDIR /app

# Delete source code files that were used to build the app that are no longer needed
COPY output/ ./
COPY package.json/ ./
COPY .npmrc/ ./
RUN npm install

# The USER instruction sets the user name to use as the default user for the remainder of the current stage
#USER node:node
RUN adduser --disabled-password \
    --home /app \
    --uid 1001 \
    --gecos '' adminportal && chown -R adminportal /app
USER adminportal

# This is the command that will be run inside the image when you tell Docker to start the container
EXPOSE 3000
CMD ["node","./index.js"]