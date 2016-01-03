chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");

		if (request.action == "activeTab" ){
			//var res  = prompt("replace " + request.greeting);
			isActiveTab = request.isActiveTab;
			if(isActiveTab){
				//doWalk();
			}
			sendResponse({isActiveTab: "isActiveTab updated"});
		}
		if (request.greeting ){
			var res  = prompt("replace " + request.greeting);
			sendResponse({farewell: res});
		}
});
