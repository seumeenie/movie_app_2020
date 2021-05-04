/**
 * index.js : index.html에 빈 div 공간에 모든 정보를 가상화로 렌더링 해주는 연결 파일.
 * 핵심 개념 : Virtual DOM = virtual document object model. 
 * application이 로드할 때 빈 HTML을 로드하게 되고 react가 component에 작성해 뒀던 것들을 HTML로 put -> react가 빠른 이유
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//***** react application은 하나의 component만을 rendering해야 함! (유일한 component = 여기선 App)
ReactDOM.render(<App />, document.getElementById('bababa')); // potato는 index.html의 div id 값임