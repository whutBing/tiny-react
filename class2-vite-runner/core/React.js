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
  // 只会走一次，后变的递归在其他处
  nextWorkUnit = {
    dom: container,
    props: {
      children: [el]
    }
  }
  root = nextWorkUnit;
}


let nextWorkUnit = null;
let root = null

function createDom(type) {
  return type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(type)
}

/**
 * 处理 props
 * @param dom
 * @param props
 */
function updateProps(dom, props) {
  Object.keys(props).forEach((key) => {
    if (key !== "children") {
      dom[key] = props[key];
    }
  });
}

function initChildren(fiber) {
  // 3. 转换链表 设置好指针
  const children = fiber.props.children;
  let prevChild = null;
  children.forEach((child, index) => {
    const newFiber = {
      type: child.type,
      props: child.props,
      child: null,
      parent: fiber,
      sibling: null,
      dom: null
    }
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevChild.sibling = newFiber;
    }
    prevChild = newFiber;
  })
}

function performWorkOfUnit(fiber) {
  if (!fiber.dom) {
    // 1. 创建 dom
    const dom = (fiber.dom = createDom(fiber.type))
    fiber.parent.dom.append(dom)
    updateProps(dom, fiber.props)
  }
  initChildren(fiber)
  // 4. 返回下一个要执行的任务
  if (fiber.child) {
    return fiber.child
  }
  if (fiber.sibling) {
    return fiber.sibling;
  }
  return fiber.parent?.sibling
}

function workLoop(deadline) {
  let shouldYield = false;
  while (!shouldYield && nextWorkUnit) {
    nextWorkUnit = performWorkOfUnit(nextWorkUnit);
    shouldYield = deadline.timeRemaining() < 1
  }
  if (!nextWorkUnit) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

function commitRoot() {
  commitWork(root.child)
}

function commitWork(fiber) {
  if (!fiber) return;
  commitWork(fiber.child);
  commitWork(fiber.sibling)
}

requestIdleCallback(workLoop);

const React = {
  render,
  createElement,
};
export default React;
