let pagingService = null;
$(document).ready(() => {
  pagingService = new PagingService(onChangePageCb);

  onChangePageCb();
});

function onChangePageCb() {
  catalogService.getProductsByFilter(
    { skip: pagingService.skip, take: pagingService.take },
    (data) => {
      $("#catalogContent").html("");

      const resDOM = data.products
        .map((item) => {
          return `
            <div class="col-3 py-2">
                <div
                class="card br-15"
                style="box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.25)"
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