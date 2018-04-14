let indexedColorMap   = new Array();
let indexedStateMap   = new Array();
let capturingTabColor = null;

function delayedStore() {
  capturingTabColor = null;
}

/* This is more aggressive override..*/

function updateActiveTab_pageloaded(tab) {

  if(tab) {
    var tabURLkey = tab.url;
    if(tabURLkey in indexedStateMap) {
        if(indexedStateMap[tabURLkey] != 3) {
          function updateTab(tabs) {
            if (tabs[0]) {
              var tabURLkey = tabs[0].url;

              capturingTabColor = tabURLkey;
              //setTimeout(delayedStore, 2000);
              var capturing = browser.tabs.captureVisibleTab();
              capturing.then(onCaptured, onError);
            }
          }
          var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
          gettingActiveTab.then(updateTab);
        }
    }
  }

}

function updateActiveTab() {

    function updateTab(tabs) {
        if (tabs[0]) {
          var tabURLkey = tabs[0].url;
          if(tabURLkey in indexedColorMap) {
            console.log('From the cache');
            var colorObject = indexedColorMap[tabURLkey];
            var themeProposal = {
              colors: colorObject
            }
            browser.theme.update(themeProposal);
          } else {
            capturingTabColor = tabURLkey;
            indexedStateMap[tabURLkey] = 0;
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

    var color = {
        r: canvasData[canvasIndex],
        g: canvasData[canvasIndex + 1],
        b: canvasData[canvasIndex + 2],
        alpha: canvasData[canvasIndex + 3]
    };

    //console.log('Color R:' + color.r + ' G:' + color.g + ' B:' + color.b );

    var textC = parseInt((parseInt(255-color.r) + parseInt(255-color.g) + parseInt(255-color.b))/3);

    if(textC>128) {
        textC=255
    } else {
        textC=0;
    }

    var colorObject = {
      accentcolor: 'rgb('+color.r+','+color.g+','+color.b+')',
      textcolor: 'rgb('+textC+','+textC+','+textC+')',
      toolbar_bottom_separator: 'rgb('+color.r+','+color.g+','+color.b+')',
      toolbar : 'rgb('+color.r+','+color.g+','+color.b+')'
    };

    var themeProposal = {
      colors: colorObject
    }

    if(capturingTabColor) {
      console.log('Capturing...')
      indexedColorMap[capturingTabColor] = colorObject;
    }

    browser.theme.update(themeProposal);
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

console.log('Chameleon Dynamic Theme')

/* Receiving message */

function notify(message) {

  //console.log('Notify from page:' + JSON.stringify(message))
  if('kind' in message) {
    if(message.kind=='theme-color') {
        console.log('Loaded from script: ' + message.kind);

        var colorObject = {
          accentcolor: message.value,
          textcolor: 'white',
          toolbar_bottom_separator: message.value,
          toolbar : message.value
        };

        var themeProposal = {
          colors: colorObject
        }

        if(capturingTabColor) {
          console.log('Setting index ' + message.value + ' from page...')
          indexedColorMap[capturingTabColor] = colorObject;
          indexedStateMap[capturingTabColor] = 3;
        }

        browser.theme.update(themeProposal);
    }
  }
}

browser.runtime.onMessage.addListener(notify);
