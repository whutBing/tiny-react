import React from "./core/React.js";

// const App = React.createElement("div", {id: "app"}, "hi", "mini-react");
// console.log('=====App.jsx=====', App)
function Counter({ count }) {
  return <div>count:{count}</div>
}

//
// function CounterContainer() {
//   return <Counter/>
// }

// const App = React.createElement('app',{id:'app'},"hi","mini-react")
function App() {
  function handleClick(){
    console.log('=====App.jsx=====', 666)
  }
  return (
    <div>
      {/*hi-mini-react*/}
      {/*<Counter count={10}></Counter>*/}
      {/*<Counter count={20}></Counter>*/}
      {/*<CounterContainer/>*/}
      <button onClick={handleClick}>123</button>
    </div>
  )
}

export default App;
