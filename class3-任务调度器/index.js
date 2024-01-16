let taskId = 1;

function workLoop(deadline) {
  taskId++
  let shoudYield = false;
  while (!shoudYield) {
    console.log('=====index.js=====', `taskId:${taskId} run task`)
    console.log('=====index.js=====', deadline.timeRemaining());
    shoudYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop);



