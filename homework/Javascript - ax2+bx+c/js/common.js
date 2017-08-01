/*
// Глобальні зміні
*/
var form = document.forms.discriminant; // форма з `name` [discriminant]

var inputVarA = form.elements.inputVarA; // 
var inputVarB = form.elements.inputVarB; // елемент форми (input) з `name` [inputVarB]
var inputVarC = form.elements.inputVarC; //

var formulaVarA = document.getElementById("formulaVarA"); // 
var formulaVarB = document.getElementById("formulaVarB"); // літери [a, b, c] в формулі ax²+bx+c
var formulaVarC = document.getElementById("formulaVarC"); //

var oninputVarA = document.getElementById('inputVarA'); //
var oninputVarB = document.getElementById('inputVarB'); // елемент форми (input) з індифікатором [inputVarB]
var oninputVarC = document.getElementById('inputVarC'); //

var formInputA = document.getElementById("formInputA"); // блок з класом [.form-group]

var result = document.getElementById("result"); // блок для виведення результату
/* ************************************************** */


/*
// Функції
*/

// Знайдемо дискрімінант
function getDisc(b,a,c) { 
	return Math.pow(b, 2) - 4*a*c;
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


// Перевірим поле [inputVarA] на заповненість
// добавим класс помилки, якщо поле пусте
function checkForm(form) {
	var e = 0;
	for (var i = 0; i < form.length-4; i++) {
		if (!form[i].value.replace(/^\s+|\s+$/g, '')) {
			formInputA.classList.add('has-error');
			e = 1;
		}
	}
}


// Кнопка Reset
function btnResultReset() {
	// Видалимо зміст в блоці #result
	result.innerHTML = ("");
	// Видалимо клас помилки у першому полі зміни А
	formInputA.classList.remove('has-error');
	// Повернемо стандартні значення змінних формули ax²+bx+c
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

function error() {
	inputVarA.addEventListener("blur", function() {
			document.getElementById("formInputA").classList.remove('has-error');
			result.classList.remove('paddresult'); 
		}, true);
	// Якщо поле зі зміною А дорівнює 0
	if (inputVarA.value == 0) {
		document.getElementById("formInputA").classList.add('has-error');
	}
	
	resultReset();
	result.innerHTML = ('Коефіцієнт при першому доданку рівняння <b>не може бути порожнім чи дорівнювати нулю</b>, змініть його та спробуйте знову.');
	result.classList.add('paddresult'); 
}


// Добавимо клас .focused, коли форма в фокусі.
// Удалимо клас, коли форма вийшла з фокусу.
// Зміна A
inputVarA.addEventListener("focus", function() {
	formulaVarA.classList.add('focused');
}, true);

inputVarA.addEventListener("blur", function() {
	formulaVarA.classList.remove('focused');
	// Якщо поле пусте, то повернемо зміну 'a' в формулу ax²+bx+c
	if (oninputVarA.value == '') formulaVarA.innerHTML = 'a';
}, true);

// Зміна B
inputVarB.addEventListener("focus", function() {
	formulaVarB.classList.add('focused');
}, true);

inputVarB.addEventListener("blur", function() {
	formulaVarB.classList.remove('focused');
	// Якщо поле пусте, то повернемо зміну 'b' в формулу ax²+bx+c
	if (oninputVarB.value == '') formulaVarB.innerHTML = 'b';
}, true);

// Зміна С
inputVarC.addEventListener("focus", function() {
	formulaVarC.classList.add('focused');
}, true);

inputVarC.addEventListener("blur", function() {
	formulaVarC.classList.remove('focused');
	// Якщо поле пусте, то повернемо зміну 'с' в формулу ax²+bx+c
	if (oninputVarC.value == '') formulaVarC.innerHTML = 'c';
}, true);


// Змінення формули при введені в input
oninputVarA.oninput = function() {
	formulaVarA.innerHTML = oninputVarA.value;
};

oninputVarB.oninput = function() {
	formulaVarB.innerHTML = oninputVarB.value;
};

oninputVarC.oninput = function() {
	formulaVarC.innerHTML = oninputVarC.value;
};

/*
// Основна функція вирішення квадратного рівняння
*/
function btnResultDisc(a,b,c) {
	checkForm(form);
	// Якщо поле з зміную А не пусте чи не дорівнює 0, то виконаємо функцію
	if (inputVarA.value != 0 && inputVarA.value != '') {
		var d = getDisc(b,a,c);

		if (d > 0) {
			var x1 = discAboveZero(b,d,a,true);
			var x2 = discAboveZero(b,d,a,false);
			result.innerHTML = 'Так як <span>дискримінант більше нуля</span> то, квадратне рівняння має <b>два дійсних кореня</b>: <br><b>X1</b> = ' + x1 + '<br>' + '<b>X2</b> = ' + x2; 
		} 
		else if (d === 0) {
			var x = discLessZero(b,a);
			result.innerHTML = 'Так як <span>дискримінант дорівнює нулю</span> то, квадратні рівняння має <b>один дійсний корінь</b>: <br><b>X</b> = ' + x;
		} 
		else {
			result.innerHTML = 'Так як <span>дискримінант менше нуля</span>, то рівняння <b>не має дійсних коренів</b>. <br><b>D</b> = ' + d;
		}
		result.classList.add('paddresult'); // добавимо клас .paddresult до класу .panel-footer
	} 
	// Якщо поле зі зміною А пусте
	else {
		inputVarA.addEventListener("blur", function() {
			document.getElementById("formInputA").classList.remove('has-error');
			result.classList.remove('paddresult'); 
		}, true);
	// Якщо поле зі зміною А дорівнює 0
	if (inputVarA.value == 0) {
		document.getElementById("formInputA").classList.add('has-error');
	}
	
	resultReset();
	result.innerHTML = ('Коефіцієнт при першому доданку рівняння <b>не може бути порожнім чи дорівнювати нулю</b>, змініть його та спробуйте знову.');
	result.classList.add('paddresult'); 
	}
}
