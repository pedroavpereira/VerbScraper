"use strict";
const requestBtn = document.querySelector(".btn-data");
const getVerbsBtn = document.querySelector(".btn-backbround__get--verbs");
const copyBtn = document.querySelector(".btn-copy");

let conjugations;
const query = ["aller", "devoir"];
const verbs = [];

requestBtn.addEventListener("click", async function () {
  const [tab] = await chrome.tabs.query({ active: true });
  const response = await chrome.tabs.sendMessage(tab.id, {});

  conjugations = JSON.stringify(response);

  copyBtn.style = "";
});

getVerbsBtn.addEventListener("click", async function () {
  const port = chrome.runtime.connect({ name: "getVerbs" });
  port.postMessage({ verbs: query });
  port.onMessage.addListener(function (msg) {
    console.log(msg);
  });
});

copyBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(conjugations);
  this.textContent = "Copied!!";
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  document.querySelector(".temp-paragraph").textContent =
    JSON.stringify(request);
  sendResponse({});
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("Opened");
  const port = chrome.runtime.connect({ name: "retrieveVerbs" });
  port.postMessage({});
  port.onMessage.addListener(function (msg) {
    console.log(msg);
    if (msg.content != null) {
      verbs.push(...msg.content);
    } else {
      console.log("no verbs");
    }
  });
});
