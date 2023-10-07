const verbs = [];
const query = [];

const url = "https://leconjugueur.lefigaro.fr/french/verb";

chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === "getVerbs") {
    port.onMessage.addListener(function (msg) {
      query.push(...msg.verbs);
      const firstVerb = query.shift();
      chrome.tabs.create({ url: `${url}/${firstVerb}.html` });
      port.postMessage({ content: "Background received" });
    });
  }
  if (port.name === "retrieveVerbs") {
    port.onMessage.addListener(function (msg) {
      const message = verbs.length > 0 ? verbs : null;
      port.postMessage({ content: message });
    });
  }
});

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  console.log(request);
  verbs.push(request);
  if (query.length > 0) {
    const nextVerb = query.shift();
    chrome.tabs.create({ url: `${url}/${nextVerb}.html` });
  }
  sendResponse({});
});
