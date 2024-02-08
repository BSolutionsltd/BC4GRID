FROM python 

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /root

COPY ./requirements.txt /root/requirements.txt


RUN apt update
RUN apt install cron -y
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
