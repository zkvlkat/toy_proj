# 베이스 이미지로 Python 3.9 사용
FROM python:3.9

# 패키지 업데이트 및 vim 설치
RUN apt-get update && \
    apt-get install -y vim && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일들을 컨테이너에 복사
ADD ./deploy /app
WORKDIR /app

# 필요한 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# Gunicorn을 사용하여 앱 실행
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "app:app"]
