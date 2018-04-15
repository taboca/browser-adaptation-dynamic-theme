let indexedColorMap   = new Array();
let indexedStateMap   = new Array();
let currentActiveTab  = null;
let pendingApplyColor = null;

/* Config and storage */

var configData = {
  enableBorder      : false,
  toolbarHighlight  : false
}

function checkStoredSettings(item) {
  if (!item.configData) {
    console.log("Config: first time initializing in storage...")
    browser.storage.local.set({configData});
  } else {
    console.log("Config: exists in storage...")
    configData = item.configData;
  }

  console.log("Config settings: " + JSON.stringify(configData));

}

function onError(error) {
  console.log(`Error: ${error}`);
}

var gettingItem = browser.storage.local.get();
gettingItem.then(checkStoredSettings, onError);

/* This is more aggressive override..*/

function updateActiveTab_pageloaded(tabId, changeInfo) {

      console.log(changeInfo.status);

      function updateTab(tabs) {
        if (tabs[0]) {
          var tabURLkey = tabs[0].url;

          if(pendingApplyColor) {
            indexedStateMap[tabURLkey] = 3;
            pendingApplyColor = null;
          }

          if(indexedStateMap[tabURLkey] != 3 && changeInfo.status == 'complete') {
            console.log("Will capture from update = complete: " + indexedStateMap[tabURLkey])
            currentActiveTab = tabURLkey;
            var capturing = browser.tabs.captureVisibleTab();
            capturing.then(onCaptured, onError);
          }

        }
      }
      var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
      gettingActiveTab.then(updateTab);

}

function updateActiveTab(tabId, changeInfo) {

    function updateTab(tabs) {
        if (tabs[0]) {
          var tabURLkey = tabs[0].url;

          if(pendingApplyColor) {
            indexedStateMap[tabURLkey] = 3;
            pendingApplyColor = null;
          }

          if(tabURLkey in indexedColorMap) {
            console.log('From the cache: ' + tabURLkey);
            let colorObject = indexedColorMap[tabURLkey];

            let color = {
                r: 0,
                g: 0,
                b: 0,
                alpha: 0
            };

            let themeProposal = util_themePackage(color);
            themeProposal.colors = colorObject;
            util_custom_update(themeProposal);

          } else {
            currentActiveTab = tabURLkey;
            //setTimeout(delayedStore, 2000);
            var capturing = browser.tabs.captureVisibleTab();
            capturing.then(onCaptured, onError);
          }
        }
    }

    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then(updateTab);
  //getCurrentThemeInfo();
}

browser.tabs.onUpdated.addListener(updateActiveTab_pageloaded);
browser.tabs.onActivated.addListener(updateActiveTab);
browser.windows.onFocusChanged.addListener(updateActiveTab);

updateActiveTab();

// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/captureVisibleTab
function onCaptured(imageUri) {
  //console.log(imageUri);
  //console.log('doc is ' + document);


  canvas = document.createElement('canvas');
  canvas.width  = 100;
  canvas.height = 100;
  canvasContext = canvas.getContext('2d');
  //canvasContext.scale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
  var image = document.createElement('img');

  image.onload = function() {

    //console.log('image loaded')
    canvasContext.drawImage(image, 0,0);
    canvasData = canvasContext.getImageData(0, 0, 100, 10).data;
    canvasIndex = 510*4;

    let color = {
        r: canvasData[canvasIndex],
        g: canvasData[canvasIndex + 1],
        b: canvasData[canvasIndex + 2],
        alpha: canvasData[canvasIndex + 3]
    };

    let themeProposal = util_themePackage(color);

    if(currentActiveTab) {
      console.log('Capturing...')
      indexedColorMap[currentActiveTab] = themeProposal.colors;
    }

    util_custom_update(themeProposal);
  }
  image.src=imageUri;
}

function onError(error) {
  console.log(`Error: ${error}`);
}

/* Them inspection */

function getStyle(themeInfo)
{
  console.log(JSON.stringify(themeInfo));
  if (themeInfo.colors)
  {
    console.log("accent color : " +  themeInfo.colors.accentcolor);
    console.log("toolbar : " + themeInfo.colors.toolbar);
  }
}

async function getCurrentThemeInfo()
{
  var themeInfo = await browser.theme.getCurrent();
  getStyle(themeInfo);
}

/* Receiving message */

function notify(message) {

  //console.log('Notify from page:' + JSON.stringify(message))
  if('kind' in message) {

    if(message.kind=='refresh') {
      console.log('Config:refresh...');

      function refreshAsync(item) {
        console.log("Reloading settings");
        configData = item.configData;
        updateActiveTab();
      }

      var gettingItem = browser.storage.local.get();
      gettingItem.then(refreshAsync, onError);


    }

    if(message.kind=='theme-color') {
        console.log('Loaded from script: ' + message.kind);
        let themeProposal = util_themePackage(util_hexToRgb(message.value));
        console.log('Setting index ' + message.value + ' from next page..');
        pendingApplyColor = themeProposal.colors;

        util_custom_update(themeProposal);
    }
  }
}

browser.runtime.onMessage.addListener(notify);

/*
   Utils
*/

function util_custom_update(themeProposal) {
  let themeProposal_copy = JSON.parse(JSON.stringify(themeProposal));
  if(configData.enableBorder) {
    delete themeProposal_copy.colors.toolbar_bottom_separator;
  }
  browser.theme.update(themeProposal_copy);
}

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function util_hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function util_themePackage(color) {

  let textC = parseInt((parseInt(255-color.r) + parseInt(255-color.g) + parseInt(255-color.b))/3);

  if(textC>128) {
      textC=255
  } else {
      textC=0;
  }

  let colorObject = {
    accentcolor : 'rgb('+color.r+','+color.g+','+color.b+')',
    textcolor   : 'rgb('+textC+','+textC+','+textC+')',
    toolbar     : 'rgb('+color.r+','+color.g+','+color.b+')',
    toolbar_bottom_separator : 'rgb('+color.r+','+color.g+','+color.b+')'
  };

  let themeProposal = {
    colors : colorObject,
    images : {
//      headerURL              : 'background.svg',
      additional_backgrounds : [ "background.svg"]
    },
    properties: {
      additional_backgrounds_alignment : [ "top" ],
      additional_backgrounds_tiling    : [ "repeat"  ]
    }

  }

  return themeProposal;
}
