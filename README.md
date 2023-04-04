# ![logo-002](https://user-images.githubusercontent.com/90181028/217143286-a023dd4b-f3a7-4218-8802-39a3bd2b15a8.png)

<div>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/-React%20Query-FF4154?style=flat-square&logo=react%20query&logoColor=white"/>
<img src="https://img.shields.io/badge/netlify-%23000000.svg?style=flat-square&logo=netlify&logoColor=#00C7B7"/>
</div>

> ### React + React Query 기반으로 개발된 소셜 블로깅 사이트

### [Demo](https://conduit-leejy001.netlify.app/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)

**React + React Query**를 이용하여 CRUD operations, authentication, ,routing, Infinite Scroll등을 구현했습니다.  
다른 프론트엔드/백엔드에서 이 기능을 사용하는 방법에 대한 자세한 내용은 [RealWorld](https://github.com/gothinkster/realworld) 리포지토리를 참조하세요.

# How it works

프로젝트 구조

```bash
📦src
 ┣ 📂api # api 서비스
 ┣ 📂components # 재사용 컴포넌트 모음
 ┣ 📂hooks # customhooks
 ┣ 📂layout # General layout
 ┣ 📂pages # 페이지 구성 요소
 ┣ 📂theme # style
 ┣ 📂types # type
 ┣ 📂utils # 유틸리티 기능
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┗ 📜router.tsx # 동적 라우터 할당
```

### 백엔드 API

편의를 위해 애플리케이션이 요청할 수 있도록 https://conduit.productionready.io/api 에서 실행 중인 라이브 API 서버가 있습니다.  
서버에 대한 모든 경로 및 응답이 포함된 [ 여기에서 API 사양 ](https://api.realworld.io/api-docs/) 을 볼 수 있습니다.  
백엔드 서버의 소스 코드(Node, Rails 및 Django에서 사용 가능)는 [ 기본 RealWorld 저장소 ](https://github.com/gothinkster/realworld)에서 찾을 수 있습니다.

# Getting Started

#### Install
```
yarn
```
#### Build
```
yarn build
```
#### Start
```
yarn start
```

#  기능 개요
예제 애플리케이션은 "Conduit"라는 소셜 블로깅 사이트(예: Medium.com 클론)입니다.  
인증을 포함한 모든 요청에 대해 사용자 정의 API를 사용합니다. [ https://react-query-realworld.netlify.app ](https://conduit-leejy001.netlify.app/)에서 라이브 데모를 볼 수 있습니다.

**일반 기능:**
- JWT를 통한 사용자 인증 (로그인/화원가입 페이지 + Setting 페이지의 로그아웃 버튼)
- CRU- User (가입 및 설정 페이지에 구현되어 있으며 삭제할 필요 없음)
- CRUD Article
- CR-D Comments (Article에 대한 댓글이며 업데이트 필요 없음)
- Aritcle 무한 스크롤
- Tag 검색 기능
- Author follow, Article favorite 기능
- follow한 author와 관련된 article 및 favortie article의 list를 보여주는 기능

**일반적인 페이지 분류는 다음과 같습니다.**
- 홈페이지(URL: /)
  - 태그 목록
  - 피드, 글로벌 또는 태그에서 가져온 article 목록
  - Article list 무한 스크롤
  - Aritcle favorite 기능
- 로그인/가입 페이지(URL: /sign-in, /sign-up)
  - JWT 사용(sessionStorage에 토큰 저장)
- 설정 페이지(URL: /setting)
  - 유저 정보 설정 페이지
- Article 작성/수정 페이지(URL: /editor, /editor/:slug)
- Article 페이지(URL: /article/:slug)
  - 본인이 작성한 article인 경우 수정/삭제 기능
  - 다른 사람이 작성한 article인 경우 follow/favorite 기능
  - 마크다운 렌더링
  - 페이지 하단의 댓글 섹션
  - 댓글 추가/삭제 기능
 - Profile 페이지(URL: /profile/:username, /profile/:username/favorites)
   - 기본 사용자 정보 표시
   - 본인의 프로필인 경우 프로필 수정 기능, 다른 사람인 경우 follow 기능
   - 작성자가 작성한 article 또는 작성자가 즐겨찾는 기사로 채워진 article 목록
