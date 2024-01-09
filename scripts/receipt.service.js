class ReceiptService {
  badgeDOM;

  products = [];

  addProductToReceipt(product) {
    let exProd = this.products.find((f) => f.bar === product.bar);
    if (exProd) {
      exProd.amount += product.amount;
    } else {
      this.products.push(product);
    }
    if (!this.badgeDOM.hasClass("d-flex") && this.products.length > 0) {
      this.badgeDOM.removeClass("d-none");
      this.badgeDOM.addClass("d-flex");
    }
    this.badgeDOM.html(`<span class="m-auto">${this.products.length}</span>`);
  }

  getTotalPrice() {
    return this.products.reduce(
      (acc, curr) => acc + curr.amount * curr.price,
      0
    );
  }

  getProductByBar(bar) {
    return this.products.find((f) => f.bar == bar);
  }

  remove(bar) {
    this.products = this.products.filter((f) => f.bar != bar);
  }
}
