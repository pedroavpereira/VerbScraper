"use strict";
const getVerbsBtn = document.querySelector(".btn-backbround__get--verbs");
const listParentElement = document.querySelector("ul");
const form = document.querySelector(".form-search");
const clearForm = document.querySelector(".form-clear");

const query = [];

const createListElement = (verb) => {
  const markup = `<li>${verb}</li>`;
  listParentElement.insertAdjacentHTML("beforeend", markup);
};

getVerbsBtn.addEventListener("click", async function () {
  if (query.length > 0) {
    const port = chrome.runtime.connect({ name: "getVerbs" });
    port.postMessage({ verbs: query });
    port.onMessage.addListener(function (msg) {
      console.log(msg);
    });
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.querySelector(".form-search input");
  const verb = input.value;
  if (!verb) return;
  verb.replaceAll(" ", "");
  const verbArrays = verb.split(",");
  if (verbArrays.length === 1) {
    query.push(verb);
    createListElement(verb);
  } else if (verbArrays.length > 1) {
    query.push(...verbArrays);
    verbArrays.forEach((el) => createListElement(el));
  }

  input.value = "";
  localStorage.setItem("query", JSON.stringify(query));
});

clearForm.addEventListener("click", function () {
  localStorage.clear();
  listParentElement.innerHTML = "";
  query.length = 0;
  console.log(query);
});

(function () {
  if (localStorage.getItem("query")) {
    query.push(...JSON.parse(localStorage.getItem("query")));
  }

  query.forEach((el) => {
    createListElement(el);
  });
})();
