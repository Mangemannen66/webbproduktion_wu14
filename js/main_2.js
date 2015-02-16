  // DOM ready
$(function() {


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



//funktion för att generera alias från "normal"-sträng
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



//********************frontpage(show and hide)*************


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

  else if (pageUrl == "admin-form") {

    $("#admin-form").show();
    $("#content-list").hide();
    getMenuLinks("menu-main-menu", createAdminMenuSelect);
    $('.admin-form-button').click(function(){
    $('#admin-form').show();
    $('#content-list').hide();

  });

  }
}

function goTo(href) {

  showPage(href);

  history.pushState(null,null,href);
}







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

//*************submit-handler och AJAX*******************

$("#admin-form form").submit(function() {
 

    var adminPageData = {
      ":title" : $(this).find("#page_title").val(),
      ":content" : $(this).find("#page_content").val(),
    };
    console.log("adminPageData: ", adminPageData);
  $.ajax({
    url: "php/article_save.php",
    type: "post",
    dataType: "json",
    data: {

      "page_data" : adminPageData
    },
    success: function(data) {
      saveUrl();
      console.log("saveArticle success: ", data);
    },
    error: function(data) {
      console.log("saveArticle error: ", data);
    }
  });
  return false;
});

function saveUrl() {

  var adminUrlData = {

    ":path" : $("#page_url").val()
  };
 console.log("adminUrlData: ", adminUrlData);
  $.ajax ({
    url: "php/article_save.php",
    dataType: "json",
    data: {
        "page_url" : adminUrlData
    },

    success : function(data) {
      addMenuLink();
      console.log("saveUrl success: ", data);
    },
    error: function(data) {
      console.log("saveUrl error: ", data);
    }
  });
  return false;
}

function addMenuLink() {

      //Om "Lägg till i menyn" är checkad
    if ($('.addToMenu input[type="checkbox"]').is(":checked")) {
      //Plocka Parent-Data
      var menuData = {
      "parent": $('.addToMenu select').find(":selected").data("menuItem"),
      //Plocka titel
      "title": $(".addToMenu #menu_title").val(),
      "path": $("#page_url").val(),
      //Plocka sortering
      "weight": $(".addToMenu #menu_weight").val(),
      };
    };


    console.log("menuData: ", menuData); //Loggar menuData
    $.ajax ({
        url: "php/article_save.php",
        dataType: "json",
        data: {
            "menu_data" : menuData

        },
        success : function(data) {
          console.log("addMenu success: ", data); //Loggar om menuData sparas
        },
        errror : function(data) {
          console.log("addMenu error: ", data);
        }
    });
    return false;
   
}

/**
 * Menus
 */

//function to getMenuLinks. 
function getMenuNames() {
  $.ajax({
    url: "php/get_menu_content.php",
    type: "get",
    dataType: "json",
 
    success: listMenuNames,
    error: function(data) {
      console.log("getMenuLinks error: ", data.responseText);
    }
  });
  return false;
}


//function to getMenuLinks.
function getMenuLinks(menu_name, successFunction) {
  $.ajax({
    url: "php/get_menu_content.php",
    type: "get",
    dataType: "json",
    data: {
      //menu_name måste vara med
      "menu_name": menu_name
    },

    success: successFunction,
    error: function(data) {
      console.log("getMenuLinks error: ", data.responseText);
    }
  });
  return false;
  }


//Ta fram sid-data och visa i admin

function getAllContent() {
  $.ajax ({
    url: "php/get_all_content.php",
    dataType: "json",
    data: {
        "get_all" : 1
    },

    success : function(data) {
    console.log("get_all" , data);
    $("#content-list table tr").not(".pageTableHeads").remove();

      for (i = 0; i < data.length; i++) {
        var contentRowData = $("<tr/>");
            contentRowData.data("contentData", data[i]);
            contentRowData.append('<td><span class="badge">'+data[i].pid+"</span></td>");
            contentRowData.append('<td><strong>'+data[i].pageTitle+"</strong></td>");
            contentRowData.append('<td>'+data[i].author+"</td>");           
            contentRowData.append('<td>'+data[i].path+"</td>");
            contentRowData.append('<td>'+data[i].created+"</td>");

            contentRowData.data("page", data[i]);

            var contentRowDataButtons = $('<td/>');
            contentRowDataButtons.append('<div class="btn-group btn-group-xs"/>');
            contentRowDataButtons.find(".btn-group").append('<button type="button" class="btn btn-default editBtn" title="Editera sidan"><span class="glyphicon glyphicon-pencil"></span></button>');
            contentRowDataButtons.find(".btn-group").append('<button type="button" class="btn btn-default trashBtn" title="Ta bort"><span class="glyphicon glyphicon-trash"></span></button>');
            contentRowData.append(contentRowDataButtons);
               /*
               contentRowData.append('<td><a href="#"><span class="badge">Editera</span></a></td>');
               contentRowData.append('<td><a href="#"><span class="badge">Ta bort</span></a></td>');
        */
          //then append contentRowData to the #content-list table
          $("#content-list table").append(contentRowData);
          }

        },
          error : function(data) {
           console.log("get_all error", data.responseText);
          }
        });
        return false;
        }

        //Footerhantering

        $.ajax ({
         url: "php/get_footer.php",
        type: "post",
        dataType: "json",
        success: function(data){
        $(".footer_info").empty();
         console.log("footer success: ", data);
        $(".footer_info").append("<br><address class='footer_info'><b>" 
         + data[0].name + " </b>&nbsp; "
         + data[0].street + " &nbsp;"
         + data[0].postalcode + " &nbsp;"
         + data[0].city + "&nbsp;&nbsp;<b>Telefon:</b>&nbsp;"
         + data[0].phone + "&nbsp;&nbsp;<b>Email:<a href='mailto:mumin@barbapappa.klump'></b>&nbsp;"
         + data[0].email + "</a>&nbsp;&nbsp;<i>" + data[0].info + "</i></address> ");
         },
         error: function(data){
          console.log("footer error: ", data);
          }
        });
        return false;
   

});


