import React from "./core/React.js";

let showBar = false;

function Counter({num}) {
  const foo = (
    <div>
      foo
      <div>child</div>
    </div>)
  const bar = <div>bar</div>
  
  function handleShowBar() {
    console.log('=====App.jsx=====', 'click')
    showBar = !showBar;
    React.update()
  }
  
  return (
    <div>
      Counter
      <button onClick={handleShowBar}>click</button>
      <div>{showBar ? bar : foo}</div>
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
