let pagingService = null;

let currentGroup = "sushi";

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

  $("#catalogContent").on("click", ".product-item", (e) => {
    // alert($(e.currentTarget).data("bar"));
    const bar = $(e.currentTarget).data("bar");
    openProduct(bar);
  });

  $("#product-view").on('click', '.back-btn', () => {
    $("#product-view").addClass("d-none");
  })
});

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
    // console.log('PRODUCT', product)
    const productDOM = ` 
      <div class="container">
        <div class="back-btn d-flex ml-2">
          <div class="img"><</div>
          <span class="ml-2">Назад</span>
        </div>
        <div class="row product">
          <div class="col-4">
            <img src="./images/catalog/${product.img}" alt="" width="100%" height="100%" />
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
                  <div class="my-auto mx-3">1</div>
                  <div class="btn plus">+</div>
                </div>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12 d-flex">
                <div class="button">В корзину</div>
                <div class="button ml-2">Купить в один клик</div>
              </div>
            </div>
            ${
              product.desc ?
              `<div class="row descr">
                <div class="col-12">
                  <span>` + product.desc + 
                  `</span
                  >
                </div>
              </div>` :
              ''
            }
          </div>
        </div>
      </div>
    `;
    $("#product-view").html("");
    $("#product-view").append(productDOM);
    $("#product-view").removeClass("d-none");
  });
}
