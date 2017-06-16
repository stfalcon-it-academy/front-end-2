$(document).ready(function() {							// Виповнимо код, коли сторінка повністю завантажеться
	var price = $('#InputPrice'); 						// Ціна
	var strikeprice = $('#InputPriceStrike');	// Стара ціна
	var discount = $('#InputPriceDiscount');	// Скидка (стара ціна - ціна)
	var bonus = $('#InputPriceBonus');				// Бонус (ціна * 0.05%)
	var brand = $('#InputBrand');							// Бренд
	var result = 0;														// Результат, який буде виведений в полях `bonus` чи `discount`

	// Виведем бонус (ціна * 0.05%)
	function getBonusVal() {
		// Якщо значення в полі `brand` такі...
		if (brand.val() == "Kinetic" || brand.val() == "Cyclone" || brand.val() == "Winner") {
			// Запишемо в зміну `result` значення `ціна * 0.05%`
			result = price.val() * 0.05;
		// Якщо значення в полі `brand` такі...
		} else if (brand.val() == "Discovery" || brand.val() == "Formula" || brand.val() == "Dorozhnik" || brand.val() == "Leon" || brand.val() == "Optimabikes") {
			// Запишемо в зміну `result` значення `ціна * 0.07%`
			result = price.val() * 0.07;
		}
		// Якщо в `result` не 0, то виведем `result` в поле `bonus` і відріжем до цілого числа
		if (result !== 0) bonus.val(result.toFixed());
	}

	// Виведем скидку (стара ціна - ціна)
	function getDiscountVal() {
		// Якщо в полі `bonus` щось є, не пусте
		if (bonus.val().lenght !== 0) {
			// Обнулимо значення в полі `bonus`
			bonus.val("");
		}
		// Запишем в поле `result` значення `стара ціна - ціна`
		result = strikeprice.val() - price.val();
		// Якщо в полі `result` значення не 0, то запишемо в поле `discount` результат `result`
		if (result !== 0) discount.val(result);
		// Якщо поле `discount` пусте (якщо значення -ціна, приклад: -3454)
		if (discount.val() == "-" + price.val()) {
			// Обнулимо значення `discount`
			discount.val("");
			// Запустимо функцію для отримання Бонуса (оскільки значення `discount` обнулене, пусте)
			getBonusVal();
		}
	}

	// Запустимо функцію і виведемо `bonus` якщо `strikeprice` пустий
	getBonusVal();
	// Запустимо функцію і виведемо `discount` якщо `bonus` пустий
	getDiscountVal();

	// Функція запуститься, як тільки будуть редагуватись чи записуватись нові значення в поле `brand`
	brand.keyup(function() {
		getDiscountVal();
	});
	// Функція запуститься, як тільки будуть редагуватись чи записуватись нові значення в поле `strikeprice`
	strikeprice.keyup(function() {
		getDiscountVal();
	});
	// Функція запуститься, як тільки будуть редагуватись чи записуватись нові значення в поле `price`
	price.keyup(function() {
		getDiscountVal();
	});
});