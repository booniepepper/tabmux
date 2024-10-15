const page = {
  addTab: document.querySelector("#add-tab"),
  tabs: document.querySelector("#tabs"),
  live: document.querySelector("#live"),
  shadowRealm: document.querySelector("#shadow-realm"),
};

const banish = (...children) => children.forEach(child => page.shadowRealm.append(child));
const activate = content => {
  if (content.parentElement?.id !== "live") {
    banish(...page.live.children);
    page.live.append(content);
  }
};

const makeTab = () => {
  const content = document.createElement("iframe");
  content.referrerpolicy = "strict-origin";

  const tab = document.createElement("div");
  tab.classList.add("tab");
  tab.onclick = () => activate(content);

  const url = document.createElement("input");
  url.type = "url";
  url.placeholder = "https://so.dang.cool";
  url.addEventListener("keyup", ({ key }) => key === "Enter" && (content.src = url.value) && activate(content));

  const x = document.createElement("button");
  x.innerText = "×";
  x.onclick = () => [tab, content].forEach(elem => elem.remove());
  tab.append(url);
  tab.append(x);

  activate(content);

  return tab;
}

page.addTab.onclick = () => {
  const tab = makeTab();
  page.addTab.before(tab);
};
