
var configData = {
  enableBorder      : false,
  enableGradient    : false,
  enableAccent      : true,
  enableTabLine     : true,
  enableToolbarOverride : true
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

  if(configData.enableTabLine) {
    document.querySelector('#config_HTML_tabline').setAttribute('checked',configData.enableTabLine);
  } else {
    document.querySelector('#config_HTML_tabline').removeAttribute('checked');
  }

  if(configData.enableGradient) {
    document.querySelector('#config_HTML_gradient').setAttribute('checked',configData.enableGradient);
  } else {
    document.querySelector('#config_HTML_gradient').removeAttribute('checked');
  }

  if(configData.enableAccent) {
    document.querySelector('#config_HTML_accent').setAttribute('checked',configData.enableAccent);
  } else {
    document.querySelector('#config_HTML_accent').removeAttribute('checked');
  }

  if(configData.enableToolbarOverride) {
    document.querySelector('#config_HTML_toolbar').setAttribute('checked',configData.enableToolbarOverride);
  } else {
    document.querySelector('#config_HTML_toolbar').removeAttribute('checked');
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
  let dom_tabline_state  = document.getElementById('config_HTML_tabline').checked;
  let dom_accent_state   = document.getElementById('config_HTML_accent').checked;
  let dom_toolbar_override_state  = document.getElementById('config_HTML_toolbar').checked;

  configData.enableBorder   = dom_border_state;
  configData.enableGradient = dom_gradient_state;
  configData.enableTabLine  = dom_tabline_state;
  configData.enableAccent   = dom_accent_state;
  configData.enableToolbarOverride  = dom_toolbar_override_state;

  browser.storage.local.set({configData});

  var metaData = {
    kind  : 'refresh'
  }
  browser.runtime.sendMessage(metaData);
}

document.addEventListener('DOMContentLoaded',function() {
  document.querySelector('#config_HTML_border').onchange    = updateSettings;
  document.querySelector('#config_HTML_gradient').onchange  = updateSettings;
  document.querySelector('#config_HTML_tabline').onchange   = updateSettings;
  document.querySelector('#config_HTML_accent').onchange    = updateSettings;
  document.querySelector('#config_HTML_toolbar').onchange   = updateSettings;

},false);
