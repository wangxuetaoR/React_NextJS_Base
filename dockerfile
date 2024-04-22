FROM centos:latest

ENV NODE_VERSION 18.17.0

RUN export ARCH=$(uname -m | sed 's/aarch64/arm64/' | sed 's/x86_64/x64/') \
 && curl -fsSLO --compressed "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-${ARCH}.tar.xz" \
 && tar -xJf "node-v${NODE_VERSION}-linux-${ARCH}.tar.xz" -C /usr/local --strip-components=1 --no-same-owner \
 && rm "node-v${NODE_VERSION}-linux-${ARCH}.tar.xz" \
 && rm -f /usr/local/bin/nodejs \
 && ln -s /usr/local/bin/node /usr/local/bin/nodejs

WORKDIR /workspace
COPY react-app /workspace/

RUN npm install -g npm@10.5.2


WORKDIR /workspace/react-app
RUN npm install
RUN npm run build

ENV HOST 0.0.0.0

EXPOSE 3000

CMD ["npm", "run", "start"] 