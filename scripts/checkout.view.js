export class CheckoutView {
  constructor(app) {
    this.receiptService = app.providers.get("receiptService");
    this.navigateService = app.providers.get("navigateService");
  }
  onInit() {
    // fill total price
    $("#totalPrice").text(this.receiptService.getTotalPrice());

    // on submit form
    $("#orderForm").on("submit", (e) => {
      let formData = {};
      $("#orderForm")
        .find("input, select, textarea")
        .each(function () {
          if ($(this).attr("type") === "radio") {
            return;
          }

          var name = $(this).attr("name");
          var value = $(this).val();
          if (name) {
            formData[name] = value;
          }
        });
      formData.paymentMethod = $("input[name=paymentMethod]:checked").val();
      formData.deliveryMethod = $("input[name=deliveryMethod]:checked").val();

      if (this.formIsValid(formData)) {
      } else {
        alert("form not valid");
      }

      this.receiptService.currentOrderOptions = formData;
      this.navigateService.navigateTo("complete-order");

      e.preventDefault();
    });

    // on change delivery method
    $("input[name=deliveryMethod]").on("click", (e) => {
      if (e.currentTarget.value === "pickup") {
        $("#storeSelection").removeClass("d-none");
        $("#deliveryAddress").addClass("d-none");
      } else {
        $("#storeSelection").addClass("d-none");
        $("#deliveryAddress").removeClass("d-none");
      }
    });
  }

  // validate form
  formIsValid(formData) {
    return (
      this.inputNotEmpty(formData.fullName) &&
      this.inputNotEmpty(formData.phoneNumber) &&
      this.deliveryAddressIsValid(formData)
    );
  }

  inputNotEmpty(inp) {
    return inp && inp.trim() !== "";
  }

  deliveryAddressIsValid(formData) {
    return formData.deliveryMethod === "courier"
      ? this.inputNotEmpty(formData.address)
      : true;
  }
}
