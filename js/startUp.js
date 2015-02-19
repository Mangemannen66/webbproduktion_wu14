
function startUp() {
    //setup history push/pop-state
    pushPopListeners();

//*************submit-handler och AJAX*******************

$("#admin-form form").submit(function() {

  var updateA = $('#adminUpdateBtn:visible').length > 0;
  console.log(updateA);

  if (!updateA) {

    var adminPageData = {}
    adminPageData[":title"] = $("#page_title").val();
    adminPageData[":content"] = $("#page_content").val();
    
    console.log("adminPageData: ", adminPageData);
    saveArticle(adminPageData);
   

  } 
  else {

    var updateData = {};
    updateData[":title"] = $("#page_title").val();
    updateData[":content"] = $("#page_content").val();
    updateData[":pid"] = $("#adminUpdateBtn").data('pid');

    saveEditArticle(updateData);
    console.log("updateData: ", updateData);
    }
    return false;
});

  function getArticle(data) {
    // console.log("getArticle success: ", data);
    
    $("#page_title").val(data[0]["title"]);
    $("#page_content").val(data[0]["content"]);
    $("#updateBtn").prop('value', data[0]["pid"]);
  }



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
    

}


