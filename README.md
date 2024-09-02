## React without CRA

### CRA이란?

React 앱 개발에 필요한 webpack, babel, 개발 서버  등 복잡한 설정들을 명령어 하나로 자동화 하기 위해 facebook에서 개발한 CLI(Command-Line Interface) 도구

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

`Babel` : 높은버전, 최신 문법, 확장문법(ex. JSX)등의 자바스크립트 코드를 IE 호환성을 위해 낮은 버전의 자바스크립트로 변환해준다.

### 1. Babel 설치

babel 설치 후, `<script type=”text/babel”>` 로 실행 전에 해당 스크립트를 트랜스파일할것을 명시하면  JSX로 작성한 element를 실행할 수 있다.