"use strict";
const getVerbsBtn = document.querySelector(".btn-backbround__get--verbs");
const listParentElement = document.querySelector("ul");
const form = document.querySelector(".form-search");
const clearForm = document.querySelector(".form-clear");

const query = [];

const saveLocalStorage = () => {
  localStorage.setItem("query", JSON.stringify(query));
};

const createListElement = (verb, i) => {
  const markup = `<li class="verb" data-index="${i}">${verb}</li>`;
  listParentElement.insertAdjacentHTML("beforeend", markup);
};

const renderAllList = (arr) => {
  listParentElement.innerHTML = "";
  arr.forEach((el, i) => createListElement(el, i));
};

listParentElement.addEventListener("click", function (e) {
  const target = e.target.closest(".verb").dataset.index;

  if (target) {
    query.splice(target, 1);
    this.innerHTML = "";
    renderAllList(query);
    saveLocalStorage();
  }
});

getVerbsBtn.addEventListener("click", async function () {
  if (query.length > 0) {
    const port = chrome.runtime.connect({ name: "getVerbs" });
    port.postMessage({ verbs: query });
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.querySelector(".form-search input");
  let verb = input.value;
  if (!verb) return;
  const verbs = verb.split(",");
  const normalizedVerbs = verbs.map((el) => {
    const trim = el.trim();
    return trim.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  });
  query.push(...normalizedVerbs);
  renderAllList(query);
  input.value = "";
  saveLocalStorage();
});

clearForm.addEventListener("click", function () {
  localStorage.clear();
  listParentElement.innerHTML = "";
  query.length = 0;
});

(function () {
  if (localStorage.getItem("query")) {
    query.push(...JSON.parse(localStorage.getItem("query")));
  }

  renderAllList(query);
})();
