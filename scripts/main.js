const commentService = new CommentService();
const catalogService = new CatalogService();
const receiptService = new ReceiptService();

$(document).ready(() => {
  $("nav .navbar-nav .nav-item").on("click", (e) => {
    const page = $(e.currentTarget).attr("id");
    loadPage(page);
  });

  loadPage("catalog");

  receiptService.badgeDOM = $("#badge-cart");
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
