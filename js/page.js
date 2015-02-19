
function getArticle(data) {
  // console.log("getArticle success: ", data);
  
  $("#page_title").val(data[0]["title"]);
  $("#page_content").val(data[0]["content"]);
  $("#updateBtn").prop('value', data[0]["pid"]);
}
