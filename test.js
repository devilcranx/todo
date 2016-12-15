"use strict";

// объявление переменных
var doAdd = document.getElementById('doAdd');
var doInput = document.getElementById("doInput");
var todoList = document.getElementById("todo-list");
var todoItem = document.getElementById("todo-item");
var checkItem = document.getElementById("check-item");
var remCheck = document.getElementById("remove-checked");

// Обработчик при нажатии добавить
doAdd.onclick = function(event) {
	var target = event.target; // где был клик?
	//if (target.tagName != 'A') return;
	event.preventDefault();
	doRun();
};

// Добавление новой задачи
function doRun() {
	var inputVal = doInput.value;
	if(doInput.value === "") {
		errorMessage("Введите задачу");
		return;
	}
	if(hasItem(inputVal)) return;

	var newLi = document.createElement('li');
	newLi.className = "li-item";
	var doSpan = document.createElement('span');
	doSpan.innerHTML = doInput.value;
	doSpan.className = "dospan";
	newLi.insertBefore(doSpan, newLi.children[1]);

	var box = document.createElement('input');
	box.type = 'checkbox';
	box.className = "checkbox";
	newLi.insertBefore(box, newLi.children[1]);

	var del = document.createElement('div');
	del.classList = "del lnr lnr-cross";
	del.innerHTML = "";
	newLi.insertBefore(del, newLi.children[1]);

	var edit = document.createElement('i');
	edit.classList = "edit lnr lnr-pencil"
	edit.innerHTML = "";
	newLi.insertBefore(edit, newLi.children[1]);


	todoItem.insertBefore(newLi, todoItem.children[1]);
	doInput.value = "";

	deleteMessage();

	// Сохранение в локальное хранилище
	var todos = document.getElementById("todo-item").innerHTML;
	localStorage.setItem('todos', todos);
}

// Добавление задачи при нажатии на enter
doInput.onkeydown = function(e) {
	if (e.keyCode == 13) {
		doRun();
		return false;
	}
};


function deleteMessage() {
	var inform = document.getElementById("inform");
	inform.innerHTML = "Задача добавлена!";
	inform.style.color = 'green';
	setTimeout(function () {
		inform.innerHTML = "";
	}, 2000)
}

function errorMessage(errorText) {
	var inform = document.getElementById("inform");
	inform.innerHTML = errorText;
	inform.style.color = 'red';
}


var editItem, content, txt;

// Дополнительные функции редактирование, удаление
(function () {

	todoItem.onclick = function(e) {
		if (e.target.checked) {
			//e.target.parentNode.className = "complited";
			e.target.parentNode.classList = "complited li-item";
			var compli = e.target.parentNode;
			var checkItem = document.getElementById("check-item");
			checkItem.insertBefore(compli, checkItem.children[1]);
		}

		
		if (e.target.tagName == 'DIV') {
			var parent = e.target.parentNode.parentNode;
			var child = e.target.parentNode;
			parent.removeChild(child);

			// Сохранение в локальное хранилище
			var todos = document.getElementById("todo-item").innerHTML;
			localStorage.setItem('todos', todos);

		}


		if (e.target.tagName == 'I') {

			e.target.style.display = "none";
			editItem = e.target.previousElementSibling;
			content = editItem.innerHTML;
			editItem.innerHTML = '<textarea id="text-edit" class="edit-area"></textarea>';
			txt = document.getElementById('text-edit');
			txt.value = content;
			editItem.insertAdjacentHTML("beforeEnd",
				'<div class="edit-controls"><button id="edit-ok">OK</button><button id="edit-cancel">CANCEL</button></div>');

			var ok = document.getElementById('edit-ok');
			var cnl = document.getElementById('edit-cancel');
			ok.onclick = function() {
				var tar = e.target;
				edit_ok(tar);


			};
			cnl.onclick = function() {
				edit_cnl();
				e.target.style.display = "inline-block";
			};

		}


	};

	checkItem.onclick = function(eve) {

		if (eve.target.tagName == 'INPUT') {
			if (!eve.target.checked) {
				//eve.target.parentNode.className = "uncomplited";
				eve.target.parentNode.classList = "uncomplited li-item";
				var uncompli = eve.target.parentNode;
				var uncheckItem = document.getElementById("todo-item");
				uncheckItem.insertBefore(uncompli, uncheckItem.children[1]);
			}
		}

		if (eve.target.tagName == 'DIV') {
			var parent = eve.target.parentNode.parentNode;
			var child = eve.target.parentNode;
			parent.removeChild(child);

			// Сохранение в локальное хранилище
			var todos = document.getElementById("todo-item").innerHTML;
			localStorage.setItem('todos', todos);

		}

		if (eve.target.tagName == 'I') {
			editItem = eve.target.previousElementSibling;
			content = editItem.innerHTML;
			editItem.innerHTML = '<textarea id="text-edit" class="edit-area"></textarea>';
			txt = document.getElementById('text-edit');
			txt.value = content;
			editItem.insertAdjacentHTML("beforeEnd",
				'<div class="edit-controls"><button id="edit-ok">OK</button><button id="edit-cancel">CANCEL</button></div>');

			var ok = document.getElementById('edit-ok');
			var cnl = document.getElementById('edit-cancel');
			ok.onclick = function() {
				var tar = eve.target;
				console.log("sdsd");
				edit_ok(tar);

			};
			cnl.onclick = function() {
				edit_cnl();
				eve.target.style.display = "inline-block";
			};

		}

	};

}());



// Редактирование - сохраняем
function edit_ok(tar) {

	if(hasItem(txt.value)) return;

	editItem.innerHTML = txt.value;
	editItem.classList.remove('edit_td');
	tar.style.display = "inline-block";

}

// Редактирование - отмена
function edit_cnl() {
	editItem.innerHTML = content;
	editItem.classList.remove('edit_td');

}

// Удаление выполненных задач
remCheck.onclick = function(o) {
	var allItem = document.getElementsByClassName("checkbox");
	var itemArr = [];
	for(var k=0; k<allItem.length; k++) {
		if (allItem[k].checked == true) {
			itemArr.push(allItem[k]);
		}
	}
	for(var t=0; t<itemArr.length; t++) {
		var parentArr = itemArr[t].parentNode.parentNode;
		var childArr = itemArr[t].parentNode;
		parentArr.removeChild(childArr);

		window.localStorage.clear();
		// Сохранение в локальное хранилище
		var todos = document.getElementById("todo-item").innerHTML;
		localStorage.setItem('todos', todos);

	}

};

// Удаление всех задач, создание нового списка
var newList = document.getElementById("new-list");
newList.onclick = function() {
	var liItem = document.getElementsByClassName("li-item");

	var itemArr = [];
	for(var k=0; k<liItem.length; k++) {
		itemArr.push(liItem[k]);
	}
	for(var t=0; t<itemArr.length; t++) {
		var parentArr = itemArr[t].parentNode;
		var childArr = itemArr[t];
		parentArr.removeChild(childArr);
		window.localStorage.clear();
	}
 };

// Проверка есть ли такая задача
function hasItem(inputVal) {
	var allSpanItem = document.getElementsByClassName("dospan");
	for(var t=0; t<allSpanItem.length; t++) {
		if(allSpanItem[t].innerHTML == inputVal) {
			errorMessage("Такая задача уже есть!");
			return true;
		}
	}
}

// local storage чтобы после перезагрузки не пропадали!
// если в локальном хранилище уже есть данные, то отображаем их

if(localStorage.getItem('todos')) {
	var todos = document.getElementById("todo-item").innerHTML = localStorage.getItem('todos');
}

// Полная очистка localStorage
var clear = document.getElementById("clear");
clear.onclick = function() {
	window.localStorage.clear();
	location.reload();
	return false;
};


