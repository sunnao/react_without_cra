## React without CRA

### CRA이란?

React 앱 개발에 필요한 webpack, babel, 개발 서버  등 복잡한 설정들을 명령어 하나로 자동화 하기 위해 facebook에서 개발한 CLI(Command-Line Interface) 도구
<br><br>
## 1. React 설치

```jsx
npm install --save react react-dom
```

**1. react**
<br>
리액트 코어 라이브러리

**2. react-dom**
<br>
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

<br><br>
## 2. Babel 설치
### 트랜스파일러

JSX 등을 사용하려면 트랜스파일러(Babel 등)를 사용해야함

`Babel` : 자바스크립트 트랜스파일러로. 높은버전, 최신 문법(ex.ES6문법 filter,map,replace..), typescript, 확장문법(ex. JSX)등의 자바스크립트 코드를 IE 호환성을 위해 낮은 버전의 자바스크립트로 변환해준다.

 ① 먼저, CDN으로 **Babel standalone** 버전을 추가한 뒤 JSX문법으로 코드를 작성해본다.  
*babel standalone : 브라우저 환경에서 직접 사용할 수 있도록 만들어진 버전의 바벨. 실시간 컴파일되어 동작 테스트용으로 쓰임.

- **ERROR 1>**
  ```
  SyntaxError: Unexpected token '<'
  ```

  babel 설치 후, body 안의 스크립트 태그에   
  → `<script type="text/babel">` 로 타입 속성을 주면, 실행 전에 해당 스크립트를 트랜스파일 할 것을 명시하게 되면서 JSX로 작성한 element를 실행할 수 있다.  

- **ERROR 2>**<br>

  ```
  You are using the in-browser Babel transformer. 
  Be sure to precompile your scripts for production 
  - https://babeljs.io/docs/setup/
  ```

  브라우저에서(in-browser) 스크립트를 실시간으로 트랜스파일 하는 것보다 미리 트랜스파일된 스크립트를 실행할 것을 권장하는 메시지가 뜬다. (빌드타임에서 트랜스파일 권장)
<br><br>

**② 라이브러리로 설치하기**
```jsx
npm install --save-dev @babel/core @babel/cli @babel/preset-react
```

**1. @babel/core**
<br>
babel의 핵심기능 모듈.

**2. @babel/cli**
<br>
터미널에서 babel을 사용할 수 있게 해주는 도구.

**3. @babel/preset-react**
<br>
react 문법을 자바스크립트로 트랜스파일 하기 위한 패키지.<br>
JSX로 작성된 코드들을 createElement 함수를 이용한 코드로 변환해주는 바벨 플러그인이 내장되어있다.

### babel 설정파일

- **.babelrc**<br>
  바벨은 실행될 때 .babelrc라는 파일을 자동으로 찾아 설정정보를 참조하므로, 루트 디렉토리에 .babelrc 파일을 만든 후, preset 정보를 넣는다.

  ```js
  // .babelrc
  {
    "presets": ["@babel/preset-react"]
  }
  ```

### 폴더 구조 변경

1) 루트 디렉토리에 src/app.js파일 생성.
2) index.html 파일에 있던 script 태그 내 내용들 app.js로 이동.<br><br>

### Build 프로세스에 babel 적용

```js
// package.json
 "scripts": {
    "build": "babel src --out-dir dist"
  }
  ```
  
*`babel` : babel 실행 명령어<br>
*`src` : 원본 소스 폴더명<br>
*`--out-dir` : 트랜스파일 결과물을 저장하는 폴더 정의 옵션<br>
→ "build 할때 babel 을 실행해서 src 폴더 내부에 있는 파일들을 모두 트랜스파일하여 dist 라는 폴더로 옮긴다." 는 명령어

빌드타임에서 트랜스파일된 스크립트를 실행할 수 있게 되었으므로 html에서 CDN으로 불러오던 babel을 제거하고, `<script src="dist/app.js">` 로 수정한다. → 이전의 ERROR2> 사라짐.

<br><br>
## 3. webpak 적용 

웹팩은 의존성 있는 모듈을 하나의 파일로 통합시켜주는 번들러이다.

### 번들러

개발단계에서는 유지보수성을 위해 파일이 분리하여 개발한다.<br> 반면 애플리케이션이 실행되는 운영환경에서는 일반적으로 파일의 개수가 최소화 될수록 좋다.<br>
이를 위해 분리된 모듈을 다시 통합하는 과정을 번들링이라고 하며, 대표적인 번들러로 Webpack, Rollup이 있다.


<details>
<summary>파일의 개수가 최소화 되어야 하는 이유?</summary>
<div markdown="1">
http 요청을 통해 서버로부터 스크립트를 받게되는데, 일반적으로 브라우저에서 한번에 6개의 TCP 연결만 허용한다.(크롬, 사파리, 파이어폭스-6개, IE-버전별 상이) 그 이상의 http요청이 일어날 경우 먼저 요청된 6개의 스크립트가 완전히 로드될 때까지 나머지 요청은 대기상태(Stalled)가 된다. 따라서 스크립트 로드를 위한 http요청을 최소화 하는 것이 좋다.(https://developer.chrome.com/docs/devtools/network/reference?hl=ko#timing-preview)
</div>
</details>

<br>

**1. webpack 설치**
```jsx
npm install --save-dev webpack webpack-cli
```
<br>

**2. babel-loader 설치**
```jsx
npm install --save-dev babel-loader
```
babel과 통합하는역할을 한다.<br>
기본적으로 Webpack은 JavaScript 및 JSON 파일만 해석 가능한데, 로더(loaders)를 사용하면 Webpack이 다른 포멧의 파일을 처리하고, 이를 앱에서 사용할 수 있는 모듈로 변환 할 수 있다.<br><br>


### webpack 설정파일

- **webpack.config.js**<br>
  build 환경인 Node.js에서 실행되기 때문에 CommonJS 문법을 사용해야 한다.

    ```js
    module.exports = { ... }
    ```

    *`entry`: 번들링의 시작점 지정.<br>
    *`output`: 번들링 결과물에 대한 옵션.<br>
      - { `path`: 저장할 폴더, `filename`: 저장할 파일명 }<br>

    *`modules`: 다양한 파일들을 확장자별로 어떻게 처리할지 지정하는 옵션. 어떤 확장자를 어떤 loader를 사용해서 처리할 것인지 정규식을 사용하여 rules를 지정해준다.<br>보통 node_modules는 외부에서 배포한 패키지가 담겨있는 폴더이고, 이미 실행 가능한 형태로 build 되어있기 때문에 exclued 옵션을 통해 제외해준다.

    <details>
      <summary>babel-loader</summary>
      <div markdown="2">
      프로젝트 내에서 .js, .jsx, .ts, .tsx, .css, .scss 등 여러가지 파일들이 사용된다. 
      하지만 webpack은 자바스크립트 코드(.js 파일)만 처리하여 번들링할 수 있다. 이 외의 파일들은 번들링 하기 전에 전처리가 필요한데, 이 전처리에 사용되는 모듈이 loader 이다.
      </div>
    </details>
  <br>

### Build 프로세스에 webpack 적용

```js
// package.json
 "scripts": {
    "build": "webpack"
  }
  ```
  → `npm run build` 실행하면 설정 옵션대로 dist 폴더 내에 bundle.js 파일이 생성된 것을 확인할 수 있다.

  → index.html 에서 기존 app.js스크립트 파일을 실행하도록 했던 부분을 bundle.js 를 실행하도록 수정하면 (`<script src="dist/bundle.js"/></script>`) 번들링 된 스크립트를 로드하게 된다.

  → 빌드폴더는 버전관리하지 않기 때문에 .gitignore에 정의 한다.