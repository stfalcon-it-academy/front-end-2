var form = document.forms.discriminant; // запишемо форму з іменем discriminant в зміну
var inputVarA = form.elements.inputVarA; //
var inputVarB = form.elements.inputVarB; // візьмем елементи форми за іменами [name] і запишемо в зміну
var inputVarC = form.elements.inputVarC; //
var result = document.getElementById("result"); // знайдем в html елемент з індифікатором #result і запишемо в зміну

// Знайдемо дискрімінант
function getDisc(b,a,c) { 
	return Math.pow(b, 2) - 4*a*c;
}

function checkForm(form) {
	var e = 0;
	for (var i = 0; i < form.length-4; i++) {
		if (!form[i].value.replace(/^\s+|\s+$/g, '')) {
			document.getElementById("formInputA").classList.add('has-error');
			//document.getElementById("formInputB").classList.add('has-error');
			//document.getElementById("formInputC").classList.add('has-error');
			e = 1;
		}
	}
}

// Якщо дискримінант більше нуля
function discAboveZero(b,d,a,x) {
	if ( x === true) {
		return (-b + Math.sqrt(d))/(2*a);
	} else {
		return (-b - Math.sqrt(d))/(2*a);
	}
}

// Якщо дискримінант дорівнює нулю
function discLessZero(b,a) {
	return -b/(2*a);
}

// Основна функція вирішення квадратного рівняння
function btnResultDisc(a,b,c) {
	//checkForm(form);
	// Якщо поле з зміную А не дорівнює 0, то виконаємо функцію
	if (inputVarA.value != 0 && inputVarA.value != '') {
		var d = getDisc(b,a,c);

		if (d > 0) {
			var x1 = discAboveZero(b,d,a,true);
			var x2 = discAboveZero(b,d,a,false);
			result.innerHTML = 'Так як <span>дискримінант більше нуля</span> то, квадратне рівняння має <b>два дійсних кореня</b>: <br><b>X1</b> = ' + x1 + '<br>' + '<b>X2</b> = ' + x2; 
		} else if (d === 0) {
			var x = discLessZero(b,a);
			result.innerHTML = 'Так як <span>дискримінант дорівнює нулю</span> то, квадратні рівняння має <b>один дійсний корінь</b>: <br><b>X</b> = ' + x;
		} else {
			result.innerHTML = 'Так як <span>дискримінант менше нуля</span>, то рівняння <b>не має дійсних коренів</b>. <br><b>D</b> = ' + d;
		}
	result.classList.add('paddresult'); // добавимо клас .paddresult до класу .panel-footer
	// Якщо поле зі зміною А дорівнює 0
} else {
		// Виведемо помилку
			//alert("Коефіцієнт при першому доданку рівняння не може дорівнювати нулю, змініть його та спробуйте знову.");
		// Добавимо клас помилки для поля зі зміною А
			//document.getElementById("formInputA").classList.add('has-error');
		// Видалимо клас помилки поля після пропадання фокуса
		
		//document.getElementById('panel').style.border = "1px solid #d9534f";

		/*
		var box = document.getElementById('panel');
		box.addEventListener('click', function () {
			if (this.classList.contains('panel-default')) {
				this.classList.remove('panel-default');
				this.classList.add('panel-danger');
			}
		});
		*/

			inputVarA.addEventListener("blur", function() {
				document.getElementById("formInputA").classList.remove('has-error');
			}, true);

			if (inputVarA.value == 0) {
				document.getElementById("formInputA").classList.add('has-error');
			}


			//inputVarB.addEventListener("blur", function() {
			//	document.getElementById("formInputB").classList.remove('has-error');
			//}, true);
			//inputVarC.addEventListener("blur", function() {
			//	document.getElementById("formInputC").classList.remove('has-error');
			//}, true);
		// Повернути фокус на форму А
		// inputVarA.focus();	
		// Очистимо результат, якщо він був
		//##### Тут треба умова: if getElementById("result") !empty
		resultReset();
		result.innerHTML = ('Коефіцієнт при першому доданку рівняння <b>не може бути порожнім чи дорівнювати нулю</b>, змініть його та спробуйте знову.');
		result.classList.add('paddresult'); 
	}
}

// Кнопка Reset
function btnResultReset() {
	// Видалимо зміст в блоці #result
	result.innerHTML = ("");
	// Видалимо клас помилки у першому полі зміни А
	document.getElementById("formInputA").classList.remove('has-error');
	document.getElementById("formInputB").classList.remove('has-error');
	document.getElementById("formInputC").classList.remove('has-error');
	// Вернем стандартні значення зміних формули
	formulaVarA.innerHTML = 'a';
	formulaVarB.innerHTML = 'b';
	formulaVarC.innerHTML = 'c';
	// Видалимо клас .paddresult
	result.classList.remove('paddresult');
}

// Очищення після помилки: якщо поле А = 0
function resultReset() {
	// Видалимо зміст в блоці #result
	result.innerHTML = ("");
	// Видалимо клас .paddresult
	result.classList.remove('paddresult');
}

// Стилізація букв зміних формули при фокусі на поле вводу
var formulaVarA = document.getElementById("formulaVarA");
var formulaVarB = document.getElementById("formulaVarB");
var formulaVarC = document.getElementById("formulaVarC");

// Добавимо клас .focused, коли форма в фокусі.
// Удалимо клас, коли форма вийшла з фокусу.
// Зміна A
inputVarA.addEventListener("focus", function() {
	formulaVarA.classList.add('focused');
}, true);

inputVarA.addEventListener("blur", function() {
	formulaVarA.classList.remove('focused');
}, true);

// Зміна B
inputVarB.addEventListener("focus", function() {
	formulaVarB.classList.add('focused');
}, true);

inputVarB.addEventListener("blur", function() {
	formulaVarB.classList.remove('focused');
}, true);

// Зміна С
inputVarC.addEventListener("focus", function() {
	formulaVarC.classList.add('focused');
}, true);

inputVarC.addEventListener("blur", function() {
	formulaVarC.classList.remove('focused');
}, true);

// Змінення змін формули при введені в input
var oninputVarA = document.getElementById('inputVarA');
var oninputVarB = document.getElementById('inputVarB');
var oninputVarC = document.getElementById('inputVarC');

oninputVarA.oninput = function() {
	formulaVarA.innerHTML = oninputVarA.value;
};

oninputVarB.oninput = function() {
	formulaVarB.innerHTML = oninputVarB.value;
};

oninputVarC.oninput = function() {
	formulaVarC.innerHTML = oninputVarC.value;
};