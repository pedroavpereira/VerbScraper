const locArray = document.location.href.split("/");
//replace %20 is sometimes required because inputs are normalized on popup.js
const verb = locArray[locArray.length - 1]
  .replace(".html", "")
  .toLowerCase()
  .replace("%20", " ");
const data = { name: verb };

(function () {
  if (!document.querySelector(".verbe")) {
    data.error = verb;
    (async () => {
      const response = await chrome.runtime.sendMessage(data);
      // do something with response here, not outside the function
    })();
    return;
  }

  const main = document.querySelector("main");

  const mainChildNodes = main.childNodes;

  const conjugationObject = (conjugationArr) => {
    const conjugationsObj = {};
    conjugationArr.forEach((el, i) => {
      if (el.startsWith("j'")) {
        conjugationsObj[i + 1] = el.slice(el.indexOf("j'") + 1);
      } else {
        conjugationsObj[i + 1] = el.slice(el.indexOf(" ") + 1);
      }
    });

    return conjugationsObj;
  };

  const getConjugations = (el) => {
    const DOMelement = el.cloneNode(true);
    const title = DOMelement.querySelector(".tempsBloc");
    DOMelement.removeChild(title);
    var htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
    let conjugations = DOMelement.innerHTML.split("<br>").map((el) => {
      const edited = el.replaceAll(htmlRegexG, "");
      return edited;
    });

    if (conjugations.length === 6) {
      conjugations = conjugationObject(conjugations);
    }

    return conjugations;
  };

  let verbMode;
  mainChildNodes.forEach((el) => {
    if (el.nodeName === "H2") {
      verbMode = el.textContent.toLowerCase();
      if (verbMode === "similar verbs") return true;
      data[verbMode] = {};
    }
    if (el.classList.contains("conjugBloc") && el.childElementCount > 0) {
      const name = el.querySelector(".tempsBloc").textContent.toLowerCase();
      data[verbMode][name] = getConjugations(el);
    }
  });

  localStorage.setItem(verb, JSON.stringify(data));

  (async () => {
    const response = await chrome.runtime.sendMessage(data);
    // do something with response here, not outside the function
  })();
})();

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   sendResponse(data);
// });
