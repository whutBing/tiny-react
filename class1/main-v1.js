// console.log("=====main-v1.js======", "main");

// 最简单的办法,操作dom写死
const dom = document.createElement("div");
dom.id = "app";
document.querySelector("#root").append(dom);

const textNode = document.createTextNode("");
textNode.nodeValue = "app";
dom.append(textNode);
