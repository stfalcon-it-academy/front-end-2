$(document).ready(function () {
  var $price = $('#InputPrice');
  var $strikeprice = $('#InputPriceStrike');
  var $discount = $('#InputPriceDiscount');
  var $bonus = $('#InputPriceBonus');
  var $brand = $('#InputBrand');
  var result = 0;

  function getBonusVal() {
    switch ($brand.val().toLowerCase()) {
      case ("kinetic"):
      case ("cyclone"):
      case ("winner"):
        result = $price.val() * 0.05;
      break;
      case ("discovery"):
      case ("formula"):
      case ("dorozhnik"):
      case ("leon"):
      case ("optimabikes"):
        result = $price.val() * 0.07;
      break;
    }
    if (result !== 0) $bonus.val(result.toFixed());
  }

  function getDiscountVal() {
    if ($bonus.val().lenght !== 0) $bonus.val("");
    result = $strikeprice.val() - $price.val();
    if (result !== 0) $discount.val(result);
    if ($discount.val() === "-" + $price.val()) {
      $discount.val("");
      getBonusVal();
    }
  }

  getBonusVal();
  getDiscountVal();

  $('#InputPriceStrike, #InputPrice, #InputBrand').keyup(function () {
    getDiscountVal();
  });
});		