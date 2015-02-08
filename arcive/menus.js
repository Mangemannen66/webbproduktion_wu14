


/**
 * Menu functions
 *
 */


/**
 * Site-wide main menu (lives in .navbar)
 */

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

