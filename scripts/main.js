const commentService = new CommentService();
const catalogService = new CatalogService();

$(document).ready(() => {
  $("nav .navbar-nav .nav-item").on("click", (e) => {
    const page = $(e.target).attr("id");
    loadPage(page);
  });

  loadPage("catalog");
});

function loadPage(page) {
  $.ajax({
    url: `${page}.html`,
    method: "GET",
    success: (data) => {
      $("#content").html(data);
    },
    error: (err) => {
      alert(err);
    },
  });
}
