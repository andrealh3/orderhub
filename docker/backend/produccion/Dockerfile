FROM python:3.10.12 AS builder

WORKDIR /usr/src/app/backend

COPY ../../backend/requirements.txt .

RUN pip install -r requirements.txt

COPY ../../backend/. .

ENV DJANGO_ENV=produccion

FROM builder AS final

EXPOSE 8000

ENTRYPOINT ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]