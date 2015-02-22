

/**
* Funktioner för att hantera sidor
*
*/

//Funktion för att visa EN sida =)

function showSingleArticle(data) {
	console.log("showSinglepage success: ", data);
	$("#page").html("");
	var pageContent = $('<article class="pageContent"/>');
	pageContent.append("<h2>"+data[0].title+"</h2>");
	pageContent.append("<p>"+data[0].content+"</p>");
	$("#page").html(pageContent);
}
