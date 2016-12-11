"use strict";

var doAdd = document.getElementById('doAdd');
var doInput = document.getElementById("doInput");
var todoList = document.getElementById("todo-list");
var todoItem = document.getElementById("todo-item");

var remCheck = document.getElementById("remove-checked");

doAdd.onclick = function(event) {
	var target = event.target; // где был клик?
	//if (target.tagName != 'A') return;
	event.preventDefault();
	doRun();
};


function doRun() {
	if(doInput.value === "") return;
	//console.log(doInput.value);
	var newLi = document.createElement('li');
	newLi.className = "li-item";
	var doSpan = document.createElement('span');
	doSpan.innerHTML = doInput.value;
	doSpan.className = "dospan";
	newLi.insertBefore(doSpan, newLi.children[1]);
	//newLi.innerHTML = doSpan;

	var box = document.createElement('input');
	box.type = 'checkbox';
	box.className = "checkbox";
	newLi.insertBefore(box, newLi.children[1]);

	var del = document.createElement('div');
	del.className = "del";
	del.innerHTML = "×";
	newLi.insertBefore(del, newLi.children[1]);


	todoItem.insertBefore(newLi, todoItem.children[1]);
	doInput.value = "";
	//todoList.innerHTML = doInput.value;
	//checkedDo();
}

doInput.onkeydown = function(e) {
	if (e.keyCode == 13) {
		doRun();
		return false;
	}
};


/*
(function () {
	// код функции
	//var check = document.querySelector('.checkbox');
	todoItem.onclick = function(r) {

		var parent = r.target.parentNode;
		var child = r.target.parentNode;
		console.log(parent);
		parent.removeChild(child);
	};

}());
*/

(function () {

	todoItem.onclick = function(e) {
		console.log(e.target);
		if (e.target.checked) {
			e.target.parentNode.className = "complited";
		} else {
			e.target.parentNode.className = "uncomplited";
		}

		
		if (e.target.tagName == 'DIV') {
			var parent = e.target.parentNode.parentNode;
			var child = e.target.parentNode;
			parent.removeChild(child);
		}


	};

}());




remCheck.onclick = function(o) {
	var allItem = document.getElementsByClassName("checkbox");
	console.log(allItem);

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
	}
 };

/*newList.onclick = function() {
	var liItem = document.getElementsByClassName("li-item");
	for(var t=0; t<liItem.length; t++) {
		var parentArr = liItem[t].parentNode.parentNode;
		var childArr = liItem[t].parentNode;
		parentArr.removeChild(childArr);

		var olElem = document.createElement('ol');
		olElem.id = "todo-item";
		todoList.insertBefore(olElem, todoList.children[1]);

	}
};
*/



/*
function checkedDo() {
	var check = document.querySelector('.checkbox');

	for(var i=0; i<check.length; i++) {
		check[i].onclick = function(e) {
			console.log('tet');
			if (check[i].checked) {
				this.parentNode.className = "complited";
			} else {
				this.parentNode.className = "uncomplited";
			}
		};
	}
}
*/



/* ==

 check.onclick = function(e) {
 console.log('tet');
 if (check.checked) {
 this.parentNode.className = "complited";
 } else {
 this.parentNode.className = "uncomplited";
 }
 };

 */