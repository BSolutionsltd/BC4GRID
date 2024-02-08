FROM python 

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /root

RUN apt update

COPY ./requirements.txt /root/requirements.txt
RUN pip install --upgrade pip
RUN pip install -r /root/requirements.txt