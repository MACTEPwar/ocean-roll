$(document).ready(() => {
  catalogService.getProductsByFilter({ skip: 1, take: 5 }, (data) => {
    console.log(data);
    $("#catalogContent").html("");

    const resDOM = data.map((item) => {
      return `
        <div class="col-3">
            <div
            class="card br-15"
            style="box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.25)"
            >
                <div class="card-img-top" style="padding: 5px">
                    <img
                    src="./images/test_catalog_item_img.jpg"
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
    }).join('\n');

    $("#catalogContent").append(resDOM);
  });
});
