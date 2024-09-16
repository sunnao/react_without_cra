## React without CRA

### CRA이란?

React 앱 개발에 필요한 webpack, babel, 개발 서버  등 복잡한 설정들을 명령어 하나로 자동화 하기 위해 facebook에서 개발한 CLI(Command-Line Interface) 도구
<br><br>
### 1. React 설치

```jsx
npm install --save react react-dom
```

**1. react**

리액트 코어 라이브러리

**2. react-dom**

리액트와 DOM 을 연결

### createElement  - React element생성

- **createElement(type, props, ...children)**

[createElement – React](https://ko.react.dev/reference/react/createElement)

```jsx
// createElement 사용
import { createElement } from 'react';

function Greeting({ name }) {
  return createElement(
    'h1',
    { className: 'greeting' },
    'Hello ',
    createElement('i', null, name),
    '. Welcome!'
  );
}

// JSX문법 사용
function Greeting({ name }) {
  return (
    <h1 className="greeting">
      Hello <i>{name}</i>. Welcome!
    </h1>
  );
}
```

### 트랜스파일러

JSX 등을 사용하려면 트랜스파일러(Babel 등)를 사용해야함

`Babel` : 높은버전, 최신 문법(ex.ES6문법 filter,map,replace..), typescript, 확장문법(ex. JSX)등의 자바스크립트 코드를 IE 호환성을 위해 낮은 버전의 자바스크립트로 변환해준다.
<br><br>
### 2. Babel 설치

* 먼저, CDN으로 Babel standalone버전을 추가한 뒤 JSX문법으로 코드를 작성해본다.  
*babel standalone : 브라우저 환경에서 직접 사용할 수 있도록 만들어진 버전의 바벨. 실시간 컴파일되어 동작 테스트용으로 쓰임.

ERROR1>
```
SyntaxError: Unexpected token '<'
```

babel 설치 후, body 안의 스크립트 태그에   
→ `<script type="text/babel">` 로 타입 속성을 주면, 실행 전에 해당 스크립트를 트랜스파일 할 것을 명시하게 되면서 JSX로 작성한 element를 실행할 수 있다.  
  
<br>
ERROR2>
<br><br>

```
You are using the in-browser Babel transformer. Be sure to precompile your scripts for production - https://babeljs.io/docs/setup/
```

브라우저에서(in-browser) 스크립트를 실시간으로 트랜스파일 하는 것보다 미리 트랜스파일된 스크립트를 실행할 것을 권장하는 메시지가 뜬다. (빌드타임에서 트랜스파일 권장)
<br><br>

**라이브러리로 설치하기**
```jsx
npm install --save-dev @babel/core @babel/cli @babel/preset-react
```

**1. @babel/core**

babel의 핵심기능 모듈.<br><br>

**2. @babel/cli**

터미널에서 babel을 사용할 수 있게 해주는 도구.<br><br>

**3. @babel/preset-react**

react 문법을 자바스크립트로 트랜스파일 하기 위한 패키지.<br>
JSX로 작성된 코드들을 createElement 함수를 이용한 코드로 변환해주는 바벨 플러그인이 내장되어있다.<br>
- .babelrc<br>
바벨은 실행될 때 .babelrc라는 파일을 자동으로 찾아 설정정보를 참조하므로, 로트 디렉토리에 .babelrc 파일을 만든 후, preset 정보를 넣는다.<br><br>


**폴더 구조 변경**

1) 루트 디렉토리에 src/app.js파일 생성.
2) index.html 파일에 있던 script 태그 내 내용들 app.js로 이동.<br><br>

### 3. Build 프로세스에 babel 적용

```json
// package.json
 "scripts": {
    "build": "babel src --out-dir dist"
  }
  ```
*babel : babel 실행 명령어<br>
*src : 원본 소스 폴더명<br>
*--out-dir : 트랜스파일 결과물을 저장하는 폴더 정의 옵션<br>
→ "build 할때 babel 을 실행해서 src 폴더 내부에 있는 파일들을 모두 트랜스파일하여 dist 라는 폴더로 옮긴다." 는 명령어
<br><br>
빌드타임에서 트랜스파일된 스크립트를 실행할 수 있게 되었으므로 html에서 CDN으로 불러오던 babel을 제거하고, `<script src="dist/app.js">` 로 수정한다. → 이전의 ERROR2> 사라짐.
