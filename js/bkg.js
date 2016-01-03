
// "web_accessible_resources": [
// 	"js/replace.js"
// ]




var activetTabId = -1;

chrome.browserAction.onClicked.addListener(function(tab) {

	console.log("Hello from replace");

	chrome.tabs.executeScript({
		file : 'js/replace.js'//,
				//code: "alert('aaaaaaaa');Ext.Msg.alert('Status', 'Changes saved successfully.');"
		//allFrames : true
	});


		//chrome.tabs.create({url:chrome.extension.getURL('main.html')}, function (tab){
					//console.log("chrome.browserAction.onClicked chrome.tabs.create " + tab.id);
					//sessionInfo.keywordsTabId = tab.id;
		//		});
});

chrome.tabs.onActivated.addListener(function (info){
	var prevTabId = activetTabId;
	activetTabId = info.tabId;
	console.log("tabs.onActivated prevTabId: " + prevTabId + " activetTabId: " + activetTabId);

	chrome.tabs.sendMessage(
		prevTabId,
		{"action":"activeTab","isActiveTab": false},
		function(response){
			console.log(JSON.stringify(response));
	});

	chrome.tabs.sendMessage(
		activetTabId,
		{"action":"activeTab","isActiveTab": true},
		function(response){
			console.log(JSON.stringify(response));
	});


});

/*
chrome.webRequest.onCompleted.addListener(
	function(details){
		console.log("onCompleted: " + JSON.stringify(details));
	},
	{urls: ["<all_urls>"]}
);
*/



var conextId = chrome.contextMenus.create(
	{
		"title": "Replace",
		"contexts":["selection"],
    "onclick": function(info, tab){
			console.log(info.selectionText);
			var selectionText = info.selectionText;
			chrome.tabs.query(
				{
					active: true,
					currentWindow: true
				},
				function(tabs) {
					chrome.tabs.sendMessage(
					tabs[0].id, {greeting: info.selectionText}, function(response){
						console.log(JSON.stringify(response));
						var dict = {};
						chrome.storage.local.get("dict",
							function(items){
								dict = JSON.parse(items.dict);
								console.log("chrome.storage.local.get items: " + JSON.stringify(dict));
								dict[selectionText] = response.farewell;
								chrome.storage.local.set(
									{"dict":JSON.stringify(dict)}
								);
						});

					});
				}
			);
			//var res = promt("replace " + info.selectionText);
			//alert(res);


		}
	}
);
