
function startUp() {


//setup history push/pop-state
  pushPopListeners();

//Initial döljs menyhanteringsfält
  $("#admin-form .menuLinkFields").hide();
  //pageUrlGroup clickHandler
  $('#admin-form .pageUrlGroup input[type=checkbox]').click(function() {
    //enable/disable the page_url input field
    $("#page_url").attr("disabled", !$(this).is(":checked"));

    if (!$(this).is(":checked")) {

      $('#page_url').val(generateServerName($("#page_title").val()));
    }
  });

  //adminForm page_title -> page_url keyUp handler
  $("#page_title").keyup(function() {
    //if #adminForm .pageUrlGroup input[type=checkbox] is !:checked
    if (!$('#admin-form .pageUrlGroup input[type=checkbox]').is(":checked")) {
      //generage machine name on keyup using generateMachineName() 
      //function from helper.js
      $('#page_url').val(generateServerName($(this).val()));
    }
  });



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


  //adminForm page_url blur handler

  $("#page_url").blur(function() {

    $(this).val(generateServerName($(this).val()));
  });


//function to generate a url alias from "normal" string
function generateServerName(urlText) {

  //remove any empy spaces at beginning and/or end of string
  urlText = urlText.trim();

  //replace all spaces with -
  while (urlText.indexOf(' ') >= 0) {
    urlText = urlText.replace(" ", "-");
  }
  //replace all -- with -
  while (urlText.indexOf('--') >= 0) {
    urlText = urlText.replace("--", "-");
  }

    //replace all å with a
  while (urlText.indexOf('å') >= 0) {
    urlText = urlText.replace("å", "a");
  }
   //replace all ä with a
  while (urlText.indexOf('ä') >= 0) {
    urlText = urlText.replace("ä", "a");
  }
   //replace all ö with o
  while (urlText.indexOf('ö') >= 0) {
    urlText = urlText.replace("ö", "o");
  }

  return urlText.toLowerCase();
}






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
  //createMenuTree() has been moved to helpers.js
  var menuTree = createMenuTree(menuData);

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




  return false;
}