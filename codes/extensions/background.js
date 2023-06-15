chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    var headers = details.responseHeaders;
    for (var i = 0; i < headers.length; i++) {
      if (headers[i].name.toLowerCase() === 'content-security-policy') {
        headers.splice(i, 1);
        break;
      }
    }
    return {responseHeaders: headers};
  },
  {urls: ["<all_urls>"]},
  ["blocking", "responseHeaders"]
);