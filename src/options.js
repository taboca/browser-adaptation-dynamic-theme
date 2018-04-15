
var configData = {
  enableBorder      : false,
  toolbarHighlight  : false
}

function checkStoredSettings(item) {

  console.log("Storage:" + JSON.stringify(item));

  if (!item.configData) {
    console.log("Setting config first time...")
    browser.storage.local.set({configData});
  } else {
    console.log("Config exists in storage...")
    configData = item.configData;
  }

  if(configData.enableBorder) {
    console.log('Trying to mark checked in the DOM ')
    document.querySelector('#config_immersion').setAttribute('checked',configData.enableBorder);
  } else {
    console.log('Trying to uncheck ')
    document.querySelector('#config_immersion').removeAttribute('checked');
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

var gettingItem = browser.storage.local.get();
gettingItem.then(checkStoredSettings, onError);

function updateSettings(e) {
  let immersionSetting = e.target.checked;
  console.log(immersionSetting);
  configData.enableBorder = immersionSetting;
  browser.storage.local.set({configData});

  var metaData = {
    kind  : 'refresh'
  }

  browser.runtime.sendMessage(metaData);

}

document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('#config_immersion').onchange=updateSettings;


},false);
