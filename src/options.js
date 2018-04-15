
var configData = {
  enableBorder      : false,
  enableGradient    : false,
  toolbarHighlight  : false
}

function checkStoredSettings(item) {

  //console.log("Storage:" + JSON.stringify(item));
  if (!item.configData) {
    //console.log("Setting config first time...")
    browser.storage.local.set({configData});
  } else {
    //console.log("Config exists in storage...")
    configData = item.configData;
  }

  if(configData.enableBorder) {
    //console.log('Trying to mark checked in the DOM ')
    document.querySelector('#config_HTML_border').setAttribute('checked',configData.enableBorder);
  } else {
    //console.log('Trying to uncheck ')
    document.querySelector('#config_HTML_border').removeAttribute('checked');
  }

  if(configData.enableGradient) {
    //console.log('Trying to mark checked in the DOM ')
    document.querySelector('#config_HTML_gradient').setAttribute('checked',configData.enableGradient);
  } else {
    //console.log('Trying to uncheck ')
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
