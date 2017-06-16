$(document).ready(function() {
	var price = $('#InputPrice'); 							// Ціна
	var strikeprice = $('#InputPriceStrike');		// Закреслена ціна, стара ціна
	var discount = $('#InputPriceDiscount');		// Скидка (закреслена ціна - ціна)
	var bonus = $('#InputPriceBonus');					// Бонус (ціна * 0.05%)
	var brand = $('#InputBrand');								// Бренд
	var result = 0;															// Результат в полях Бонус чи Скидка

	function getBonusVal() {
		if (brand.val() == "Kinetic" || brand.val() == "Cyclone" || brand.val() == "Winner") {
			result = price.val() * 0.05;
		} else if (brand.val() == "Discovery" || brand.val() == "Formula" || brand.val() == "Dorozhnik" || brand.val() == "Leon" || brand.val() == "Optimabikes") {
			result = price.val() * 0.07;
		}
		if (result !== 0) bonus.val(result.toFixed());
	}

	function getDiscountVal() {
		if (bonus.val().lenght !== 0) {
			bonus.val("");
		}
		result = strikeprice.val() - price.val();
		if (result !== 0) discount.val(result);
		if (discount.val() == "-" + price.val()) {
			discount.val("");
			getBonusVal();
		}
	}

	getBonusVal();
	getDiscountVal();

	brand.keyup(function() {
		getDiscountVal();
	});

	strikeprice.keyup(function() {
		getDiscountVal();
	});

	price.keyup(function() {
		getDiscountVal();
	});
});