FROM node:8-alpine

ENV HOME=/home/app
ENV APP_PATH=$HOME/graphql-api

# Copy necessary files for installing dependencies
COPY yarn.lock package.json $APP_PATH/

# Run yarn before src copy to enable better layer caching
WORKDIR $APP_PATH
RUN yarn

COPY tsconfig.json $APP_PATH/
COPY src $APP_PATH/src

RUN yarn build

ENV NODE_ENV=production

CMD ["node", "build/server"]
