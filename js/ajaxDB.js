

function saveArticle(adminPageData) {

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
      //$(".form-horizontal .form").trigger("reset");
    },
    error: function(data) {
      console.log("saveArticle error: ", data);
    }
  });
   

}

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
          $("#admin-form form")[0].reset();
          goTo("content-list");
        },
        errror : function(data) {
          console.log("addMenu error: ", data);
        }
    });  
}

/**
 * Menyn
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
 
}

function getSingleArticle(href) {
  $.ajax ({
    url: "php/get_article.php",
    type:"get",
    dataType: "json",
    data: {
      "href": href
      },
      success: showSingleArticle,
      error: function(data) {
      console.log("getSingleArticle error ", data.responseText);
      }
  });
}



//Ta fram all sid-data och visa i admin

function getAllContent() {
  $.ajax ({
    url: "php/get_all_content.php",
    type:"post",
    dataType: "json",
    data: {
        "get_all" : 1
    },

    success : function(data) {
    console.log("get_all" , data);
     
    $("#content-list table tr").not(".pageTableHeads").remove();

      for (var i = 0; i < data.length; i++) {
        var contentRowData = $("<tr/>");
            contentRowData.data("contentData", data[i]);
            contentRowData.append('<td><span class="badge">'+data[i].pid+"</span></td>");
            contentRowData.append('<td><strong>'+data[i].pageTitle+"</strong></td>");
            contentRowData.append('<td>'+data[i].author+"</td>");           
            //contentRowData.append('<td>'+data[i].path+"</td>");
            //contentRowData.append('<td>'+data[i].content+"</td>");

            contentRowData.append('<td>'+data[i].created+"</td>");

            contentRowData.data("page", data[i]);

            var contentRowDataButtons = $('<td/>');
            contentRowDataButtons.append('<div class="btn-group btn-group-xs"/>');
            contentRowDataButtons.find(".btn-group").append('<button type="button" class="editArticle btn btn-default editBtn" title="Editera sidan" value="'+data[i]["pid"]+'"><span class="glyphicon glyphicon-pencil"></span></button>');
            contentRowDataButtons.find(".btn-group").append('<button type="button" class="btn btn-default trashBtn" title="Ta bort"><span class="glyphicon glyphicon-trash"></span></button>');
            contentRowData.append(contentRowDataButtons);
               /*
               contentRowData.append('<td><a pageUrl="#"><span class="badge">Editera</span></a></td>');
               contentRowData.append('<td><a pageUrl="#"><span class="badge">Ta bort</span></a></td>');
        */
          //then append contentRowData to the #content-list table
          $("#content-list table").append(contentRowData);
      }
          //klickhantering och vad som ska visas/döljas när editknapp för specifik sida klickas
          $(".editArticle").click(function() {
          getEditArticle($(this).val());
          $("#admin-form").show();
          $("#content-list").hide();
          $("#adminUpdateBtn").show();
          $("#adminSubmitBtn").hide();
          });
      },
          error: function(data) {
           console.log("get_all error", data.responseText);
          }
    });
    
  }
      
  //*******AJAX-Updatering av artikel*************


  //Hämta specifik sida/artikel för editering från DB
  function getEditArticle(editArticle) {
    $.ajax ({
      url: "php/get_content.php",
      type: "get",
      dataType: "json",
      data: {
        "edit_article": editArticle
      },
      success: getArticle,
      error: function(data) {
        console.log("getEditArticle error: ", data);
      }
    });
  }
  //Spara specifik sida som har blivit editerad till DB
  function saveEditArticle(updateData) {
    console.log("The update data",updateData);
    $.ajax ({
      url: "php/article_update.php",
      type: "post",
      dataType: "json",
      data: {
        "update_data": updateData
      },
      success: function(data) {
        console.log("updateData success: ", data);
         //$("#admin-form")[0].reset();
      },
      error: function(data) {
        console.log("updateData error: ", data);
      }
    });
  }
  //
  function getArticle(data) {
     console.log("getArticle success: ", data);
    
    $("#page_title").val(data[0]["title"]);
    $("#page_content").val(data[0]["content"]);
    $("#adminUpdateBtn").data('pid', data[0]["pid"]);
  }

  //Footerhantering*********************************

  $.ajax ({
    url: "php/get_footer.php",
    type: "get",
    dataType: "json",
    success: function(data){
    $(".footer_info").empty();
    console.log("footer success: ", data);
    $(".footer_info").append("<br><address class='footer_info'><b>" 
    + data[0].name + " </b>&nbsp; "
    + data[0].street + " &nbsp;"
    + data[0].postalcode + " &nbsp;"
    + data[0].city + "&nbsp;&nbsp;<b>Telefon:</b>&nbsp;"
    + data[0].phone + "&nbsp;&nbsp;<b>Email:<a pageUrl='mailto:mumin@barbapappa.klump'></b>&nbsp;"
    + data[0].email + "</a>&nbsp;&nbsp;<em>" + data[0].info + "</em></address> ");
    },
    error: function(data){
    console.log("footer error: ", data.responseText);
    }
  });
 