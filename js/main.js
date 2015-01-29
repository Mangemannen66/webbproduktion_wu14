// DOM ready
$(function() {



//function to insert a new page into the DB
function insertNewArticle(adminFormData) {
  $.ajax({
    url: "php/article_save.php",
    type: "post",
    dataType: "json",
    data: {

      "page_data" : adminFormData
    },
    success: function(data) {
   	  console.log("insertNewArticle success: ", data);
    },
    error: function(data) {
      console.log("insertNewArticle error: ", data);
    }
  });
}



  //adminForm form submitHandler
  $("#admin-form form").submit(function() {
    //prepare adminFormData to be sent with AJAX
    var adminFormData = {
      ":title" : $(this).find("#page_title").val(),
      ":content" : $(this).find("#page_content").val()
    };
  

  //send adminFormData with AJAX to DB
 insertNewArticle(adminFormData);
 console.log("adminFormData: ", adminFormData);
  //empty the form once we're done with the information from within it
  this.reset(); 

  //return false to prevent page reload on form submit
  return false;
  });

});


