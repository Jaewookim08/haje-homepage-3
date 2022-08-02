# haje.org 리뉴얼 프로젝트

### 폴더 구조

frontend 폴더는 Gatsby 웹 페이지를 담고 있고, backend 폴더는 CMS로 쓰이는 Strapi가 들어 있습니다.


### 빌드/테스트
##### Prerequisites
`Node.js`: v16.16.0에서 테스트 완료\
DB: strapi 내부적으로 사용하는 db 프로그램이 필요합니다. 현재로서는 `sqlite`입니다. \
외부 db에 접속할 수도 있다고 알고 있습니다.

##### 환경 변수 설정
Strapi CMS는 다음 세 환경 변수를 필요로 합니다.
```shell
HOST=0.0.0.0 # 서버 ip
PORT=1337    # 서버를 열 포트
APP_KEYS=    # 임의의 앱 키 값
```

Gatsby 웹 페이지는 다음 두 환경 변수를 필요로 합니다.
```shell
STRAPI_TOKEN=   # Strapi 토큰 값. Strapi에 접속한 후 Settings>API Tokens 에서 생성할 수 있습니다. 
STRAPI_API_URL= # 접속할 Strapi 서버의 주소
```

##### 테스트
각 폴더에서 `yarn develop` 커맨드를 통해 서버를 실행할 수 있습니다.

현재 폴더에서 `yarn develop` 커맨드를 사용하면 두 서버를 한 번에 실행합니다.

##### 빌드

backend 폴더에서 `NODE_ENV=production yarn build` 를 사용해 strapi 앱을 빌드할 수 있습니다.

frontend 폴더에서는 `yarn build`만 사용해도 production environment를 사용해 빌드합니다.