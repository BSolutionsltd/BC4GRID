FROM python

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /root

COPY ./requirements.txt /root/requirements.txt
RUN pip install --upgrade pip
RUN pip install -r requirements.txt



# RUN apt-get update \
#     && DEBIAN_FRONTEND=noninteractive apt-get -y --no-install-recommends install -y cron \
#     # Remove package lists for smaller image sizes
#     && rm -rf /var/lib/apt/lists/* \
#     && which cron \
#     && rm -rf /etc/cron.*/*

# COPY ./src/entrypoint.sh /entrypoint.sh

# ENTRYPOINT ["/entrypoint.sh"]

# source: `docker run --rm -it alpine  crond -h`
# -f | Foreground
# -l N | Set log level. Most verbose 0, default 8



CMD ["cd","/app"]
 
# Run the command on container startup
# CMD cron -f