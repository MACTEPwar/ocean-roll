class CatalogService {
  getProductsByFilter(filter, scCallback, erCallback) {
    this.getMockProducts((data) => {
      filter = filter ?? {};
      filter.skip = filter.skip ?? 0;
      filter.take = filter.take ?? -1;
    //   filter.group = "sushi";

      let products = data.find((f) => f.id === filter.group).prodcuts;

      let count = products.length;

      products = products.slice(filter.skip, filter.skip + filter.take);
      scCallback({ products: products, count: count });
    });
  }

  getMockProducts(scCallback, erCallback) {
    $.ajax({
      url: "./data/products.json",
      method: "GET",
      success: (data) => {
        scCallback(data);
      },
      error: (error) => erCallback,
    });
  }
}
