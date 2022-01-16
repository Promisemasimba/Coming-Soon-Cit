FROM node:14.17.4-alpine3.11
WORKDIR /app/
COPY package* .
SHELL ["/bin/bash", "-xo", "pipefail", "-c"]
RUN ["npm","install"]
COPY . .
EXPOSE 3000
ENTRYPOINT ["node","server.js"]
