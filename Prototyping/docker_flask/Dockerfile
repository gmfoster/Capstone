FROM python:3.7-alpine

RUN adduser -D novasight

WORKDIR /home/novasight

COPY requirements.txt requirements.txt
RUN python -m venv venv
RUN pip install --upgrade pip
RUN venv/bin/pip install -r requirements.txt

COPY app app
COPY novasight.py boot.sh ./
RUN chmod +x boot.sh
RUN venv/bin/pip install gunicorn

ENV FLASK_APP novasight.py


RUN chown -R novasight:novasight ./
USER novasight

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]
