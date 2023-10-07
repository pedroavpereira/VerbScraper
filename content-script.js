const main = document.querySelector("main").childNodes;

const getConjugations = (el) => {
  const DOMelement = el.cloneNode(true);
  const title = DOMelement.querySelector(".tempsBloc");
  DOMelement.removeChild(title);
  var htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
  const conjugations = DOMelement.innerHTML.split("<br>").map((el) => {
    const edited = el.replaceAll(htmlRegexG, "");
    return edited;
  });

  return conjugations;
};

const data = {};
let verbMode;
main.forEach((el) => {
  if (el.nodeName === "H2") {
    data[el.textContent] = [];
    verbMode = el.textContent;
  }
  if (el.classList.contains("conjugBloc") && el.childElementCount > 0) {
    const name = `${el.querySelector(".tempsBloc").textContent}`;
    const temp = {};
    temp[name] = getConjugations(el);
    data[verbMode].push(temp);
  }
});

const locArray = document.location.href.split("/");
const verb = locArray[locArray.length - 1].replace(".html", "");

localStorage.setItem(verb, JSON.stringify(data));

(async () => {
  const response = await chrome.runtime.sendMessage(data);
  // do something with response here, not outside the function
  console.log(response);
})();

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   sendResponse(data);
// });
