export class CartView {

  constructor(app){
    this.receiptService = app.providers.get("receiptService");
    this.navigateService = app.providers.get("navigateService");
  }
  onInit() {
    this.refreshCartProducts();
    this.refreshTotalsPrice();

    $("#cart-products").on("click", ".minus", (e) => {
      const productCard = $(e.currentTarget).closest(".product-item");
      const bar = productCard.data("bar");
      const product = this.receiptService.getProductByBar(bar);
      product.amount--;
      this.refreshCartProducts();
      this.refreshTotalsPrice();
    });

    $("#cart-products").on("click", ".plus", (e) => {
      const productCard = $(e.currentTarget).closest(".product-item");
      const bar = productCard.data("bar");
      const product = this.receiptService.getProductByBar(bar);
      product.amount++;
      this.refreshCartProducts();
      this.refreshTotalsPrice();
    });

    $("#cart-products").on("click", ".delete", (e) => {
      const productCard = $(e.currentTarget).closest(".product-item");
      const bar = productCard.data("bar");
      this.receiptService.remove(bar);
      this.refreshCartProducts();
      this.refreshTotalsPrice();
    });

    $("button.checkout").on("click", () => {
      this.navigateService.navigateTo("checkout");
    });
  }

  refreshCartProducts() {
    $("#cart-products").html("");
    const products = this.receiptService.products.map(
      (product) =>
        `<div class="card mb-3 br-15 bsh product-item" data-bar="${
          product.bar
        }">
          <div class="card-body">
            <div class="ic position-absolute delete" style="top: 1rem; right: 1rem; cursor: pointer;z-index: 1">
              <img src="./images/trash.svg" width="21px" />
            </div>
            <div class="row">
              <div class="col-md-2">
                <img src="./images/catalog/${
                  product.img
                }" class="img-fluid br-15" alt="Суши" />
              </div>
              <div class="col-md-6">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.price} руб</p>
              </div>
              <div class="col-md-2 d-flex">
                <div class="ranger d-flex my-auto">
                  <div class="btn minus">-</div>
                  <div class="my-auto mx-3 amount">${product.amount}</div>
                  <div class="btn plus">+</div>
                </div>
              </div>
              <div class="col-md-2 d-flex">
                <span class="my-auto ml-auto price">${
                  product.amount * product.price
                } руб.</span>
              </div>
            </div>
          </div>
        </div>`
    );

    $("#cart-products").append(products);
  }

  refreshTotalsPrice() {
    $("#totalPrice").text(`Итого: ${this.receiptService.getTotalPrice()} руб`);
  }
}
