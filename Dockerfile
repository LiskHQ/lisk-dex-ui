FROM node:16.15.0

ARG NEXT_PUBLIC_PROJECT_ID
ARG NEXT_PUBLIC_RELAY_URL
ARG NEXT_PUBLIC_TEST_NET
ARG NEXT_PUBLIC_LISK_SERVICE_URL
ARG NEXT_PUBLIC_DEX_SERVICE_URL
ARG NEXT_PUBLIC_WS_URL

ENV NEXT_PUBLIC_PROJECT_ID=$NEXT_PUBLIC_PROJECT_ID
ENV NEXT_PUBLIC_RELAY_URL=$NEXT_PUBLIC_RELAY_URL
ENV NEXT_PUBLIC_TEST_NET=$NEXT_PUBLIC_TEST_NET
ENV NEXT_PUBLIC_LISK_SERVICE_URL=$NEXT_PUBLIC_LISK_SERVICE_URL
ENV NEXT_PUBLIC_DEX_SERVICE_URL=$NEXT_PUBLIC_DEX_SERVICE_URL
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the default Next.js port (3000)
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]
