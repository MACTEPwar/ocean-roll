export class NavigateService {
  defaultPage = "catalog";

  constructor(containerOutlet) {
    this.containerOutlet = containerOutlet;
  }

  loadDefaultPage() {
    this.navigateTo();
  }

  navigateTo(route) {
    $.ajax({
      url: `${route ?? this.defaultPage}.html`,
      method: "GET",
      success: (data) => {
        this.containerOutlet.html(data);
      },
      error: (err) => {
        alert(err);
      },
    });
  }
}
