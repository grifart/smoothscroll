FROM node:20

WORKDIR /smoothscroll
RUN corepack enable
RUN yarn set version berry
RUN yarn install