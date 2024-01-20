import React from "./core/React.js";

// const App = React.createElement("div", {id: "app"}, "hi", "mini-react");
// console.log('=====App.jsx=====', App)
let count = 10
let props = {id: '11111111111111111'}

function Counter({num}) {
  function handleClick() {
    debugger;
    console.log('=====App.jsx=====', 'click')
    count++;
    props = {}
    React.update()
  }
  
  return (
    <div {...props}>
      count: {count}
      <button onClick={handleClick}>click</button>
    </div>
  )
}

//
// function CounterContainer() {
//   return <Counter/>
// }

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
