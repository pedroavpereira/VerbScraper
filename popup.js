"use strict";
const requestBtn = document.querySelector(".btn-data");
const copyBtn = document.querySelector(".btn-copy");
let conjugations;

requestBtn.addEventListener("click", async function () {
  const [tab] = await chrome.tabs.query({ active: true });
  const response = await chrome.tabs.sendMessage(tab.id, {});

  conjugations = JSON.stringify(response);

  copyBtn.style = "";
});

copyBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(conjugations);
  this.textContent = "Copied!!";
});
