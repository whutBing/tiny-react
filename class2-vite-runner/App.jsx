import React from "./core/React.js";

let showBar = false;

function Counter({num}) {
  const bar = <div>bar</div>
  
  function handleShowBar() {
    console.log('=====App.jsx=====', 'click')
    showBar = !showBar;
    React.update()
  }
  
  return (
    <div>
      Counter
      <div>{showBar && bar}</div>
      <button onClick={handleShowBar}>click</button>
    </div>
  )
}

// const App = React.createElement('app',{id:'app'},"hi","mini-react")
function App() {
  return (
    <div>
      'hi-mini-react'
      <Counter num={10}></Counter>
    </div>
  )
}

export default App;
