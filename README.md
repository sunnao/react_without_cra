## React without CRA

### CRA이란?

React 앱 개발에 필요한 webpack, babel, 개발 서버  등 복잡한 설정들을 명령어 하나로 자동화 하기 위해 facebook에서 개발한 CLI(Command-Line Interface) 도구

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

`Babel` : 높은버전, 최신 문법(ex.ES6문법 filter,map,replace..), 확장문법(ex. JSX)등의 자바스크립트 코드를 IE 호환성을 위해 낮은 버전의 자바스크립트로 변환해준다.

### 2. Babel 설치

babel 설치 후, `<script type=”text/babel”>` 로 실행전에 해당 스크립트를 트랜스파일할것을 명시하면  JSX로 작성한 element를 실행할 수 있다.

```
You are using the in-browser Babel transformer. Be sure to precompile your scripts for production - https://babeljs.io/docs/setup/
```

브라우저에서(in-browser) 스크립트를 실시간으로 트랜스파일 하는것보다 미리 트랜스파일된 스크립트를 실행할것을 권장하는 메시지가 뜬다.

```jsx
npm install --save-dev @babel/core @babel/cli @babel/preset-react
```

**1. @babel/core**

babel의 핵심기능 모듈.

**2. @babel/cli**

터미널에서 babel을 사용할 수 있게 해주는 도구.

**3. @babel/preset-react**

react 문법을 자바스크립트로 트랜스파일 하기 위한 패키지