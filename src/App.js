/**
 * 
 * App.js : index.js에서 app컴포넌트를 import해서 사용하게 되는 실질적 정보들이 모인 파일.
 * 
 */

import React from "react"; // 이 import를 하지 않으면 여기에 jsx가 있는 component를 사용하는 것을 이해하지 못함
// React : 내가 쓰는 모든 요소를 javascript와 함께 생성하고 html로 밀어넣음. react는 index.html에 element를 넣는 역할을 담당 = 모든 react application을 div사이에 넣음.
// jsx : javascript 안의 HTML. component를 만들고 어떻게 사용하는지에 대한 것, component에 정보를 보낼 수 있음
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component{ // react component에서 존재하는 render method 등을 extends를 써 app component에서도 사용할 수 있게 함
  //state : class component에 있는 object. component의 data를 넣을 공간이 생기고 이 data는 가변적. 즉 데이터가 변함. -> state를 사용해야 하는 이유. component의 data를 바꾸고 싶을 때.
  state = { 
    isLoading: true,
    movies: []
  };
  //api로부터 data fetching
  //axios : fetch위에 있는 작은 layer. api를 사용할 때 쓰는 fetch보다 좋은 방법
  //async()-await : javascript에게 getMovies function에게 시간이 조금 필요하고 우리는 그걸 기다려야만 한다는 개념. -> 비동기화(async:넌 "await 이하를" 기다려야해)
  getMovies = async() => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    // this.state.~ 식으로 하면 react는 render function을 refresh하지 않음. -> 오류 발생 -> setState 사용(state를 바꾸고 싶고 react가 어떤 것이든 refresh해주기를 원할 때)
    this.setState({ movies, isLoading: false }); // state는 object이므로 setState는 새로운 state를 받아야 함
    // 간단히 말하면 setState를 호출 시 react는 state를 refresh, render function을 호출함!
    // setState의 장점이자 React의 장점1 : virtual DOM을 갖고 있기 때문에 state를 업데이트 하면서 render function도 호출해 모든 내용을 다시 렌더링(칠한다)하지만 매우 빠르게 변경할 수 있음. 
    // ********** 간단한 state와 setState 사용의 차이 : setState를 안하면 새로운 state와 함께 render function을 호출하지 않음! setState를 써야 render function도 호출 됨
  }
  componentDidMount(){ //Mount : 태어나다는 의미. component가 마운트되자마자 호출됨!
    this.getMovies(); //api로부터 data fetching
  }

  // ***** React는 자동적으로 class component의 render method를 실행함! // class component를 쓰는 이유 : state 사용(15번째 줄)
  render() {
    //es6의 마법. 리턴 시 this.state를 사용하지 않고 미리 선언해 정의하고 아래 isLoading 바로 사용
    const { isLoading, movies } = this.state; // class이기 때문에 this. 를 써야함 //state에서 온 movies
    return (
    <section className="container">
      {isLoading ? ( // 삼항 연산자: 로딩중이면 Loading... , 끝나면 movie를 render하고 map을 만들고 movie를 render한다.
        <div className="loader">
            <span className="loader__text">Loading...</span>
        </div>
        ) : ( // class가 아니라 className인 이유 : class 일 경우, 유효하지 않은 DOM property class라고 뜬다. jsx때문에, HTML처럼 보이지만 jsx 즉 javascript이므로 javascript안의 class라는 의미는 14번째줄의 class를 지칭 -> class가 아니라 className으로 바꿔 써야 함(HTML의 아주 작은 부분에만 적용. 그리고 console에서 inspect할 시 class로 바뀌어짐)
          <div className="movies"> 
            {movies.map(movie => (
              <Movie // react의 장점2 : 재사용 가능한 component를 만들어 계속 반복해 수동이 아닌 자동으로 사용 가능(Movie component를 다음 줄에 또 쓸 필요가 없음)
                key={movie.id} //key : react 내부에서 사용하는 props. 각각의 요소는 유일한 key prop을 가져야 함.(=key prop이 없을 시 뜨는 오류)
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres} // Movie component로 정보를 보내려고 하면 react는 이 모든 속성들(properties=props)를 가져옴 //props : 뭐든 component에 넣게 되는 것들
              />
            ))}
          </div>
        )}
    </section>);
  }
}

export default App; //선언된 class App을 사용할 수 있게 export 해줌
