# node 16 이미지를 기반으로 함
FROM krmp-d2hub-idock.9rum.cc/goorm/node:16

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 필요한 React App 소스 코드를 이미지에 복사
COPY . .

ENV REACT_APP_API_URL=https://k0b2de7d86228a.user-app.krampoline.com/
ENV REACT_APP_TOSS_CLIENT_KEY=test_ck_kYG57Eba3GZ6EDp2M598pWDOxmA1
ENV GENERATE_SOURCEMAP=false

# 필요한 npm 패키지 설치
RUN npm ci
RUN npm install -g serve

# 프로젝트 npm build
RUN npm run build

# 서버 실행 시 사용하는 포트 지정
EXPOSE 3000

# 컨테이너를 시작할 때 빌드된 React App을 서빙
CMD ["serve", "-s", "build"]