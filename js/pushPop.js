//*******************PuchPop**************************

//<a> tags
function pushPopListeners() {
  // When we click a link
  $(document).on("click","a",function(event){

    //if  http:// || https:// link,
    if ($(this).attr("href").indexOf("://") >=0) {

      return;
    }

    //Viktig!
    if ($(this).attr("href") && $(this).attr("href") !== "#") {
      goTo($(this).attr("href"));
    }

    event.preventDefault();
  });


  addEventListener("popstate",popUpTheDOM);

  popUpTheDOM();


  function popUpTheDOM(){

    var l = location.href;
    var pageName = l.substring(l.lastIndexOf("/")+1);

    pageName = pageName || false;
    console.log("pageName: ", pageName);
    
    showPage(pageName);
  }
}