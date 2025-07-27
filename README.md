# 💡 프로젝트 소개

<p align="center">
  <img width="256" height="256" alt="Image" src="https://github.com/user-attachments/assets/7f8e680a-1b91-4cf9-8e57-601194df249d" />
</p>

<p align="center">
  ezManual은 쉽게 <b>사용자 매뉴얼</b>을 생성하고 다른 사람에게 공유할 수 있도록 돕는 <b>크롬 익스텐션</b>입니다.
</p>

<br>
<br>

# 📖 목차
- [🔍 기능 프리뷰](#-기능-프리뷰)
- [🔗 레포지토리 링크](#-레포지토리-링크)
- [🔥 동기](#-동기)
- [🛠️ 기술 스택](#️-기술-스택)
  - [🤔 Swiper.js 사용한 이유](#-swiperjs-사용한-이유)
  - [🤔 MongoDB 사용한 이유](#-mongodb-사용한-이유)
- [✨ 기능](#-기능)
  - [1. 사용법을 알려주고 싶은 웹페이지에서 클릭](#1-사용법을-알려주고-싶은-웹페이지에서-클릭)
  - [2. 매뉴얼 생성](#2-매뉴얼-생성)
  - [3. 매뉴얼 편집 및 옵션 설정](#3-매뉴얼-편집-및-옵션-설정)
  - [4. 생성된 매뉴얼  공유하기](#4-생성된-매뉴얼--공유하기)
- [🏋 도전](#-도전)
  - [1. 매뉴얼은 어떤 데이터를 기준으로 구성해야 할까?](#1-매뉴얼은-어떤-데이터를-기준으로-구성해야-할까)
  - [2. 크롬 익스텐션 환경에서 로그인 인증 흐름을 어떻게 안정적으로 설계할 수 있을까?](#2-크롬-익스텐션-환경에서-로그인-인증-흐름을-어떻게-안정적으로-설계할-수-있을까)
  - [3. 캡처 이미지를 사이드패널에 실시간 반영하기](#3-캡처-이미지를-사이드패널에-실시간-반영하기)
- [👥 팀원](#-팀원)

<br>
<br>

# 🔍 기능 프리뷰
<p align="center">
  <video src="https://github.com/user-attachments/assets/75883916-1aee-4a18-8311-ad4651aa80c1" controls width="800"></video>
</p>

<br>
<br>

# 🔗 레포지토리 링크
* [frontend](https://github.com/ezMaunal/frontend)
* [backend](https://github.com/ezMaunal/backend)
* [web-viewer](https://github.com/ezMaunal/web-viewer)

<br>
<br>

# 🔥 동기

이미 인터넷이 보편화된 지 오래되었고, 일상 속 거의 모든 일을 온라인을 통해 할 수 있게 되었습니다.<br>
그러나 인터넷이 익숙하지 않으신 분들, 특히 <b>연세가 많으신 분들</b>에게는 브라우저 속 세상이 여전히 너무 <b>복잡하고 어렵게</b> 느껴질 때가 많습니다.<br>

누군가 설명을 해준다고 하더라도 <b>정확히 "어디를 눌러야 할지 몰라서"</b> 포기하는 경우가 많고, 가족들이 도와주더라도 <b>사용법을 말로 전달하는 데에는 한계</b>가 있기 때문입니다.<br>
따라서 디지털 세상이라고 불리는 오늘에도 <b>심각한 디지털 격차는 여전히 지속되고 있습니다.</b>

이러한 현실을 보며, <b>누구나 쉽게 브라우저를 사용할 수 있도록 "단순하고 친절한 매뉴얼"을 만들어주는 크롬 확장 도구</b>가 있으면 좋겠다는 생각을 하게 되었습니다.<br>
화면을 캡처하고 글자를 적어주는 <b>수동적인 방식이 아니라</b>, ‘클릭’만으로 원하는 동작을 표현하고, <b>필요한 매뉴얼을 자동으로 생성해주는 도구</b>라면
많은 사람들에게 실질적인 도움이 될 것이라 생각했습니다.

또한 이러한 도구는 <b>회사에서 업무를 인수인계하거나, 팀원에게 작업 절차를 설명해야 하는 많은 사람들에게도 큰 효율</b>을 줄 수 있을 것입니다.<br>
이것이 저희가 <b>ezManual</b>을 만들게 된 가장 중요한 동기입니다.

뿐만 아니라, 기술적으로는 기존에 전혀 경험해 보지 못한 <b>크롬 확장 프로그램이라는 형식의 도구를 직접 만든다는 사실</b> 역시<br>
지적으로 큰 <b>설렘과 동기부여</b>를 주었습니다.

<br>
<br>

# 🛠️ 기술 스택

## Frontend
### Chrome Extension
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)
![tailwindcss](https://img.shields.io/badge/tailwindcss-61DAFB?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router DOM](https://img.shields.io/badge/React%20Router%20DOM-CA4245?style=for-the-badge&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest%20V3-FFCA28?style=for-the-badge&logo=googlechrome&logoColor=black)



### Web Viewer (공유용 페이지)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)
![tailwindcss](https://img.shields.io/badge/tailwindcss-61DAFB?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router DOM](https://img.shields.io/badge/React%20Router%20DOM-CA4245?style=for-the-badge&logoColor=white)
![Swiper.js](https://img.shields.io/badge/Swiper.js-6332F6?style=for-the-badge&logoColor=white)

## Backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB & Mongoose](https://img.shields.io/badge/MongoDB%20&%20Mongoose-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS%20S3-569AFA?style=for-the-badge&logo=amazonaws&logoColor=white)

<br>

## 🤔 Swiper.js 사용한 이유

<b>ezManual</b>에서는 공유된 매뉴얼을 보다 직관적으로 열람할 수 있도록
<b>리스트 보기 모드(기본)</b>와 <b>슬라이드 모드</b> 두 가지 뷰를 제공합니다.

이 중 <b>슬라이드 모드</b>는 각 단계를 <b>PPT처럼 한 장씩 넘기며 확인할 수 있는 방식</b>으로,
사용자가 각 단계를 <b>순차적으로 집중하여</b> 살펴볼 수 있도록 설계되었습니다.

이를 구현하기 위해 핵심 UI 라이브러리로 <b>Swiper.js</b>를 도입하였습니다.
- 터치, 드래그, 키보드 방향키 등 다양한 입력 방식 지원
- 페이지네이션 (예: 1 / 5) 으로 현재 위치를 직관적으로 표시
- 반응형 레이아웃 지원으로 모바일, 태블릿 등 다양한 환경에서 최적화된 동작 제공

Swiper는 이러한 기능적 강점을 바탕으로,
매뉴얼의 각 단계를 효과적으로 시각화하고 전달하는 데 최적의 도구라 판단되어 적용되었습니다.

<br>

## 🤔 MongoDB 사용한 이유

본 프로젝트에서는 사용자 계정 정보와 매뉴얼 데이터를 저장하기 위한 데이터베이스로 <b>MongoDB</b>를 선택했습니다.<br>

MongoDB는 <b>유연한 스키마 구조</b>를 제공하기 때문에, 매뉴얼처럼 구조가 다양하고 자주 변경될 수 있는 데이터를 저장하고 관리하는 데 매우 적합합니다.<br>
또한 문서 단위로 데이터를 빠르게 조회할 수 있어, 사용자별 매뉴얼을 실시간으로 불러와야 하는 UX 요구 사항에도 부합합니다.<br>

당시 개발 기간은 약 <b>3주로 제한</b>되어 있었고, 관계형 데이터베이스를 새롭게 학습하고 적용하기에는 현실적인 제약이 컸습니다.<br>
반면, <b>백엔드 개발자인 저를 포함해 일부 팀원이 MongoDB 사용 경험이 있었기 때문에</b>, 익숙한 기술을 활용해 빠르게 개발에 착수하는 것이 프로젝트의 안정성과 완성도를 높이는 데 더 효과적인 선택이라 판단했습니다.<br>

또한 MongoDB는 사전에 스키마를 엄격히 정의하지 않아도 되기 때문에, <b>개발 도중 요구사항 변경이나 기능 추가가 발생하더라도 유연하게 대응</b>할 수 있었습니다.<br>
이러한 특성은 반복적인 수정과 개선이 잦은 짧은 개발 주기에 매우 유리했습니다.<br>

결론적으로, MongoDB는 본 프로젝트에서 요구되는 <b>자유로운 데이터 구조, 빠른 개발 속도, 유연한 변경 대응</b> 측면에서 가장 적합한 데이터베이스였습니다.

<br>
<br>

# ✨ 기능

### 1. 사용법을 알려주고 싶은 웹페이지에서 클릭

<details><summary>🎬 구현 영상 1</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/6abf0738-7aee-4de9-b311-1830280a7f86" width="800" />
</p>
</details>

<details><summary>🎬 구현 영상 2</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/ff1c30b2-50ce-4995-863d-7e3e33421122" width="800" />
</p>
</details>

- ezManual은 <b>최소한의 간단한 행동</b>으로 <b>매뉴얼</b>을 만들고자 하였습니다.
- 매뉴얼을 만들고 싶은 사용자는 자신이 다른 사람에게 <b>사용법</b>을 알려주고 싶은 <b>웹 페이지</b>에 가서, 원래 필요한 행동과 동일하게 <b>순서대로 클릭</b>만 하면 됩니다.

<br>

### 2. 매뉴얼 생성

<details>
<summary>🖼️ 이미지</summary>
<p align="center">
  <img width="701" height="654" alt="Image" src="https://github.com/user-attachments/assets/30550eb2-3b9f-44c0-ac17-f20c424ed87c" />
</p>
</details>

- 사용자가 <b>한 번의 클릭</b>을 하는 순간, 클릭한 부분은 <b>누구나 쉽게 알아볼 수 있는 사각형 표시</b>로 <b>강조</b>된 상태로 <b>스크린샷</b>이 찍힙니다.
- 그리고 스크린샷 상단에는 사용자가 클릭한 <b>Tag 내용</b>을 반영하여 <b>“ ‘로그인’을 클릭하였습니다”</b>와 같은 <b>설명</b>이 <b>자동 생성</b>됩니다.
- 따라서 사용자는 <b>몇 번의 클릭만으로</b> <b>강조 표시된 스크린샷</b>과 <b>설명이 포함된 매뉴얼</b>을 <b>손쉽게 생성</b>할 수 있습니다.

<br>

### 3. 매뉴얼 편집 및 옵션 설정

<details><summary>🎬 구현 영상 1</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/caa39495-6712-4372-b57f-108ecfcd4d82" width="800" />
</p>
</details>

<details><summary>🎬 구현 영상 2</summary>
<p align="center">
  <img src="https://github.com/user-attachments/assets/39554af1-0d30-4adf-b91a-14a4f714b9c5" width="800" />
</p>
</details>

- 매뉴얼에는 <b>자동으로 설명</b>이 생성되지만, 사용자는 자신의 필요에 따라 그 설명 내용을 <b>수정</b>·<b>추가</b>·<b>삭제</b>할 수 있습니다.
- 또한 사용자는 이미 생성된 <b>설명 페이지</b>가 <b>불필요</b>하다고 느끼는 경우 이를 <b>삭제</b>할 수도 있습니다.
- 생성된 <b>매뉴얼</b>은 <b>자동으로 저장소에 저장</b>되며, 사용자는 저장소에서 <b>저장된 매뉴얼을 삭제</b>할 수 있고, <b>이미 생성한 매뉴얼을 수정</b>할 수도 있습니다.

<br>

### 4. 생성된 매뉴얼  공유하기

- 사용자는 자신이 생성한 <b>매뉴얼</b>을 <b>URL 형태</b>로 <b>손쉽게 공유</b>할 수 있습니다.
- <b>저장소</b>에 저장된 매뉴얼을 선택하고 <b>공유 버튼</b>을 누르면 해당 매뉴얼의 <b>URL이 복사</b>됩니다.
- URL을 공유받은 사람은 <b>가입 등 별도의 절차 없이</b> <b>생성된 매뉴얼을 바로 확인</b>할 수 있습니다.


<br>
<br>

# 🏋 도전

## 1. 매뉴얼은 어떤 데이터를 기준으로 구성해야 할까?

매뉴얼 생성 기능을 백엔드에서 구현하면서 가장 핵심적인 고민은 <b>"사용자의 클릭 흐름을 어떤 데이터 구조로 저장할 것인가?"</b>였습니다.<br>
단순히 이미지 여러 장을 저장하는 것으로는 사용자가 원하는 설명 흐름을 재현하기 어렵다고 판단하였고, 각 스텝의 정보가 명확하게 식별되고 구성되어야 했습니다.<br>

이를 해결하기 위해 아래와 같은 MongoDB 스키마를 설계하였습니다:
```js
const stepSchema = new mongoose.Schema(
  {
    imageId: { type: String, required: true },     // 각 스텝별 이미지 고유 식별자
    text: { type: String, default: "" },           // 사용자가 입력한 설명 텍스트
    url: { type: String, required: true },         // S3에 저장된 이미지 URL
  },
  { _id: false } // steps 배열 내에서는 별도의 _id 필드 생략
);

const manualSchema = new mongoose.Schema(
  {
    manualId: { type: String, required: true, unique: true, index: true }, // 매뉴얼 고유 ID
    userId: { type: String, required: true },     // 매뉴얼 생성자
    name: { type: String, required: true },       // 매뉴얼 이름
    steps: [stepSchema],                          // 클릭 순서에 따른 스텝 배열
```
이 스키마는 매뉴얼이 단순한 이미지 목록이 아닌, <b>의미 있는 사용자 행동 흐름</b>으로 구성될 수 있도록 설계하였습니다.<br>

특히 각 스텝에는 <code>imageId</code>, 설명 텍스트(<code>text</code>), 실제 이미지 경로(<code>url</code>)이 포함되어 있어, 사용자의 클릭 맥락을 충분히 설명할 수 있도록 구성하였습니다.<br>
또한, 로그인한 사용자만 매뉴얼을 생성할 수 있도록 <code>userId</code>를 기반으로 인증 시스템을 적용하였으며,<br>
날짜 기반의 <code>name</code> 필드와 고유한 <code>manualId</code>를 설정하여 데이터 충돌 없이 안정적으로 식별할 수 있도록 구현하였습니다.<br>

이러한 고민과 구조 설계를 바탕으로, 사용자의 클릭 기록은 단순한 데이터의 나열이 아닌,
<b>다른 사람과 공유 가능한 단계별 매뉴얼 형태로 발전</b>할 수 있는 기반을 마련할 수 있었습니다.

<br>

## 2. “크롬 익스텐션 환경에서 로그인 인증 흐름을 어떻게 안정적으로 설계할 수 있을까?”

우리가 만든 서비스는 <b>일반 웹페이지가 아니라 크롬 익스텐션</b>에서 동작합니다.<br>
이런 환경에서는 로그인 후 화면이 하나가 아니라 팝업, 백그라운드, 사이드패널 등 <b>여러 곳에서 로그인 상태를 유지해야 하기 때문에</b>,<br>
<b>로그인 흐름과 토큰 저장 방식</b>을 어떻게 설계할지 고민이 필요했습니다.<br>
우리는 <b>카카오 로그인(OAuth)</b>을 사용했고, 다음과 같은 흐름으로 로그인 기능을 구현했습니다:<br>

### 1️⃣ 사용자가 로그인 버튼을 누르면, 작은 팝업 창을 띄워 카카오 로그인 페이지로 이동시킵니다.
```js
// 프론트엔드: 로그인 버튼 클릭 시
const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?...`;
window.open(kakaoLoginUrl, "_blank", "width=500,height=700");
```
### 2️⃣ 사용자가 카카오에서 로그인을 완료하면, 백엔드에서 토큰을 생성합니다.
```js
// 백엔드: /kakao/login
const jwtAccessToken = generateAccessToken({ userId });
res.cookie("refreshToken", refreshToken, { httpOnly: true }); // 보안용 쿠키
res.json({ token: jwtAccessToken }); // 프론트로 accessToken 전달
```
- <b>accessToken</b>: 로그인 여부를 확인할 때 사용 (로컬스토리지에 저장)

- <b>refreshToken</b>: 자동 로그인 유지용 (보안 강화를 위해 쿠키에 저장)

### 3️⃣ 팝업 창은 백엔드에서 받은 토큰을 부모 창으로 전달하고 닫습니다.
```js
// 팝업 창에서 실행되는 코드
window.opener.postMessage({ token: res.data.token }, "*"); // 부모 창에 토큰 전달
window.close(); // 팝업 종료
```
### 4️⃣ 메인 화면(부모 창)은 이 메시지를 받아 토큰을 저장하고 로그인 상태를 갱신합니다.
```js
// 프론트엔드 메인 화면
useEffect(() => {
  const handleMessage = (event) => {
    if (event.data?.token) {
      localStorage.setItem("accessToken", event.data.token); // 토큰 저장
      setIsLoggedIn(true); // 상태 업데이트
      navigate("/"); // 홈으로 이동
    }
  };
  window.addEventListener("message", handleMessage);
  return () => window.removeEventListener("message", handleMessage);
}, []);
```
### ✅ 왜 이렇게 나눠서 저장했을까?<br>
- <code>accessToken</code>은 자주 쓰이고 바로 읽어야 해서 <b>로컬스토리지에 저장</b>했습니다.

- <code>refreshToken</code>은 보안이 중요한 정보라 <b>자바스크립트로 접근할 수 없도록 쿠키에 저장</b>했습니다.

이 구조 덕분에 우리는 크롬 익스텐션이라는 복잡한 환경 속에서도, <b>로그인 후 사용자의 인증 상태를 안정적으로 유지할 수 있었고</b>,
<b>다양한 화면(사이드패널, 콘텐츠 스크립트 등)에서도 동일한 인증 정보를 활용할 수 있게 만들었습니다.</b>

<br>

## 3. 캡처 이미지를 사이드패널에 실시간 반영하기

<b>ezManual을 개발하며 가장 도전적인 부분 중 하나는, 웹페이지에서 캡처한 이미지를 확장 프로그램의 사이드패널에 실시간으로 전달하고 렌더링하는 과정</b>이었습니다.

Chrome 확장 프로그램은 구조적으로 다음과 같은 세 개의 분리된 환경으로 구성됩니다:

- 사용자가 보고 있는 웹페이지에서 실행되는 <b>content script</b>

- 확장 프로그램의 UI를 담당하는 <b>사이드패널 (React)</b>

- 이 둘 간의 통신을 중계하는 <b>background script</b>

이 세 환경은 <b>서로의 메모리나 DOM에 직접 접근할 수 없는 완전히 독립적인 실행 컨텍스트</b>이기 때문에, 웹페이지에서 캡처가 이루어진 후 해당 데이터를 사이드패널로 전달하려면 <b>background script를 반드시 거쳐야</b> 합니다.

### 🧪 초기 구현 방식
초기에는 다음과 같은 방식으로 동작을 설계했습니다:

1. <b>Content script</b>에서 사용자의 클릭을 감지

2. 해당 정보를 <b>Background script</b>에 메시지로 전달

3. Background에서는 chrome.tabs.captureVisibleTab() API로 화면을 캡처

4. 이미지를 Base64 형식으로 변환

5. chrome.runtime.sendMessage()를 통해 <b>사이드패널</b>에 전달

이 방식은 <b>캡처 이미지를 사이드패널에 실시간으로 렌더링하는 데 성공적</b>이었습니다.

### ⚠️ 문제 발생
그러나 테스트 도중, <b>사이드패널을 닫았다 다시 열면 이전에 캡처한 모든 내용이 사라지는 문제</b>가 발생했습니다.
이는 <b>사용자 입장에서 치명적인 UX 문제</b>라고 판단하였고, 사이드패널의 동작 방식을 전면 재설계하기로 결정했습니다.

### ✅ 구조 개선: 상태 저장 방식으로 전환
Chrome 공식 문서를 조사하는 과정에서 chrome.storage.local API를 확인했고,
이를 활용하면 문제를 해결할 수 있다고 판단해 적용하였습니다.

최종 구조는 다음과 같습니다:

- <b>Background script</b>는 캡처된 이미지를 Base64 Data URL로 변환 후, chrome.storage.local에 저장

- <b>사이드패널</b>은 chrome.storage.onChanged 이벤트를 통해 변경 사항을 실시간 감지하여 렌더링

이 구조 덕분에 <b>사이드패널이 일시적으로 닫히더라도 캡처 데이터는 안전하게 유지</b>되며,
<b>사용자는 이전 상태를 그대로 이어서 작업을 계속할 수 있게 되었습니다.</b>

<br>
<br>

# 👥 팀원
<details><summary>오선호</summary>
이번 팀 프로젝트를 하면서 제가 가장 크게 느낀 점은 <b>“의사소통이 정말 중요하다”</b>는 것이었습니다.<br>
저는 백엔드를 담당했고, 나머지 두 팀원은 프론트엔드를 맡았는데,<br>
자연스럽게 프론트와 백엔드가 연결되는 과정에서 <b>상호 이해와 협업</b>이 중요하다는 걸 실감하게 되었습니다.<br>
<br>
처음에는 프론트엔드에서 어떤 기능을 요청하면, "이해했다"고 생각하고 바로 코드를 작성해 응답을 구현했지만,<br>
나중에 보니 <b>제가 잘못 이해한 경우가 많았습니다.</b><br>
<br>
이런 시행착오를 겪고 나서부터는, 프론트에서 요구사항을 전달해주면<br>
<b>제가 먼저 이해한 내용을 다시 정리해서 설명하고, 그게 맞는지 확인한 후에</b> 개발을 진행하는 방식으로 바꾸게 되었습니다.<br>
이 작은 변화가 결과적으로 <b>오해를 줄이고, 개발 속도와 정확도를 높이는 데 큰 도움이</b> 되었습니다.<br>
<br>
또한 이번 프로젝트는 백엔드뿐만 아니라 <b>크롬 익스텐션 개발</b>, <b>Git 협업</b>, <b>API 설계와 구현</b>, <b>배포까지 이어지는 전반적인 과정</b>을 다루었기 때문에<br>
처음 접하는 부분도 많았고, 쉽지 않았습니다.<br>

하지만 잘 모르는 부분은 팀원들과 함께 공부하고, 의견을 주고받으면서 하나씩 만들어나가다 보니<br>
<b>아무것도 없던 곳에서 무언가를 만들어낸 성취감</b>과 함께 <b>자신감</b>도 생겼습니다.<br>

팀원들과 역할을 분담하고 일정도 팀원과 계획해가면서 진행했기 때문에
<b>중간에 늘어지지 않고 꾸준히 집중할 수 있었고</b>,<br>
서로의 부족한 부분을 채워주며 <b>시너지 효과</b>도 많이 느꼈습니다.<br>

특히 백엔드 개발자를 꿈꾸는 사람으로서,<br>
<b>프론트엔드와의 연결이 얼마나 중요한지</b>, 그리고 그 과정에서의 <b>정확한 의사소통이 왜 필수적인지</b> 몸소 체감할 수 있었습니다.
</details>
<br>
<details><summary>김찬</summary>
이번 팀 프로젝트에서 저는 <b>프론트엔드 개발</b>을 담당했지만,<br>
<b>백엔드 개발자와의 협업</b>을 통해 MongoDB 및 API 요청 처리 과정에 대해서도 많은 것을 배울 수 있었습니다.<br>
<br>
프론트엔드 입장에서 <b>어떻게 요청을 보내야 하며, 그 요청이 백엔드 API와 정확히 일치해야 하는지</b>를 명확히 이해하게 되었고,<br>
이 과정은 단순한 UI 개발을 넘어 <b>시스템 전반의 흐름을 파악하는 데 큰 도움이</b> 되었습니다.<br>
<br>
또한, 평소에는 <b>웹 페이지 중심의 개발</b>만 경험해왔지만,<br>
이번 프로젝트를 통해 처음으로 <b>크롬 확장 프로그램 개발</b>에 도전하게 되었습니다.<br>
<br>
확장 프로그램은 content script, background script, side panel 등 <b>여러 실행 환경이 독립적으로 동작</b>하며,<br>
각 환경 간 데이터 전달 방식 또한 <b>일반 웹 애플리케이션과는 전혀 다른 구조</b>를 갖고 있음을 직접 경험했습니다.<br>
일상적으로 사용하는 크롬 확장 프로그램들 역시 <b>이런 복잡한 구조 위에 설계되어 있다는 사실</b>을 이해하게 된 것은 매우 뜻깊은 경험이었습니다.<br>
<br>
프로젝트는 저를 포함해 세 명이 함께 진행하였으며,<br>
특히 백엔드와의 협업 과정에서 <b>프론트엔드와 백엔드가 서로의 코드를 충분히 이해하고 긴밀하게 조율해야 한다</b>는 점을 실감했습니다.<br>
<br>

<b>명확한 의사소통과 코드에 대한 이해를 바탕으로 협업이 원활히 이루어졌고,</b><br>
이는 앞으로 <b>팀 프로젝트나 실무에서도 매우 중요한 자산</b>이 될 것이라 느꼈습니다.<br>
<br>
마지막으로, 이번 프로젝트는 <b>기술적인 성장</b>뿐만 아니라 <b>협업의 중요성과 소통의 가치</b>를 깊이 배울 수 있었던 경험이었습니다.<br>
이 경험을 바탕으로 <b>앞으로 더 나은 개발자이자 팀원이 되기 위해 지속적으로 노력해야겠다고 다짐</b>하게 되었습니다.
</details>
<br>
<details><summary>임대환</summary>
이번 프로젝트를 하면서 가장 크게 배운 것은,<br>
<b>팀원들과의 차이를 인정하는 여유와 대화로 그 간극을 좁혀가는 방법</b>이었습니다.<br>
모든 사람은 각기 <b>생각하는 방식, 행동하는 법이 다르기</b> 때문에<br>
그 차이를 여유 있게 받아들이기로 했습니다.<br>
<br>
대신 프로젝트라는 <b>공동의 목표를 지향하기 위해 지속적으로 노력</b>했기에,<br>
서로의 차이를 더 잘 알고 이해할 수 있었습니다.<br>
그래서 프로젝트의 시작점보다 끝날 때,<br>
<b>팀원들 간의 사고 방식과 일하는 스타일을 더 깊이 이해하고, 더욱 우애로운 관계</b>가 되지 않았나 생각합니다.<br>
<br>
결국 <b>협업이란 단순히 일을 분배하는 것이 아니라,</b><br>
<b>공통의 목표를 튼튼히 공유하면서 차이를 인정하되,</b><b>서로를 이해하려고 끊임없이 애쓰는 과정</b>이라는 것을 배우게 되었습니다<br>
<br>
또 한 가지는, <b>크롬 익스텐션이라는 새로운 형태의 서비스를 만들어보며 작업 자체에서 큰 기쁨을 느꼈다는 점</b>입니다.<br>
처음이라 서툴고 막막하기도 했지만,<br>
서비스 형태가 달랐던 만큼 그에 필요한 <b>새로운 기술을 익히고 직접 구현해 나가는 과정이 신선하고 재미있었습니다.</b>
</details>
