//*******************PuchPop**************************



function showPage(pageUrl) {

  if (pageUrl == "content-list" || pageUrl == "") {
   
    pageUrl = "content-list";
    $("#admin-form").hide();
    $("#content-list").show();

    $('.content-list-button').click(function(){
    $('#content-list').show();
    $('#admin-form').hide();
    });

    getAllContent();

  }

  if (pageUrl == "admin-form") {
    pageUrl = "admin-form";
    $("#admin-form").show();
    $("#content-list").hide();
    getMenuLinks("menu-main-menu", createAdminMenuSelect);

    var updateA = false;

    $("#adminSubmitBtn").hide();
    $(" #adminUpdateBtn").click(function(){

    updateA = true;
    $(" #adminUpdateBtn").submit();

    return false;
    });
  
    
    $("#adminSubmitBtn").show();
    $("#adminUpdateBtn").hide();
    $(" #adminSubmitBtn").click(function(){
    updateA = false;
    $(" #adminSubmitBtn").submit();

    return false;
    });
  }
}

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



function goTo(href) {

  showPage(href);

  history.pushState(null,null,href);
}

  popUpTheDOM();


  function popUpTheDOM(){

    var l = location.href;
    var pageName = l.substring(l.lastIndexOf("/")+1);

    pageName = pageName || false;
    console.log("pageName: ", pageName);
    
    showPage(pageName);
  }
}