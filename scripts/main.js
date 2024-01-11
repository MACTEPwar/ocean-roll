import { AppView } from "./app.view.js";

window.app = new AppView();

const receiptService = app.providers.get("receiptService");
const navigateService = app.providers.get("navigateService");

$(document).ready(() => {
  $("nav .navbar-nav .nav-item").on("click", (e) => {
    const page = $(e.currentTarget).attr("id");
    app.providers.get("navigateService").navigateTo(page);
  });

  receiptService.badgeDOM = $("#badge-cart");
  navigateService.loadDefaultPage();
});
