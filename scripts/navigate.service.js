import { CartView } from "./cart.view.js";
import { CatalogView } from "./catalog.view.js";
import { CheckoutView } from "./checkout.view.js";
import { MainView } from "./main.view.js";

export class NavigateService {
  defaultPage = "checkout";

  routes = [
    {
      url: "",
      template: CatalogView,
    },
    {
      url: "main",
      template: MainView,
    },
    {
      url: "catalog",
      template: CatalogView,
    },
    {
      url: "cart",
      template: CartView,
    },
    {
      url: "checkout",
      template: CheckoutView,
    },
  ];

  constructor(app, containerOutlet) {
    this.app = app;
    this.containerOutlet = containerOutlet;
  }

  loadDefaultPage() {
    this.navigateTo();
  }

  navigateTo(route) {
    let ref = this.routes.find(
      (f) => f.url === (route ?? this.defaultPage)
    ).template;
    this.app.currentView = new ref(this.app);

    $.ajax({
      url: `${route ?? this.defaultPage}.html`,
      method: "GET",
      success: (data) => {
        this.containerOutlet.html(data);
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
