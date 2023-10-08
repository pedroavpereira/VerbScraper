"use strict";
const getVerbsBtn = document.querySelector(".btn-backbround__get--verbs");
const form = document.querySelector(".form-search");
console.log(form);

const query = [];

const createListElement = (verb) => {
  const parentElement = document.querySelector("ul");
  const markup = `<li>${verb}</li>`;
  parentElement.insertAdjacentHTML("afterbegin", markup);
};

getVerbsBtn.addEventListener("click", async function () {
  const port = chrome.runtime.connect({ name: "getVerbs" });
  port.postMessage({ verbs: query });
  port.onMessage.addListener(function (msg) {
    console.log(msg);
  });
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const verb = document.querySelector(".form-search input");
  query.push(verb.value);
  createListElement(verb.value);
  verb.value = "";
});
// document.addEventListener("DOMContentLoaded", function () {
//   const port = chrome.runtime.connect({ name: "retrieveVerbs" });
//   port.postMessage({});
//   port.onMessage.addListener(function (msg) {
//     if (msg.content != null) {
//       verbs.push(...msg.content);
//     } else {
//       console.log("no verbs");
//     }
//     console.log(verbs);
//   });
// });
