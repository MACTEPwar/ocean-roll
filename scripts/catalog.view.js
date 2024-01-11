import { PagingService } from "./paging.service.js";

export class CatalogView {
  pagingService = null;
  currentGroup = "sushi";
  tempPosition = null;

  constructor(app) {
    this.receiptService = app.providers.get("receiptService");
    this.catalogService = app.providers.get("catalogService");
  }

  onInit() {
    this.pagingService = new PagingService(() => {
      this.loadData();
    });

    // load default category
    $(".menu-categories .category-item.active").removeClass("active");
    $(".menu-categories .category-item[data-category-name=sushi]").addClass(
      "active"
    );
    this.loadData();

    // event for laod any category
    $(".menu-categories .category-item").on("click", (e) => {
      this.currentGroup = $(e.currentTarget).data("category-name");
      this.pagingService.skip = 0;
      $(".menu-categories .category-item.active").removeClass("active");
      $(e.currentTarget).addClass("active");
      this.loadData();
    });

    // onclick prodcut card
    $("#catalogContent").on("click", ".product-item", (e) => {
      const bar = $(e.currentTarget).data("bar");
      this.openProduct(bar);
    });

    // onclick back from product card
    $("#product-view").on("click", ".back-btn", () => {
      this.backBtn();
    });

    // minus product amount
    $("#product-view").on("click", ".minus", () => {
      if (this.tempPosition.amount > 0) {
        this.tempPosition.amount--;
        $("#product-view .ranger .amount").text(this.tempPosition.amount);
      }
    });

    // add product amount
    $("#product-view").on("click", ".plus", () => {
      this.tempPosition.amount++;
      $("#product-view .ranger .amount").text(this.tempPosition.amount);
    });

    // move product to cart
    $("#product-view").on("click", ".to-cart", () => {
      this.receiptService.addProductToReceipt(this.tempPosition);
      this.tempPosition = null;
      this.backBtn();
    });
    $("#product-view").on("click", ".pay-one-click", () => {});
  }

  loadData() {
    console.log("PAGING", $("#catalogContent"));
    this.catalogService.getProductsByFilter(
      {
        skip: this.pagingService.skip,
        take: this.pagingService.take,
        group: this.currentGroup,
      },
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
        const paging = this.pagingService.getPagingDOM(data.count);

        $("#pagination .pagination").html("");
        $("#pagination .pagination").append(paging);
        $("#catalogContent").append(resDOM);
      }
    );
  }

  backBtn() {
    $("#product-view").addClass("d-none");
  }

  openProduct(bar) {
    this.catalogService.getProdcutByBar(bar, (product) => {
      this.tempPosition = {
        bar: bar,
        price: product.price,
        amount: 1,
        name: product.name,
        img: product.img,
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
}
