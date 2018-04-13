function saveOptions(e) {
  browser.storage.local.set({
    tabURL: document.querySelector("#colour").value
  });
  e.preventDefault();
}

function restoreOptions() {

  var storageItem = browser.storage.lo.get('colour');

  storageItem.then((res) => {
    document.querySelector("#managed-colour").innerText = res.colour;
  });

  var gettingItem = browser.storage.sync.get('colour');

  gettingItem.then((res) => {
    document.querySelector("#colour").value = res.colour || 'Firefox red';
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);

document.querySelector("form").addEventListener("submit", saveOptions);
