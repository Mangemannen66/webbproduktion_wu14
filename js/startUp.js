
function startUp() {
    //setup history push/pop-state
    pushPopListeners();

$("page").hide();
$("admin-form").hide();
$("content-list").hide();
$("adminBanner").hide();


//*************submit-handler och AJAX*******************

$("#admin-form form").submit(function() {

  var updateA = $('#adminUpdateBtn:visible').length > 0;
  console.log(updateA);
  //Vid sparande av ny sida/artikel
  if (!updateA) {

    var adminPageData = {}
    adminPageData[":title"] = $("#page_title").val();
    adminPageData[":content"] = $("#page_content").val();
    
    saveArticle(adminPageData);
    console.log("adminPageData: ", adminPageData);

  } 
  else {
    //Vid uppdatering av befintlig sida
    var updateData = {};
    updateData[":title"] = $("#page_title").val();
    updateData[":content"] = $("#page_content").val();
    updateData[":pid"] = $("#adminUpdateBtn").data('pid');

    saveEditArticle(updateData);
    console.log("updateData: ", updateData);
  }

  return false;
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

  //Initial döljs menyhanteringsfält med "hide"
  $("#admin-form .menuLinkFields").hide();
  //pageUrlGroup klickhanterare
  $('#admin-form .pageUrlGroup input[type=checkbox]').click(function() {
  //checka in eller ut page_url-fältet
  $("#page_url").attr("disabled", !$(this).is(":checked"));

    if (!$(this).is(":checked")) {

      $('#page_url').val(generateServerName($("#page_title").val()));
    }
  });

  //adminForm page_title -> page_url keyUp hanterare
  $("#page_title").keyup(function() {
    //om #adminForm .pageUrlGroup input[type=checkbox] inte är checkad genereras 
    //en alias automatiskt
    if (!$('#admin-form .pageUrlGroup input[type=checkbox]').is(":checked")) {
    
      $('#page_url').val(generateServerName($(this).val()));
    }
  });


  $("#page_url").blur(function() {

  $(this).val(generateServerName($(this).val()));
  });

  //adminForm "add menu" checkbox klickhanterare
  $('.addToMenu input[type="checkbox"]').click(function() {
    if ($(this).is(":checked")) {
      $("#admin-form .menuLinkFields").fadeIn(500);
    } else {
      $("#admin-form .menuLinkFields").fadeOut(500);
    }

    $(".addToMenu #menu_title").attr("required", $(this).is(":checked"));
  });

  
  //adminForm "add image" checkbox klickhanterare
  $('.addImage input[type="checkbox"]').click(function() {
    if ($(this).is(":checked")) {
      $("#admin-form .imageLinkFields").fadeIn(500);
    } else {
      $("#admin-form .imageLinkFields").fadeOut(500);
    }

    $(".addImage #image_title").attr("required", $(this).is(":checked"));
  });    

}


