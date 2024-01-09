$(document).ready(function () {
  refreshCartProducts();
});

function refreshCartProducts() {
  $("#cart-products").html("");
  console.log("PRDOCUTS", receiptService.products);
  const products = receiptService.products.map((product) => 
    `<div class="card mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <img src="./images/catalog/${
                product.img
              }" class="img-fluid" alt="Суши" />
            </div>
            <div class="col-md-5">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.price} руб</p>
            </div>
            <div class="col-md-4">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary" type="button">
                    -
                  </button>
                </div>
                <input type="text" class="form-control text-center" value="${
                  product.amount
                }" />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button">
                    +
                  </button>
                </div>
              </div>
              <p class="text-right mt-2">${
                product.amount * product.price
              } руб.</p>
            </div>
          </div>
        </div>
      </div>`
  );
  console.log("PRDOCUTS2", receiptService.products);
  $("#cart-products").append(products);
}
