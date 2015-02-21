//*******************PuchPop**************************


function showPage(pageUrl) {
  getMenuLinks("menu-main-menu", createMainMenu);
  //Visa och dölj-alternativ
  if (pageUrl == "home") {
  //  pageUrl = "home";
    $("#admin-form").hide();
    $("#content-list").hide();
    $("#adminMenu").hide();
  }
  //Om pageUrl är "content-list" eller "ingen sida"
  //Visa / dölj detta:
  else if (pageUrl == "content-list" || pageUrl == "") {
   
  //  pageUrl = "content-list";
    $("#admin-form").hide();
    $("#content-list").show();

    $('.content-list-button').click(function(){
    $('#content-list').show();
    $('#admin-form').hide();
    });

    getAllContent();

  }
  //Om pageUrl är "admin-form" 
  //Visa / dölj detta + lägg till klick och submit-hantering
  else if (pageUrl == "admin-form") {
  //  pageUrl = "admin-form";
    $("#admin-form").show();
    $("#admin-form .menuLinkFields").hide();
    $("#content-list").hide();
    getMenuLinks("menu-main-menu", createAdminMenuSelect);

    var updateA = false;

    $("#adminSubmitBtn").hide();
    $("#adminUpdateBtn").show();
    $(" #adminUpdateBtn").click(function(){

    updateA = true;
   
    });
  
    $("#adminSubmitBtn").show();
    $("#adminUpdateBtn").hide();
    $(" #adminSubmitBtn").click(function(){
    updateA = false;

    });
  }

  else {
    //get page by url alias
    
  }
}


function goTo(href) {

  showPage(href);

  history.pushState(null,null,href);
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


  popUpTheDOM();


  function popUpTheDOM(){

    var l = location.href;
    var pageName = l.substring(l.lastIndexOf("/")+1);

    pageName = pageName || false;
    console.log("pageName: ", pageName);
    
    showPage(pageName);
  }
}