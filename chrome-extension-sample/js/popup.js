(function () {
	var bBlock = localStorage.bBlock === "false" ? false : true;
	var onBtn = document.getElementById("on");
	var offBtn = document.getElementById("off");
	if (bBlock) {
		onBtn.checked = true;
	} else {
		offBtn.checked = true;
	}

	onBtn.onclick = function () {
		localStorage.bBlock = true;
		var bg = chrome.extension.getBackgroundPage();
		bg.postPopMsg("on");
	};
	offBtn.onclick = function () {
		localStorage.bBlock = false;
		var bg = chrome.extension.getBackgroundPage();
		bg.postPopMsg("off");
	};

	var bg = chrome.extension.getBackgroundPage();
	bg.postPopMsg(bBlock ? "on" : "off");
})();
