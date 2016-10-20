(function() {

	var getAdDiv = function(a) {
		if (!a) {
			return null;
		}
		var parent = a;
		while (parent.parentNode && parent.parentNode.id != 'content_left') {
			parent = parent.parentNode
		}
		return parent;
	};

	var toggleAD = function(show) {
		var display = show ? "block" : "none";
		var rightEC = document.querySelector('#ec_im_container');
		if (rightEC && rightEC.parentNode) {
			rightEC.parentNode.style.display = display;
		}

		var leftContainer = document.querySelector("#content_left");
		var leftECV = leftContainer.querySelectorAll('a.c-icon-v');

		var leftEC = Array.prototype.map.call(leftECV, function(a) {
			return getAdDiv(a);
		});

		leftEC.forEach(function(div) {
			div.style.display = display;
		})
	}

	var timeoutHandler = null;

	var toggleBlocker = function(bBlock) {
		localStorage.bBlock = bBlock;
		clearInterval(timeoutHandler);
		if (bBlock) {
			timeoutHandler = setInterval(toggleAD.bind(null, false), 200);
		} else {
			toggleAD(true);
		}
	};

	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			toggleBlocker(request.message == "on")
		});

	toggleBlocker(localStorage.bBlock === "false" ? false : true);
})()