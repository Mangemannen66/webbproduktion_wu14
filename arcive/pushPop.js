


/*

//frontpage - function
*/

function showPage(pageUrl) {
  //if no pageUrl was recieved (or home was recieved),
  //show the "front page"
  if (!pageUrl || pageUrl == "home") {
    pageUrl = "content-list";
  }
  //getMenuLinks("menu-main-menu", createMainMenu);

  if (pageUrl == "admin-form") {
   //hide "Add to menu" fields initially
   // $("#admin-form .menuLinkFields").hide();
    getMenuLinks("menu-main-menu", createAdminMenuSelect);
  }
 else {
    //else try to find a page for the url using 
    //getCurrentPage() from ajax.js 
    getCurrentPage(pageUrl);

    //once we have sent our ajax request for page data,
    //change pageUrl to the correct section id so that our
    //section shows
    pageUrl = "page";
  }

  //then find any links in body pointing to the pageUrl,
  $("body").find('a[href="'+pageUrl+'"]').each(function() {
    //and add .active to my parent if it is an li tag
    $(this).parent("li").addClass("active");
  });
}

//setup push/pop-state pushPopListeners for <a> tags
function pushPopListeners() {
  // When we click a link
  $(document).on("click","a",function(event){

    //if the user clicks a real http:// || https:// link,
    if ($(this).attr("href").indexOf("://") >=0) {
      //assume they are leaving the site
      return;
    }

    //prevent "empty" urls from affecting browsing
    if ($(this).attr("href") && $(this).attr("href") !== "#") {
      goTo($(this).attr("href"));
    }

    event.preventDefault();
  });


  addEventListener("popstate",onPopAndStart);

  onPopAndStart();


  function onPopAndStart(){

    var l = location.href;
    //might need to change this
    var pageName = l.substring(l.lastIndexOf("/")+1);

    // if no pageName set pageName to false
    pageName = pageName || false;
    console.log("pageName: ", pageName);
    //and showPage
    showPage(pageName);
  }
}




