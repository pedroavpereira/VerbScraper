"use strict";
const getVerbsBtn = document.querySelector(".btn-backbround__get--verbs");
const listParentElement = document.querySelector("ul");
const form = document.querySelector(".form-search");
const clearForm = document.querySelector(".form-clear");

const query = [];

const createListElement = (verb, i) => {
  const markup = `<li class="verb" data-index="${i}">${verb}</li>`;
  listParentElement.insertAdjacentHTML("beforeend", markup);
};

const renderAllList = (arr) => {
  arr.forEach((el, i) => createListElement(el, i));
};

listParentElement.addEventListener("click", function (e) {
  const target = e.target.closest(".verb").dataset.index;

  if (target) {
    query.splice(target, 1);
    this.innerHTML = "";
    renderAllList(query);
  }
});

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
  query.push(...verbArrays);
  renderAllList(query);
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

  renderAllList(query);
})();
