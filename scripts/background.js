const verbs = [];
const errors = [];
const query = [];

const url = "https://leconjugueur.lefigaro.fr/french/verb";

const clearVariables = () => {
  verbs.length = 0;
  errors.length = 0;
};

const getActiveTab = async () => {
  return await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
};

const injectScript = async (tabId) => {
  await chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ["scripts/content-script.js"],
  });
};

chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === "getVerbs") {
    port.onMessage.addListener(async function (msg) {
      debugger;
      clearVariables();
      query.push(...msg.verbs);
      const firstVerb = query.shift();
      const tabCreated = await chrome.tabs.create({
        url: `${url}/${firstVerb}.html`,
      });
      injectScript(tabCreated.id);

      port.postMessage({ content: "Background received" });
    });
  }
  if (port.name === "retrieveVerbs") {
    port.onMessage.addListener(function (msg) {
      port.postMessage({ content: verbs, errors });
    });
  }
});

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  debugger;
  if (request.error) {
    errors.push(request.error);
  } else {
    verbs.push(request);
  }
  // verbs.push(request);

  if (query.length > 0) {
    debugger;
    const nextVerb = query.shift();
    const [activeTab] = await getActiveTab();
    chrome.tabs.remove(activeTab.id);
    const tabCreated = await chrome.tabs.create({
      url: `${url}/${nextVerb}.html`,
    });
    injectScript(tabCreated.id);
  } else {
    const [activeTab] = await getActiveTab();
    chrome.tabs.remove(activeTab.id);
    chrome.tabs.create({ url: "results/results.html" });
  }
  sendResponse({});
});
