
var configData = {
  enableBorder      : false,
  enableGradient    : false,
  toolbarHighlight  : false
}

function checkStoredSettings(item) {
  if (!item.configData) {
    browser.storage.local.set({configData});
  } else {
    configData = item.configData;
  }

  if(configData.enableBorder) {
    document.querySelector('#config_HTML_border').setAttribute('checked',configData.enableBorder);
  } else {
    document.querySelector('#config_HTML_border').removeAttribute('checked');
  }

  if(configData.enableGradient) {
    document.querySelector('#config_HTML_gradient').setAttribute('checked',configData.enableGradient);
  } else {
    document.querySelector('#config_HTML_gradient').removeAttribute('checked');
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

var gettingItem = browser.storage.local.get();
gettingItem.then(checkStoredSettings, onError);

function updateSettings(e) {

  let dom_border_state   = document.getElementById('config_HTML_border').checked;
  let dom_gradient_state = document.getElementById('config_HTML_gradient').checked;
  //console.log(immersionSetting);

  configData.enableBorder   = dom_border_state;
  configData.enableGradient = dom_gradient_state;

  browser.storage.local.set({configData});

  var metaData = {
    kind  : 'refresh'
  }
  browser.runtime.sendMessage(metaData);
}

document.addEventListener('DOMContentLoaded',function() {
  document.querySelector('#config_HTML_border').onchange=updateSettings;
  document.querySelector('#config_HTML_gradient').onchange=updateSettings;
},false);
