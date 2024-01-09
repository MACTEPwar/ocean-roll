let pagingService = null;

let currentGroup = "sushi";

let tempPosition = null;

$(document).ready(() => {
  pagingService = new PagingService(loadData);

  // load default category
  $(".menu-categories .category-item.active").removeClass("active");
  $(".menu-categories .category-item[data-category-name=sushi]").addClass(
    "active"
  );
  loadData();

  // event for laod any category
  $(".menu-categories .category-item").on("click", (e) => {
    currentGroup = $(e.currentTarget).data("category-name");
    pagingService.skip = 0;
    $(".menu-categories .category-item.active").removeClass("active");
    $(e.currentTarget).addClass("active");
    loadData();
  });

  // onclick prodcut card
  $("#catalogContent").on("click", ".product-item", (e) => {
    const bar = $(e.currentTarget).data("bar");
    openProduct(bar);
  });

  // onclick back from product card
  $("#product-view").on("click", ".back-btn", () => {
    backBtn();
  });

  $("#product-view").on("click", ".minus", () => {
    if (tempPosition.amount > 0) {
      tempPosition.amount--;
      $("#product-view .ranger .amount").text(tempPosition.amount);
    }
  });

  $("#product-view").on("click", ".plus", () => {
    tempPosition.amount++;
    $("#product-view .ranger .amount").text(tempPosition.amount);
  });

  $("#product-view").on("click", ".to-cart", () => {
    // alert("to-cart");
    receiptService.addProductToReceipt(tempPosition);
    tempPosition = null;
    backBtn();
  });
  $("#product-view").on("click", ".pay-one-click", () => {
    alert("pay-one-click");
  });
});

function backBtn() {
  $("#product-view").addClass("d-none");
}

function loadData() {
  catalogService.getProductsByFilter(
    { skip: pagingService.skip, take: pagingService.take, group: currentGroup },
    (data) => {
      $("#catalogContent").html("");

      const resDOM = data.products
        .map((item) => {
          return `
            <div class="col-3 py-2">
                <div
                class="card br-15 product-item"
                style="box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.25); cursor: pointer"
                data-bar=${item.bar}
                >
                    <div class="card-img-top" style="padding: 5px">
                        <img
                          src="./images/catalog/${item.img}"
                          class="br-15"
                          alt="..."
                          width="100%"
                          height="170px"
                        />
                    </div>
        
                    <div class="card-body p-2">
                        <h5 class="card-title text-center">${item.name}</h5>
                        <h6 class="text-center">${item.price} ₽</h6>
                    </div>
                </div>
            </div>
        `;
        })
        .join("\n");
      const paging = pagingService.getPagingDOM(data.count);

      $("#pagination .pagination").html("");
      $("#pagination .pagination").append(paging);
      $("#catalogContent").append(resDOM);
    }
  );
}

function openProduct(bar) {
  catalogService.getProdcutByBar(bar, (product) => {
    tempPosition = {
      bar: bar,
      price: product.price,
      amount: 1,
    };

    const productDOM = ` 
      <div class="container">
        <div class="back-btn d-flex ml-2">
          <div class="img"><</div>
          <span class="ml-2">Назад</span>
        </div>
        <div class="row product">
          <div class="col-4">
            <img src="./images/catalog/${
              product.img
            }" alt="" width="100%" height="100%" />
          </div>
          <div class="col-8">
            <div class="row title">
              <div class="col-12">
                <span>${product.name}</span>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12">
                <div class="ranger d-flex">
                  <div class="btn minus">-</div>
                  <div class="my-auto mx-3 amount">1</div>
                  <div class="btn plus">+</div>
                </div>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12 d-flex">
                <div class="button to-cart">В корзину</div>
                <div class="button ml-2 pay-one-click">Купить в один клик</div>
              </div>
            </div>
            ${
              product.descr
                ? `<div class="row descr">
                <div class="col-12">
                  <span>` +
                  product.descr +
                  `</span
                  >
                </div>
              </div>`
                : ""
            }
            <div class="row mt-3 title">
              <div class="col-12">
                <span>${product.price} ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    $("#product-view").html("");
    $("#product-view").append(productDOM);
    $("#product-view").removeClass("d-none");
  });
}
