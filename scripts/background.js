const verbs = [];
const errors = [];
const query = [];

const url = "https://leconjugueur.lefigaro.fr/french/verb";

const clearVariables = () => {
  verbs.length = 0;
  errors.length = 0;
};

chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === "getVerbs") {
    port.onMessage.addListener(function (msg) {
      clearVariables();
      query.push(...msg.verbs);
      const firstVerb = query.shift();
      chrome.tabs.create({ url: `${url}/${firstVerb}.html` });
      port.postMessage({ content: "Background received" });
    });
  }
  if (port.name === "retrieveVerbs") {
    port.onMessage.addListener(function (msg) {
      console.log("retrieveVerbs");
      port.postMessage({ content: verbs, errors });
    });
  }
});

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.error) {
    errors.push(request.error);
  } else {
    verbs.push(request);
  }
  // verbs.push(request);

  if (query.length > 0) {
    const nextVerb = query.shift();
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    chrome.tabs.remove(tab.id);
    chrome.tabs.create({ url: `${url}/${nextVerb}.html` });
  } else {
    let [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    chrome.tabs.remove(tab.id);
    chrome.tabs.create({ url: "results/results.html" });
  }
  sendResponse({});
});
