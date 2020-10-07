FROM node:12-buster-slim AS base

ENV HOME /app
ENV PORT 5000
ENV NODE_ENV production

WORKDIR ${HOME}

COPY package.json package-lock.json ./

EXPOSE ${PORT}

FROM base AS dependencies

RUN npm install

FROM dependencies AS dev_dependencies

RUN npm install --only=dev

FROM dev_dependencies AS dev

COPY src ${HOME}/src
COPY documentation ${HOME}/documentation

USER node
ENTRYPOINT ["npm", "run", "dev"]
CMD ["-L"]

FROM dev_dependencies AS build

COPY src ${HOME}/src
COPY tsconfig.json ${HOME}

RUN npm run build

FROM base AS prod

COPY documentation ${HOME}/documentation
COPY --from=dependencies ${HOME}/node_modules ${HOME}/node_modules
COPY --from=build ${HOME}/dist ${HOME}/dist

USER node
ENTRYPOINT ["node", "./dist/app.js"]
CMD [""]
