



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

    //console.log("test ");

      //if the user has been asked to add page to menu
    if ($('.addToMenu input[type="checkbox"]').is(":checked")) {
      //get selected menu parent data
      var menuData = {};
      menuData["parent"] = $('.addToMenu select').find(":selected").data("menuItem");
      //get menu link title
      menuData["title"] = $('.addToMenu #menu_title').val();
      //get menu link order
      menuData["weight"] = $('.addToMenu #menu_weight').val();
    };
    console.log("menuData: ", menuData);
  $.ajax ({
      url: "php/article_save.php",
      dataType: "json",
      data: {
          "menuData" : menuData

      },

      success : function(data) {
        console.log("addMenuLink success: ", data);
      },
      errror : function(data) {
        console.log("addMenuLink error: ", data);
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
    //on success, execute listMenuNames() function in helpers.js
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
      //menu_name must be provided
      "menu_name": menu_name
    },
    //on success, execute listAllMenuLinks() function in helpers.js
    success: successFunction,
    error: function(data) {
      console.log("getMenuLinks error: ", data.responseText);
    }
  });
  return false;
}



