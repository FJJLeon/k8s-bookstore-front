FROM nginx:latest
RUN apt-get update \
    && apt-get install -y --no-install-recommends cowsay \
    && rm -rf /var/lib/apt/lists/*
ENV PATH "$PATH:/usr/games"

ADD ./build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["cowsay"]
CMD ["Hello, World!"]