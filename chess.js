/**
 * Глобальные переменные
 */
var FIELD_SIZE_X = 8;
var FIELD_SIZE_Y = 8;
var previous;                // переменная для фигуры, которой ходим
var next;                    // переменная для фигуры/клетки, куда ходим
var game_is_running = false; // идёт ли игра
var white_play = false;      // ожидание хода белых
var black_play = false;      // ожидание хода чёрных

/**
 * Функция инициализации
 */
function init() {
    prepareGameField(); // Генерация поля
	putFigures();       // Расстановка фигур
	figureMove('rookBlack'); // Подключаем движение фигур
	figureMove('horseBlack');
	figureMove('elefantBlack');
	figureMove('qweenBlack');
	
	// События кнопок Старт и Новая игра
    document.getElementById('start').addEventListener('click', startGame);
    document.getElementById('renew').addEventListener('click', refreshGame);
	
    var wrap = document.getElementsByClassName('wrap')[0];
    // Подгоняем размер контейнера под игровое поле
    if (16 * (FIELD_SIZE_X + 1) < 380) {
        wrap.style.width = '380px';
    }
    else {
        wrap.style.width = (16 * (FIELD_SIZE_X + 1)).toString() + 'px';
    }
}

/**
 * Функция генерации игрового поля
 */
function prepareGameField() {
    // Создаём таблицу
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');

    // Генерация ячеек игровой таблицы
    for (var i = 0; i < FIELD_SIZE_Y; i++) {
        // Создание строки
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;

        for (var j = 0; j < FIELD_SIZE_X; j++) {			
			if ((i+j)%2==0) { // В зависимости от положения ячейки чередуем цвета
				// Создание белой ячейки
				var cell = document.createElement('td');
				cell.className = 'cell-white cell-' + i + '-' + j + ' droppable';

				row.appendChild(cell); // Добавление ячейки
			
			} else {
				// Создание чёрной ячейки
				var cell = document.createElement('td');
				cell.className = 'cell-black cell-' + i + '-' + j + ' droppable';

				row.appendChild(cell); // Добавление ячейки	
			}
        }
        game_table.appendChild(row); // Добавление строки
    }

    document.getElementById('chess-field').appendChild(game_table); // Добавление таблицы
	
	document.getElementById('play-now').innerHTML = 'Для начала игры нажмите "Старт"'; // Добавление начального текста в поле
}

/**
 * Функция расстановки фигур
 */
function putFigures() {
	for (var i = 0; i < FIELD_SIZE_Y; i++) {
		for (var j = 0; j < FIELD_SIZE_X; j++) {
			var className = 'cell-' + j + '-' + i;
			var cell = document.getElementsByClassName(className)[0];
            cell.style.backgroundSize = 'contain';

			// По координатам ячеек в таблице расставляются фигуры
			switch (className) {
				// Черные
				case 'cell-0-0': {
					var img = document.createElement('img'); // Создаем картинку
					img.src = 'images/rook_black.png';       // Указываем путь
					img.style.height = '40px';               // Высота
					img.classList.add('rookBlack');          // Класс - имя фигуры
					img.classList.add('draggable');          // Класс - переносимое
					cell.appendChild(img);                   // Добавляем картинку в клетку
					break;
				}
				case 'cell-0-1': {
					var img = document.createElement('img');
					img.src = 'images/horse_black.png';
					img.style.height = '40px';
					img.classList.add('horseBlack');
					img.classList.add('draggable');
					cell.appendChild(img);
					break;
				}
				case 'cell-0-2': {
					var img = document.createElement('img');
					img.src = 'images/elefant_black.png';
					img.style.height = '40px';
					img.classList.add('elefantBlack');
					img.classList.add('draggable');
					cell.appendChild(img);
					break;
				}
				case 'cell-0-3': {
					var img = document.createElement('img');
					img.src = 'images/qween_black.png';
					img.style.height = '40px';
					img.classList.add('qweenBlack');
					img.classList.add('draggable');
					cell.appendChild(img);
					break;
				}
				case 'cell-0-4': {
					cell.style.backgroundImage = 'url(images/king_black.png)';
					break;
				}
				case 'cell-0-5': {
					cell.style.backgroundImage = 'url(images/elefant_black.png)';
					break;
				}
				case 'cell-0-6': {
					cell.style.backgroundImage = 'url(images/horse_black.png)';
					break;
				}
				case 'cell-0-7': {
					cell.style.backgroundImage = 'url(images/rook_black.png)';
					break;
				}
				case 'cell-1-0': {
					cell.style.backgroundImage = 'url(images/pawn_black.png)';
					break;
				}
				case 'cell-1-1': {
					cell.style.backgroundImage = 'url(images/pawn_black.png)';
					break;
				}
				case 'cell-1-2': {
					cell.style.backgroundImage = 'url(images/pawn_black.png)';
					break;
				}
				case 'cell-1-3': {
					cell.style.backgroundImage = 'url(images/pawn_black.png)';
					break;
				}
				case 'cell-1-4': {
					cell.style.backgroundImage = 'url(images/pawn_black.png)';
					break;
				}
				case 'cell-1-5': {
					cell.style.backgroundImage = 'url(images/pawn_black.png)';
					break;
				}
				case 'cell-1-6': {
					cell.style.backgroundImage = 'url(images/pawn_black.png)';
					break;
				}
				case 'cell-1-7': {
					cell.style.backgroundImage = 'url(images/pawn_black.png)';
					break;
				}
				
				// Белые
				case 'cell-7-0': {
					cell.style.backgroundImage = 'url(images/rook_white.png)';
					break;
				}
				case 'cell-7-1': {
					cell.style.backgroundImage = 'url(images/horse_white.png)';
					break;
				}
				case 'cell-7-2': {
					cell.style.backgroundImage = 'url(images/elefant_white.png)';
					break;
				}
				case 'cell-7-3': {
					cell.style.backgroundImage = 'url(images/qween_white.png)';
					break;
				}
				case 'cell-7-4': {
					cell.style.backgroundImage = 'url(images/king_white.png)';
					break;
				}
				case 'cell-7-5': {
					cell.style.backgroundImage = 'url(images/elefant_white.png)';
					break;
				}
				case 'cell-7-6': {
					cell.style.backgroundImage = 'url(images/horse_white.png)';
					break;
				}
				case 'cell-7-7': {
					cell.style.backgroundImage = 'url(images/rook_white.png)';
					break;
				}
				case 'cell-6-0': {
					cell.style.backgroundImage = 'url(images/pawn_white.png)';
					break;
				}
				case 'cell-6-1': {
					cell.style.backgroundImage = 'url(images/pawn_white.png)';
					break;
				}
				case 'cell-6-2': {
					cell.style.backgroundImage = 'url(images/pawn_white.png)';
					break;
				}
				case 'cell-6-3': {
					cell.style.backgroundImage = 'url(images/pawn_white.png)';
					break;
				}
				case 'cell-6-4': {
					cell.style.backgroundImage = 'url(images/pawn_white.png)';
					break;
				}
				case 'cell-6-5': {
					cell.style.backgroundImage = 'url(images/pawn_white.png)';
					break;
				}
				case 'cell-6-6': {
					cell.style.backgroundImage = 'url(images/pawn_white.png)';
					break;
				}
				case 'cell-6-7': {
					cell.style.backgroundImage = 'url(images/pawn_white.png)';
					break;
				}				
			}			
		}
	}
}

/**
 * Старт игры
 */
function startGame() {
	document.getElementById('start').style.boxShadow = 'inset 0 0 20px #301901'; // При нажатии кнопка "вдавливается"
	document.getElementById('start').disabled = true;		                     // И далее неактивна
    document.getElementById('play-now').innerHTML = 'Ход белых';
    game_is_running = true;
	white_play = true;
}

/**
 * Функция перемещения мышкой
 */
function figureMove(className) {
	/*var dragObject = {};

	var board = document.getElementsByClassName('game-table')[0];

	board.onmousedown = function(e) {

	if (e.which != 1) { // если клик правой кнопкой мыши,
		return; // то он не запускает перенос
	}

	  var elem = e.target.closest('.draggable');
	  if (!elem) return; // не нашли, клик вне draggable-объекта

	  // запомнить переносимый объект
	  dragObject.elem = elem;

	  // запомнить координаты, с которых начат перенос объекта
	  dragObject.downX = e.pageX;
	  dragObject.downY = e.pageY;
	  
	  board.onmousemove = function(e) {
		  if (!dragObject.elem) return; // элемент не зажат

		  if ( !dragObject.avatar ) { // если перенос не начат...

			// посчитать дистанцию, на которую переместился курсор мыши
			var moveX = e.pageX - dragObject.downX;
			var moveY = e.pageY - dragObject.downY;
			
			if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) {
			  return; // ничего не делать, мышь не передвинулась достаточно далеко
			}

			dragObject.avatar = createAvatar(e); // захватить элемент
			if (!dragObject.avatar) {
			  dragObject = {}; // аватар создать не удалось, отмена переноса
			  return; // возможно, нельзя захватить за эту часть элемента
			}

			// аватар создан успешно
			// создать вспомогательные свойства shiftX/shiftY
			var coords = getCoords(dragObject.avatar);
			dragObject.shiftX = dragObject.downX - coords.left;
			dragObject.shiftY = dragObject.downY - coords.top;

			startDrag(e); // отобразить начало переноса
		  }

		  // отобразить перенос объекта при каждом движении мыши
		  dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
		  dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

		  return false;
		}
		
		board.onmouseup = function(e) {
			if (dragObject.avatar) { // если перенос идет
			  finishDrag(e);
			}

			// перенос либо не начинался, либо завершился
			// в любом случае очистим "состояние переноса" dragObject
			dragObject = {};
		}
		
		function finishDrag(e) {
			var dropElem = findDroppable(e);

			if (!dropElem) {
			  self.onDragCancel(dragObject);
			} else {
			  self.onDragEnd(dragObject, dropElem);
			}
		  }
		
		function createAvatar(e) {
		  // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
		  var avatar = dragObject.elem;
		  var old = {
			parent: avatar.parentNode,
			nextSibling: avatar.nextSibling,
			position: avatar.position || '',
			left: avatar.left || '',
			top: avatar.top || '',
			zIndex: avatar.zIndex || ''
		  };

		  // функция для отмены переноса
		  avatar.rollback = function() {
			old.parent.insertBefore(avatar, old.nextSibling);
			avatar.style.position = old.position;
			avatar.style.left = old.left;
			avatar.style.top = old.top;
			avatar.style.zIndex = old.zIndex
		  };

		  return avatar;
		}
		
		function startDrag(e) {
		  var avatar = dragObject.avatar;

		  // инициировать начало переноса
		  document.body.appendChild(avatar);
		  avatar.style.zIndex = 9999;
		  avatar.style.position = 'absolute';
		}
		
		function findDroppable(event) {
    // спрячем переносимый элемент
    dragObject.avatar.hidden = true;

    // получить самый вложенный элемент под курсором мыши
    var elem = document.elementFromPoint(event.clientX, event.clientY);

    // показать переносимый элемент обратно
    dragObject.avatar.hidden = false;

    if (elem == null) {
		// такое возможно, если курсор мыши "вылетел" за границу окна
      return null;
    }
	
	return elem.closest('.droppable');
  }
	
	this.onDragEnd = function(dragObject, dropElem) {};
  this.onDragCancel = function(dragObject) {};
	
	*/
	var dragObject = {};
	var fig = document.getElementsByClassName(className)[0]; // Берем элемент по классу
	// Подключаем перетаскивание
	fig.onmousedown = function(e) {
		if (e.which != 1) { // если клик правой кнопкой мыши,
			return; // то он не запускает перенос
		}
		
		// запомнить переносимый объект
		  dragObject.elem = fig;

		  // запомнить координаты, с которых начат перенос объекта
		  dragObject.downX = e.pageX;
		  dragObject.downY = e.pageY;
		
		fig.style.position = 'absolute'; // абсолютное позиционирование
		moveAt(e);
		
		//fig.style.zIndex = 3; // с нажатием - расположение над всеми
		
		function moveAt(e) {
			// Устанавливаем координаты картинки под мышью
			fig.style.left = e.pageX - fig.offsetWidth / 2 + 'px';
			fig.style.top = e.pageY - fig.offsetHeight / 2 + 'px';
		}
		
		document.onmousemove = function(e) {
			if (!dragObject.elem) return; // элемент не зажат
			
			if ( !dragObject.avatar ) { // если перенос не начат...

			// посчитать дистанцию, на которую переместился курсор мыши
			var moveX = e.pageX - dragObject.downX;
			var moveY = e.pageY - dragObject.downY;
			
			if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) {
			  return; // ничего не делать, мышь не передвинулась достаточно далеко
			}

			dragObject.avatar = createAvatar(e); // захватить элемент
			if (!dragObject.avatar) {
			  dragObject = {}; // аватар создать не удалось, отмена переноса
			  return; // возможно, нельзя захватить за эту часть элемента
			}

			// аватар создан успешно
			// создать вспомогательные свойства shiftX/shiftY
			var coords = getCoords(dragObject.avatar);
			dragObject.shiftX = dragObject.downX - coords.left;
			dragObject.shiftY = dragObject.downY - coords.top;

			startDrag(e); // отобразить начало переноса
		  }

		  // отобразить перенос объекта при каждом движении мыши
		  dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
		  dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

		  return false;
			
			moveAt(e);
			//console.log(getCoords(avatar));			
		}
		
		fig.onmouseup = function() {
			if (dragObject.avatar) { // если перенос идет
			    finishDrag(e);
			}

			// перенос либо не начинался, либо завершился
			// в любом случае очистим "состояние переноса" dragObject
			dragObject = {};
			
			//document.onmousemove = null;
			//fig.onmouseup = null;
			fig.style.zIndex = 2; // по окончании движения расположение под теми, что будут двигаться
		}
		
	}
	// Отключаем прилипание
	fig.ondragstart = function() {
		return false;
	};	
	
	function finishDrag(e) {
		var dropElem = findDroppable(e);

		if (!dropElem) {
		  self.onDragCancel(dragObject);
		} else {
		  self.onDragEnd(dragObject, dropElem);
		}
	}
	
	function createAvatar(e) {
		  // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
		  var avatar = dragObject.elem;
		  var old = {
			parent: avatar.parentNode,
			nextSibling: avatar.nextSibling,
			position: avatar.position || '',
			left: avatar.left || '',
			top: avatar.top || '',
			zIndex: avatar.zIndex || ''
		  };

		  // функция для отмены переноса
		  avatar.rollback = function() {
			old.parent.insertBefore(avatar, old.nextSibling);
			avatar.style.position = old.position;
			avatar.style.left = old.left;
			avatar.style.top = old.top;
			avatar.style.zIndex = old.zIndex
		  };

		  return avatar;
		}
		
		function startDrag(e) {
		  var avatar = dragObject.avatar;

		  // инициировать начало переноса
		  document.body.appendChild(avatar);
		  avatar.style.zIndex = 3;
		  avatar.style.position = 'absolute';
		}
		
		function findDroppable(event) {
			// спрячем переносимый элемент
			dragObject.avatar.hidden = true;

			// получить самый вложенный элемент под курсором мыши
			var elem = document.elementFromPoint(event.clientX, event.clientY);

			// показать переносимый элемент обратно
			dragObject.avatar.hidden = false;

			if (elem == null) {
				// такое возможно, если курсор мыши "вылетел" за границу окна
			    return null;
			}
			
			return elem.closest('.droppable');
	    }
		
		this.onDragEnd = function(dragObject, dropElem) {};
	    this.onDragCancel = function(dragObject) {};
}

function getCoords(elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}
	
/**
 * Функция завершения игры
 */
function finishTheGame() {
    game_is_running = false;
}

/**
 * Новая игра
 */
function refreshGame() {
    location.reload();
}

/**
 * Инициализация
 */
window.onload = init;