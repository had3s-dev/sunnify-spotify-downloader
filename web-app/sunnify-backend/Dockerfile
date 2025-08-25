# Sunnify Backend Dockerfile
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PORT=8000 \
    DOWNLOAD_DIR=/tmp/sunnify

WORKDIR /app

# Install system deps if needed (none required currently)
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["sh", "-c", "gunicorn -b 0.0.0.0:$PORT -w 2 -k gthread --threads 4 app:app"]
