class PagingService {
  constructor(onChangePageCb) {
    this.skip = 0;
    this.take = 8;
    this.onChangePageCb = onChangePageCb;

    $(".pagination").on("click", ".page-item", (e) => {
      const page = $(e.currentTarget).data("page");
      // alert(page)
      this.onChangePage(page);
    });
  }

  getPagingDOM(countAll) {
    this.countPages =
      countAll % this.take !== 0
        ? ((countAll / this.take) | 0) + 1
        : countAll / this.take;

    this.currentPage = this.skip / this.take;

    console.log(
      "t",
      countAll,
      this.countPages,
      this.currentPage,
      this.skip,
      this.take
    );

    return `
      <li class="page-item" data-page="first">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      ${this.getPages(this.countPages)}
      <li class="page-item"  data-page="last">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
      </li>
    `;
  }

  getPages(n) {
    return Array.from({ length: n }, (_, index) => index + 1)
      .map(
        (m) =>
          ` <li class="page-item ${
            this.currentPage === m - 1 ? "active" : ""
          }" data-page="${m}"><a class="page-link" href="#">${m}</a></li>`
      )
      .join("\n");
  }

  onChangePage(page) {
    let pageCalc = null;
    switch (page) {
      case "first": {
        pageCalc = 1;
        break;
      }
      case "prev": {
        pageCalc = this.currentPage - 1 > 1 ? this.currentPage - 1 : 1;
        break;
      }
      case "next": {
        pageCalc =
          this.currentPage + 1 > this.countPages
            ? this.countPages
            : this.currentPage + 1;
        break;
      }
      case "last": {
        pageCalc = this.countPages;
        break;
      }
      default:
        pageCalc = page;
    }

    this.skip = (pageCalc - 1) * this.take;

    this.onChangePageCb();
  }
}
