function save_options() {
    var affID = document.getElementById('affID').value;
    chrome.storage.sync.set({
        affiliateID: affID
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';

        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        affiliateID: 'EK16148576720201701J'
    }, function(items) {
        document.getElementById('affID').value = items.affiliateID;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
