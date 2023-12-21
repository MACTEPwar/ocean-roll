$(document).ready(() => {
    $("nav .navbar-nav .nav-item").on("click", (e) => {
      const page = $(e.target).attr("id");
      loadPage(page);
    });
  
    loadPage("main");
  });
  
  function loadPage(page) {
    $.ajax({
      url: `${page}.html`,
      method: "GET",
      success: (data) => {
        console.log(data);
        $("#content").html(data);
      },
      error: (err) => {
        alert(err);
      },
    });
  }
  