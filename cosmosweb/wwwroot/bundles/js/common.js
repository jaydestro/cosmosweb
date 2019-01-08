$(function () { 

    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });

    // Some tasks can only happen when we have consent to drop non-essential cookies
    if (typeof mscc !== "undefined" && !mscc.hasConsent()) {
        mscc.on('consent', onCookieConsentTasks);

        $(document).click(function (e) {
            mscc.setConsent();
        });
    }
});

function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

/* We don't just add these tasks to the consent event of mscc because many of them require
  ga to be loaded, which also happens on consent, so we need to control the order. */
var postCookieConsentTasks = [];

function recordArchitectureGuidanceViewed(name) {
     /* The logic in google-analytics-external.js ensures the event queue is empty before
       navigating to an external URL, so we don't have to worry about that here */
    var action = function () {
        ga("send", "event", "Architecture Guidance", 'Download/View', name);
    };

    if (typeof mscc === "undefined" || mscc.hasConsent()) {
        action();
    } else {
        postCookieConsentTasks.push(action)
    }
}

function recordDownload(product, version) {
    /* The logic in google-analytics-external.js ensures the event queue is empty before
       navigating to an external URL, so we don't have to worry about that here */
    var action = function () {
        ga("send", "event", "Download", product, version);
    };

    if (typeof mscc === "undefined" || mscc.hasConsent()) {
        action();
    } else {
        postCookieConsentTasks.push(action)
    }
}

function onCookieConsentTasks() {
    LoadAnalytics(false);

    for (i = 0; i < postCookieConsentTasks.length; i++) {
        postCookieConsentTasks[i]();
    }
}