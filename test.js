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
	if(doInput.value === "") return;
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

function errorMessage() {
	var inform = document.getElementById("inform");
	inform.innerHTML = "Такая задача уже есть!";
	inform.style.color = 'red';
}


var editItem, content, txt;

// Дополнительные функции редактирование, удаление
(function () {

	todoItem.onclick = function(e) {
		if (e.target.checked) {
			e.target.parentNode.className = "complited";
			var compli = e.target.parentNode;
			var checkItem = document.getElementById("check-item");
			checkItem.insertBefore(compli, checkItem.children[1]);
		} /*else {
			e.target.parentNode.className = "uncomplited";

			var uncompli = e.target.parentNode;
			var uncheckItem = document.getElementById("todo-item");
			uncheckItem.insertBefore(uncompli, uncheckItem.children[1]);
		}*/

		
		if (e.target.tagName == 'DIV') {
			var parent = e.target.parentNode.parentNode;
			var child = e.target.parentNode;
			parent.removeChild(child);

			// Сохранение в локальное хранилище
			var todos = document.getElementById("todo-item").innerHTML;
			localStorage.setItem('todos', todos);

		}


		if (e.target.tagName == 'I') {
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
				edit_ok();

			};
			cnl.onclick = function() {
				edit_cnl();
			};

		}


	};

	checkItem.onclick = function(eve) {

		if (eve.target.tagName == 'INPUT') {
			if (!eve.target.checked) {
				eve.target.parentNode.className = "uncomplited";
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
				edit_ok();

			};
			cnl.onclick = function() {
				edit_cnl();
			};

		}

	};

}());



// Редактирование - сохраняем
function edit_ok() {
	//console.log(txt.value);
	if(hasItem(txt.value)) return;

	editItem.innerHTML = txt.value;
	editItem.classList.remove('edit_td');


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

/*	for(var k=0; k<allItem.length; k++) {
		if (allItem[k].checked) {
			var par = allItem[k].parentNode.parentNode;
			var chil = allItem[k].parentNode;
			par.removeChild(chil);
		}
	}
*/
};

// Удаление всех задач, создание нового списка
var newList = document.getElementById("new-list");
newList.onclick = function() {
	var liItem = document.getElementsByClassName("li-item");

	// удаление выполненных попробовать classlist !!
	var comp = document.getElementsByClassName("complited");
	var uncomp = document.getElementsByClassName("uncomplited");

	var itemArr = [];
	for(var k=0; k<liItem.length; k++) {
		itemArr.push(liItem[k]);
		itemArr.push(comp[k]);
		itemArr.push(uncomp[k]);
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
	//console.log(inputVal);
	var allSpanItem = document.getElementsByClassName("dospan");
	//console.log(allSpanItem);
	for(var t=0; t<allSpanItem.length; t++) {
		if(allSpanItem[t].innerHTML == inputVal) {
			errorMessage();
			return true;
			//console.log(allSpanItem[t]);
			//console.log(inputVal);
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


