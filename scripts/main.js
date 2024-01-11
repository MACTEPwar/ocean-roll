import { NavigateService } from "./navigate.service.js";
import { CatalogService } from "./catalog.service.js";
import { CommentService } from "./comment.service.js";
import { ReceiptService } from "./receipt.service.js";

export class AppView {
  providers = new Map([
    ["receiptService", new ReceiptService()],
    ["navigateService", new NavigateService(this, $("#content"))],
    ["commentService", new CommentService()],
    ["catalogService", new CatalogService()],
    ["commentService", new CommentService()],
  ]);

  currentView;
}

// window.commentService = new CommentService();
// window.catalogService = new CatalogService();
// window.receiptService = new ReceiptService();
// window.navigateService = new NavigateService($("#content"));

// export const catalogView = new CatalogView();

// window.catalogView = new CatalogView();
// window.mainView = new MainView();
// window.cartView = new CartView();
// window.checkoutView = new CheckoutView();

window.app = new AppView();
const receiptService = app.providers.get("receiptService");
const navigateService = app.providers.get("navigateService");

$(document).ready(() => {
  $("nav .navbar-nav .nav-item").on("click", (e) => {
    const page = $(e.currentTarget).attr("id");
    app.providers.get("navigateService").navigateTo(page);
  });

  // loadPage("catalog");

  receiptService.badgeDOM = $("#badge-cart");
  navigateService.loadDefaultPage();
});
