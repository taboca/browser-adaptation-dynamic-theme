//document.body.style.border = "5px solid red";

//browser.runtime.sendMessage(document.body.backgroundColor);
/*

console.log('From the extension body.js');

function _metaChangedHandler(e) {
  console.log('Meta added');
  document.body.style.border = "5px solid blue";
}

addEventListener('DOMMetaAdded', _metaChangedHandler, true);

console.log('meta:' + document.getElementById('theme-color').getAttribute('content'));

*/


var metaData = {
  kind  : 'theme-color',
  value :  document.querySelector('meta[name=theme-color]').getAttribute('content')
}

browser.runtime.sendMessage(metaData);
