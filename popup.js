
function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true

    };

    chrome.tabs.query(queryInfo, function(tabs) {
        var tab = tabs[0];

        var url = tab.url;

        console.assert(typeof url == 'string', 'tab.url should be a string');

        callback(url);
    });
}

function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
}

function copyTextToClipboard(text) {
    var copyFrom = document.createElement("textarea");
    copyFrom.textContent = text;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    body.removeChild(copyFrom);
}

document.addEventListener('DOMContentLoaded', function() {
    getCurrentTabUrl(function(url) {
        if ((/banggood.com/i).test(url)) {
            chrome.storage.sync.get('affiliateID', function(items) {
                var affID = items.affiliateID;
                var affUrl;
                if ((/.html\?/).test(url)) {
                    affUrl = url + '&p=' + affID;
                } else {
                    affUrl = url + '?p=' + affID;
                }
                copyTextToClipboard(affUrl);
                var status = 'Saved ' + affUrl + ' to Clipboard (Affiliate ID: ' + affID + ' )';
                renderStatus(status);
            });
        } else {
            renderStatus(url + ' isn\'t a BG site so this tool doesn\'t do anything here.');
        }
    });
});
