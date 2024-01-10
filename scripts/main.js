import { NavigateService } from "./navigate.service.js";
import { CatalogService } from "./catalog.service.js";
import { CommentService } from "./comment.service.js";
import { ReceiptService } from "./receipt.service.js";
import { CatalogView } from "./catalog.view.js";
import { MainView } from "./main.view.js";

window.commentService = new CommentService();
window.catalogService = new CatalogService();
window.receiptService = new ReceiptService();

window.catalogView = new CatalogView();
window.mainView = new MainView();

$(document).ready(() => {
  // console.log('window.catalogService L',window.catalogService)
  $("nav .navbar-nav .nav-item").on("click", (e) => {
    const page = $(e.currentTarget).attr("id");
    loadPage(page);
  });

  // loadPage("catalog");
  loadPage("main");

  window.receiptService.badgeDOM = $("#badge-cart");
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
