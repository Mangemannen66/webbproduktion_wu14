  //then find any links in body pointing to the pageUrl,
  $("body").find('a[href="'+pageUrl+'"]').each(function() {
    //and add .active to my parent if it is an li tag
    $(this).parent("li").addClass("active");
  });


//function to build main menu and append to .navbar
function createMainMenu(data) {
  //createMenuTree() has been moved to helpers.js
  var menuTree = createMenuTree(data);

  //create mainMenuHtml
  var mainMenuHtml = $('<ul class="nav navbar-nav"/>');
  //and append all menuLinks (and their submenus) 
  //recursively as <li> tags
  mainMenuHtml = buildMainMenu(mainMenuHtml, menuTree);

  //and finally replace .navbar menu with new html
  $("header .navbar-collapse").find(".navbar-nav").remove();
  $("header .navbar-collapse").prepend(mainMenuHtml);
}


//recursive function to build all submenus for a menuItem
function buildMainMenu(menuHtml, menuItems) {
  //for each menu item on this menu level
  for (var j = 0; j < menuItems.length; j++) {
    //create a new <li> tag
    var menuLink;
    if (menuItems[j].children.length < 1) {
      //if this item has no children, only a make menuLink 
      //("<li><a></a></li>")
      menuLink = $('<li><a href="'+menuItems[j].path+'">'+menuItems[j].title+'</a></li>');
    } else {
      //if this item has children, make a menuLink and a submenu 
      //("<li><a></a><ul></ul></li>")

      //first add <li><a></a></li>
      menuLink = $('<li class="dropdown"><a href="'+menuItems[j].path+'">'+menuItems[j].title+'</a></li>');
      
      //then create submenu <ul></ul>
      var newDropDown = $('<ul class="dropdown-menu"/>');

      //start this function all over again to append submenu 
      //menuLinks to the newDropDown
      newDropDown = buildMainMenu(newDropDown, menuItems[j].children);

      //append finished dropdown to menuLink
      menuLink.prepend(newDropDown);
    }

    //and finally append new menuLink to menuHtml
    menuHtml.append(menuLink);
  }

  return menuHtml;
}



//function to getPages.
function getPages(search_param) {
  $.ajax({
    url: "php/get_content.php",
    type: "get",
    dataType: "json",
    data: {
      //if search_param is NULL (undefined), the if-statement 
      //in get_content.php will be false
      "search_param": search_param
    },
    //on success, execute listAllPages function
    //listAllPages has been moved to helpers.js
    success: listAllPages,
    error: function(data) {
      console.log("getPages error: ", data.responseText);
    }
  });
}


//function to list the content of a single non-admin page
//using the href (url_alias) as a unique identifier
function getCurrentPage(href) {
  $.ajax({
    url: "php/get_content.php",
    dataType: "json",
    data: {
      url_alias: href
    },
    //showPageContent() resides in pages.js
    success: showPageContent,
    error: function(data) {
      console.log("getCurrentPage error: ", data.responseText);
    }
  });
}


  //adminForm page_url blur handler
  //from jQuery documentation: "The blur event is sent to an element when it loses focus"
  $("#page_url").blur(function() {
    //whenever a user "is done" with the page_url input field
    $(this).val(generateServerName($(this).val()));
  });

  //adminForm add menu checkbox clickhandler to show/hide add menu fields
  $('.addToMenu input[type="checkbox"]').click(function() {
    if ($(this).is(":checked")) {
      $("#admin-form .menuLinkFields").fadeIn(500);
    } else {
      $("#admin-form .menuLinkFields").fadeOut(500);
    }

    $(".addToMenu #menu_title").attr("required", $(this).is(":checked"));
  });


  //adminForm page_title -> page_url keyUp handler
  $("#page_title").keyup(function() {
    //if #adminForm .pageUrlGroup input[type=checkbox] isnt checked.
    if (!$('#admin-form .pageUrlGroup input[type=checkbox]').is(":checked")) {
      //generate server name on keyup using generateServerName() 
      $('#page_url').val(generateServerName($(this).val()));
    }
  });