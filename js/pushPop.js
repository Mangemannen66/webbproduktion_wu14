//*******************PuchPop**************************


function showPage(pageUrl) {

      if (!pageUrl || pageUrl == "home") {
      pageUrl = "start";
      $("#page").show();
    }
  getMenuLinks("menu-main-menu", createMainMenu);
  //Visa och dölj-alternativ
  if (pageUrl == "home") {
    pageUrl = "start";
    $("#admin-form").hide();
    $("#content-list").hide();
    $("#adminMenu").hide();
    $("#adminBanner").hide();
    $("#page").fadeIn(400);
      $("#adminNav").hide();
  $('#adminEdit').click(function() {
    $("#content-list").fadeIn(300);
    $("#adminNav").fadeIn(300);
    $("#page").hide();
    $("#adminBanner").show();
    pageUrl == "content-list";
    getAllContent();
  });
  }
  //Om pageUrl är "content-list"
  //Visa / dölj detta:
  else if (pageUrl == "content-list") {
   
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

     getSingleArticle(pageUrl);


     pageUrl = "page";
     $("#admin-form").hide();
     $("#content-list").hide();
     $("#adminMenu").hide();
     $("#adminBanner").hide();
     $("#adminEdit").show();
     $("#adminNav").hide();
     $('#adminEdit').click(function() {
     $("#content-list").fadeIn(300);
     $("#adminNav").fadeIn(300);
     $("#page").hide();
     $("#adminBanner").show();
     pageUrl == "content-list";
     getAllContent();
  });
     $("#page").fadeIn(300);


  $(".nav li").removeClass("active");

  //then find any links pointing to the pageUrl,
  $("body").find('a[href="'+pageUrl+'"]').each(function() {
    //and add .active to my parent if it is an li tag
    $(this).parent("li").addClass("active");
  });


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
    var pageUrl = l.substring(l.lastIndexOf("/")+1);

    pageUrl = pageUrl || false;
    console.log("pageUrl: ", pageUrl);
    
    showPage(pageUrl);
  }
}