"use strict";

const errors = [];
const verbs = [];

const updateInfo = (info) => {
  const element = document.querySelector(".info");
  element.textContent = `${info.length} verbs retrieved successfully`;
};

const updateErrors = (errors) => {
  const element = document.querySelector(".errors");
  if (errors.length > 0) {
    element.classList.remove("hidden");
    element.innerHTML = `Failed to retrieve the verbs : ${errors
      .map((el) => `<b>${el}</b>,`)
      .join(" ")}`;
  }
};

const updateCode = (code) => {
  const element = document.querySelector(".results-code");
  element.textContent = JSON.stringify(code);
  console.log(code);
};

const port = chrome.runtime.connect({ name: "retrieveVerbs" });
port.postMessage({});
port.onMessage.addListener(function (msg) {
  errors.push(...msg.errors);
  verbs.push(...msg.content);
  updateInfo(verbs);
  updateErrors(errors);
  updateCode(verbs);
});

document
  .querySelector(".results-btn--copy")
  .addEventListener("click", function () {
    const content = document.querySelector(".results-code").textContent;
    navigator.clipboard.writeText(content);
  });
