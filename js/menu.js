//********************menyfunktioner*********************

//function to create menu tree structure
function createMenuTree(menuData) {
  // The menu tree (our new deep structure)
  var menuTree = [];

  // sort by weight
  menuData.sort(function(x,y){
    return x.weight > y.weight;
  });

  //since JS always assigns properties by reference
  //we can use separate variables to track objects in menuData 
  var hash = {};

  // Loop through original data and add to hash
  menuData.forEach(function(item) {
    //give each menu item a new property called children
    item.children = [];

    //track each item in our hashes (reference to orig obj)
    hash["_"+item.mlid] = item;

    // if i am top level, add to tree right away
    if(item.plid === null){
      menuTree.push(item);
      return;
    }
  });

  //add children to all menu_items using the hash reference
  for(var i in hash){
    item = hash[i];
    //if no plid, skip this iteration of the loop
    if(!item.plid){continue;}

    // add me to menuTree using the hash reference
    hash["_"+item.plid].children.push(item);
  }

  return menuTree;
}

/**
 * "Add to menu" select dropdown (lives in #admin-form .menuLinkFields) 
 */

//function to createHtmlMenu
function createAdminMenuSelect(data) {

  var menuTree = createMenuTree(data);

  //our #admin-form select element
  var select_html = $('<select class="form-control"/>');

  //add a top option with mlid null to our select right away
  var topOption = $('<option value="">Top</option>');

  //assume all links belong to the same menu ("menu-main-menu")
  topOption.data("menuItem", {mlid: null, menu: "menu-main-menu"});
  select_html.append(topOption);

  //then recurse through the menuTree and add all menu links to select
  select_html = buildSelectOptions(select_html, menuTree, 0);

  //finally, append the select to the admin-form
  $("#admin-form .menuSelect").html(select_html);
}

//recursive function to build all select options for a menu
function buildSelectOptions(select_html, menuItems, level) {
  for (var j = 0; j < menuItems.length; j++) {
    //use - as depth indicator
    var depthIndicator = "-";
    for (var i = 0; i < level; i++) {
      //add more depth for each level
      depthIndicator += "-";
    }

    //create a new select dropdown option
    var option = $('<option value="'+menuItems[j].mlid+'">'+depthIndicator+" "+menuItems[j].title+'</option>');

    //add menu item data to each select option
    option.data("menuItem", menuItems[j]);

    //and append the option
    select_html.append(option);

    //if this menu item has children, start this function all over again
    if (menuItems[j].children.length > 0) {
      select_html.append(buildSelectOptions(select_html, menuItems[j].children, level+1));
    }
  }
  return select_html;
}


function createMainMenu(data) {
  var menuTree = createMenuTree(data);

  var mainMenuHtml = $('<ul class="nav navbar-nav mainMenu"/>');

  buildMainMenu(mainMenuHtml, menuTree);

  $("header nav .navbar-collapse .navbar-nav").not(".navbar-right").remove();
  $("header nav .navbar-collapse").prepend(mainMenuHtml);

}

function buildMainMenu(menuUlHtml, menuItems) {
  menuItems.forEach(function(item){
    var menuLink = $("<li><a href = '"+item.path+"'>"+item.title+"</a></li>");

    if (item.children.length > 0) {
      menuLink.addClass("dropdown");
      var dropdown = $('<ul class="dropdown-menu"/>');

      buildMainMenu(dropdown, item.children);

      menuLink.append(dropdown);
    }

    menuUlHtml.append(menuLink);

  });
 
}