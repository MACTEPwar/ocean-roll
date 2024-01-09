$(document).ready(function () {
  refreshCartProducts();
  refreshTotalsPrice();
});

function refreshCartProducts() {
  $("#cart-products").html("");
  // console.log("PRDOCUTS", receiptService.products);
  const products = receiptService.products.map(
    (product) =>
      `<div class="card mb-3 br-15 bsh">
        <div class="card-body">
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
                <div class="my-auto mx-3">${product.amount}</div>
                <div class="btn plus">+</div>
              </div>
            </div>
            <div class="col-md-2 d-flex">
              <span class="my-auto ml-auto">${
                product.amount * product.price
              } руб.</span>
            </div>
          </div>
        </div>
      </div>`
  );
  // console.log("PRDOCUTS2", receiptService.products);
  $("#cart-products").append(products);
}

function refreshTotalsPrice() {
  $("#totalPrice").text(`Итого: ${receiptService.getTotalPrice()} руб`);
}
