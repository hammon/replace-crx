console.log("hello from replace script !");

var PROCESSED_CLS = "replace-processed";
//var isActiveTab = false;




var dict = {

	"Obama" : "BLACK MASTER",
	"terror" : "ERROR",
       	"smartphone" : "DUMPHONE",
        "Microsoft" : "MICRO$OFT",
         "synergy" : "BULLSHIT",
         "think outside the box" : "MAKE SHIT UP",

         "," : " БОКОМ, ",
         "\\." : " РАКОМ. "
};


chrome.storage.local.get("dict",
												function(items){
													dict = JSON.parse(items.dict);
													console.log("chrome.storage.local.get items: " + JSON.stringify(dict));
													doWalk();
												});
//var isRunning = true;
//walk(document.body);

//isRunning = false;

// setTimeout(function(){
// 	if(!isActiveTab || isRunning ){
// 		return;
// 	}
//
// 	console.log("setInterval");
// 	isRunning = true;
// 	walk(document.body);
// 	isRunning = false;
//
// },3000);

//Ext.Msg.alert('Status', 'Changes saved successfully.');



function doWalk(){
	var walkStart = performance.now();
	walk(document.body);
	var walkEnd = performance.now();
	var walkTotal = walkEnd - walkStart;
	console.log("doWalk time: " + walkTotal);

	// if(!isActiveTab){
	// 	return;
	// }
	// setTimeout(doWalk,3000);
}

function walk(node)
{
        // I stole this function from here:
        // http://is.gd/mwZp7E
        // Which I stole from here:
        // https://github.com/panicsteve/cloud-to-butt/blob/master/Source/content_script.js


	var child, next;
	switch ( node.nodeType ){
	  case 1: // Element
	  case 9: // Document
	  case 11: // Document fragment
	    child = node.firstChild;
	    while ( child ){
	      next = child.nextSibling;
	      walk(child);
	      child = next;
	    }
	    break;
	  case 3: // Text node
		//if(!node.parentElement.classList.contains(PROCESSED_CLS)){
			deBullshit(node);
		//}

    break;
  }

}

function deBullshit(textNode){
	//console.log("deBullshit " + textNode.nodeValue);
        // Hi, I hope you like slow browsing experiences. smartphone

 //       textNode.nodeValue = textNode.nodeValue.replace(/\bobama\b/gi, "BLACK MASTER");

	//var start = performance.now();

  for(var k in dict){
  	//console.log(k + " : " +  dict[k]);
  	textNode.nodeValue = textNode.nodeValue.replace(new RegExp(k,"gi"),dict[k]);
  }

	//textNode.parentElement.classList.add(PROCESSED_CLS);

	// var end = performance.now();
	// var total = end - start;
	// console.log("deBullshit time: " + total);
}
