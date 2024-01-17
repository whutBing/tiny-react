// 使用vdom的方式,创建vdom不是写死,类似工场函数
function createTextNode(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "string" ? createTextNode(child) : child;
      }),
    },
  };
}

function render(el, container) {
  debugger;
  nextWorkUnit = {
    dom: container,
    props: {
      children: [el]
    }
  }
  
  //
  // const children = el.props.children;
  // children.forEach((child) => {
  //   render(child, dom);
  // });
  // container.append(dom);
}



let nextWorkUnit = null;

function performWorkOfUnit(work) {
  debugger;
  if (!work.dom) {
    // 1. 创建 dom
    const dom = (work.dom =
      work.type === "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(work.type));
    work.parent.dom.append(dom)
    // 2. 处理 props
    Object.keys(work.props).forEach((key) => {
      if (key !== "children") {
        dom[key] = work.props[key];
      }
    });
  }
  // 3. 转换链表 设置好指针
  const children = work.props.children;
  let prevChild = null;
  children.forEach((child, index) => {
    const newWork = {
      type: child.type,
      props: child.props,
      child: null,
      parent: work,
      sibling: null,
      dom: null
    }
    debugger
    if (index === 0) {
      work.child = newWork;
    } else {
      prevChild.sibling = newWork;
    }
    prevChild = newWork;
  })
  // 4. 返回下一个要执行的任务
  if (work.child) {
    return work.child
  }
  if (work.sibling) {
    return work.sibling;
  }
  return work.parent?.sibling
}

function workLoop(deadline) {
  let shouldYield = false;
  while (!shouldYield && nextWorkUnit) {
    nextWorkUnit = performWorkOfUnit(nextWorkUnit);
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop);

const React = {
  render,
  createElement,
};
export default React;
