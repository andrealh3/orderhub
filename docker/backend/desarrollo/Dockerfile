FROM python:3.10.12

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app/backend

COPY ../../backend/requirements-dev.txt .

RUN pip install --no-cache-dir -r requirements-dev.txt

ENV DJANGO_ENV=desarrollo

EXPOSE 8000

ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]