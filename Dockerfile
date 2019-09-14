ARG IMAGE=direvius/yandex-tank

FROM ${IMAGE}

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
RUN apt-get install nodejs

RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/* /tmp/* /var/tmp/*

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . /app
RUN npm run build

EXPOSE 4000

ENTRYPOINT ["npm","start"]
# ENTRYPOINT ["/bin/bash"]

# VOLUME ["/var/loadtest"]
# WORKDIR /var/loadtest
# ENTRYPOINT ["/usr/local/bin/yandex-tank"]
# ENTRYPOINT ["/bin/ping","-c","3"]