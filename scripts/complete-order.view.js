export class CompleteOrderView {
  constructor(app) {
    this.navigateService = app.providers.get("navigateService");
  }
  onInit() {
    $("#goMain").on('click', () => {
      this.navigateService.navigateTo("main");
    });

    $("#goMenu").on('click', () => {
      this.navigateService.navigateTo("catalog");
    });
  }
}
