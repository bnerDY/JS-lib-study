postPopMsg = function(passed_message) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: passed_message},
            function(response) { 
            	// Ignore any response.
        	}
        );
    });
}