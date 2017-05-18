// Глобальные переменные:
var FIELD_SIZE_X = 8;
var FIELD_SIZE_Y = 8;
var previous; // переменная для фигуры, которой ходим
var next;     // переменная для фигуры/клетки, куда ходим
var game_is_running = false; // идёт ли игра
var white_play = false;      // ожидание хода белых
var black_play = false;      // ожидание хода чёрных

/**
 * Функция инициализации
 */
function init() {
    prepareGameField(); // Генерация поля
	putFigures();       // Расстановка фигур
	
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
				cell.className = 'cell-white cell-' + i + '-' + j;

				row.appendChild(cell); // Добавление ячейки
				cell.addEventListener('click', cellClick); // Подключаем событие нажатия
				cell.addEventListener('click', secondClick); // Подключаем событие второго нажатия
			
			} else {
				// Создание чёрной ячейки
				var cell = document.createElement('td');
				cell.className = 'cell-black cell-' + i + '-' + j;

				row.appendChild(cell); // Добавление ячейки	
				cell.addEventListener('click', cellClick); // Подключаем событие нажатия
				cell.addEventListener('click', secondClick); // Подключаем событие второго нажатия
			}
			
            
        }
        game_table.appendChild(row); // Добавление строки
    }

    document.getElementById('chess-field').appendChild(game_table); // Добавление таблицы
	
	document.getElementById('play-now').innerHTML = 'Ход белых'; // Добавление начального текста в поле
}

/**
 * Функция расстановки фигур
 */
function putFigures() {
	for (var i = 0; i < FIELD_SIZE_Y; i++) {
		for (var j = 0; j < FIELD_SIZE_X; j++) {
			var className = 'cell-' + j + '-' + i;
			var cell = document.getElementsByClassName(className)[0];

			// По координатам ячеек в таблице расставляются фигуры
			switch (className) {
				// Черные
				case 'cell-0-0': {
					cell.style.backgroundImage = 'url(images/rook_black.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-0-1': {
					cell.style.backgroundImage = 'url(images/horse_black.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-0-2': {
					cell.style.backgroundImage = 'url(images/elefant_black.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-0-3': {
					cell.style.backgroundImage = 'url(images/qween_black.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-0-4': {
					cell.style.backgroundImage = 'url(images/king_black.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-0-5': {
					cell.style.backgroundImage = 'url(images/elefant_black.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-0-6': {
					cell.style.backgroundImage = 'url(images/horse_black.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-0-7': {
					cell.style.backgroundImage = 'url(images/rook_black.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-1-0': {
					cell.style.backgroundImage = 'url(images/pawn_black.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-1-1': {
					cell.style.backgroundImage = 'url(images/pawn_black.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-1-2': {
					cell.style.backgroundImage = 'url(images/pawn_black.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-1-3': {
					cell.style.backgroundImage = 'url(images/pawn_black.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-1-4': {
					cell.style.backgroundImage = 'url(images/pawn_black.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-1-5': {
					cell.style.backgroundImage = 'url(images/pawn_black.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-1-6': {
					cell.style.backgroundImage = 'url(images/pawn_black.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-1-7': {
					cell.style.backgroundImage = 'url(images/pawn_black.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				
				// Белые
				case 'cell-7-0': {
					cell.style.backgroundImage = 'url(images/rook_white.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-7-1': {
					cell.style.backgroundImage = 'url(images/horse_white.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-7-2': {
					cell.style.backgroundImage = 'url(images/elefant_white.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-7-3': {
					cell.style.backgroundImage = 'url(images/qween_white.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-7-4': {
					cell.style.backgroundImage = 'url(images/king_white.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-7-5': {
					cell.style.backgroundImage = 'url(images/elefant_white.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-7-6': {
					cell.style.backgroundImage = 'url(images/horse_white.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-7-7': {
					cell.style.backgroundImage = 'url(images/rook_white.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-6-0': {
					cell.style.backgroundImage = 'url(images/pawn_white.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-6-1': {
					cell.style.backgroundImage = 'url(images/pawn_white.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-6-2': {
					cell.style.backgroundImage = 'url(images/pawn_white.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-6-3': {
					cell.style.backgroundImage = 'url(images/pawn_white.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-6-4': {
					cell.style.backgroundImage = 'url(images/pawn_white.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-6-5': {
					cell.style.backgroundImage = 'url(images/pawn_white.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-6-6': {
					cell.style.backgroundImage = 'url(images/pawn_white.png)';
					cell.style.backgroundSize = 'contain';
					break;
				}
				case 'cell-6-7': {
					cell.style.backgroundImage = 'url(images/pawn_white.png)';
					cell.style.backgroundSize = 'contain';
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
    game_is_running = true;
	white_play = true;
}

/**
 * Первый клик
 */
function cellClick() {	
	if (game_is_running == true) {
		if (this.style.backgroundImage != '') {
			previous = this;
			//previous.style.boxShadow = 'inset 0 0 20px #301901';
			secondClick.call(this);
		}
	}
}

/**
 * Второй клик
 */
function secondClick() {
	// Если ход белых, выбираем белую фигуру для хода
	if (white_play == true) {
		switch (previous.style.backgroundImage) {

			// Белая пешка
			case 'url("images/pawn_white.png")': {
				if (this.style.backgroundImage == '') { // Если клетка пустая
					// и пешка стоит на начальной позиции, можем ходить или на одну, или на две клетки вперёд
					if (previous.className == 'cell-white cell-6-0' || previous.className == 'cell-black cell-6-1' ||
						previous.className == 'cell-white cell-6-2' || previous.className == 'cell-black cell-6-3' ||
						previous.className == 'cell-white cell-6-4' || previous.className == 'cell-black cell-6-5' ||
						previous.className == 'cell-white cell-6-6' || previous.className == 'cell-black cell-6-7') {
						var j = previous.className.slice(-1); // Взять последний символ строки
						if (this.className == 'cell-white cell-4-' + j || this.className == 'cell-white cell-5-' + j ||
							this.className == 'cell-black cell-4-' + j || this.className == 'cell-black cell-5-' + j) {
							next = this;
							next.style.backgroundImage = previous.style.backgroundImage;
							next.style.backgroundSize = 'contain';
							previous.style.boxShadow = '';
							previous.style.backgroundImage = '';
							white_play = false;
							black_play = true;
							document.getElementById('play-now').innerHTML = 'Ход черных';
						}
					// если пешка стоит не на начальной позиции, можем ходить на одну клетку вперёд
					} else if (previous.className != 'cell-white cell-6-0' && previous.className != 'cell-black cell-6-1' &&
							   previous.className != 'cell-white cell-6-2' && previous.className != 'cell-black cell-6-3' &&
							   previous.className != 'cell-white cell-6-4' && previous.className != 'cell-black cell-6-5' &&
							   previous.className != 'cell-white cell-6-6' && previous.className != 'cell-black cell-6-7') {
						var j = previous.className.slice(-1); // Взять последний символ строки
						var i = previous.className.slice(-3); // Взять три последних символа строки
						i = i.charAt(0); // Взять первый символ строки
						i = +i; // Приввести к числу
						var istr = String(i-1); // Отнять 1 и привести к строке
						if (this.className == 'cell-white cell-' + istr + '-' + j ||
							this.className == 'cell-black cell-' + istr + '-' + j) {
							next = this;
							next.style.backgroundImage = previous.style.backgroundImage;
							next.style.backgroundSize = 'contain';
							previous.style.boxShadow = '';
							previous.style.backgroundImage = '';
							white_play = false;
							black_play = true;
							document.getElementById('play-now').innerHTML = 'Ход черных';
						}
					}
					// если следующая клетка - чёрная фигура, можем есть по диагонали
				} else if (this.style.backgroundImage == 'url("images/pawn_black.png")' ||
						this.style.backgroundImage == 'url("images/rook_black.png")' ||
						this.style.backgroundImage == 'url("images/horse_black.png")' ||
						this.style.backgroundImage == 'url("images/elefant_black.png")' ||
						this.style.backgroundImage == 'url("images/qween_black.png")' ||
						this.style.backgroundImage == 'url("images/king_black.png")') {
					var j = previous.className.slice(-1); // Взять последний символ строки
					j = +j;
					var jless = String(j-1);
					var jmore = String(j+1);
					console.log(j);
					var i = previous.className.slice(-3); // Взять три последних символа строки
					i = i.charAt(0); // Взять первый символ строки
					i = +i;
					var istr = String(i-1);
					console.log('cell-white cell-' + istr + '-' + jless);
					if (this.className == 'cell-white cell-' + istr + '-' + jless ||
						this.className == 'cell-black cell-' + istr + '-' + jless ||
						this.className == 'cell-white cell-' + istr + '-' + jmore ||
						this.className == 'cell-black cell-' + istr + '-' + jmore) {
						next = this;
						next.style.backgroundImage = previous.style.backgroundImage;
						next.style.backgroundSize = 'contain';
						previous.style.boxShadow = '';
						previous.style.backgroundImage = '';
						white_play = false;
						black_play = true;
						document.getElementById('play-now').innerHTML = 'Ход черных';
					}
				} else {
					//previous.style.boxShadow = '';
					previous = this;
				}
				break;
			}

			// Белая ладья
			case 'url("images/rook_white.png")': {
				if (this.style.backgroundImage == '') {
					next = this;
					next.style.backgroundImage = previous.style.backgroundImage;
					next.style.backgroundSize = 'contain';
					previous.style.boxShadow = '';
					previous.style.backgroundImage = '';
					white_play = false;
					black_play = true;
					document.getElementById('play-now').innerHTML = 'Ход черных';
				} else if (this.style.backgroundImage != '') {
					//previous.style.boxShadow = '';
					previous = this;
				}
				break;
			}

			// Белый конь
			case 'url("images/horse_white.png")': {
				if (this.style.backgroundImage == '') {
					next = this;
					next.style.backgroundImage = previous.style.backgroundImage;
					next.style.backgroundSize = 'contain';
					previous.style.boxShadow = '';
					previous.style.backgroundImage = '';
					white_play = false;
					black_play = true;
					document.getElementById('play-now').innerHTML = 'Ход черных';
				} else if (this.style.backgroundImage != '') {
					//previous.style.boxShadow = '';
					previous = this;
				}
				break;
			}

			// Белый слон
			case 'url("images/elefant_white.png")': {
				if (this.style.backgroundImage == '') {
					next = this;
					next.style.backgroundImage = previous.style.backgroundImage;
					next.style.backgroundSize = 'contain';
					previous.style.boxShadow = '';
					previous.style.backgroundImage = '';
					white_play = false;
					black_play = true;
					document.getElementById('play-now').innerHTML = 'Ход черных';
				} else if (this.style.backgroundImage != '') {
					//previous.style.boxShadow = '';
					previous = this;
				}
				break;
			}

			// Белый ферзь
			case 'url("images/qween_white.png")': {
				if (this.style.backgroundImage == '') {
					next = this;
					next.style.backgroundImage = previous.style.backgroundImage;
					next.style.backgroundSize = 'contain';
					previous.style.boxShadow = '';
					previous.style.backgroundImage = '';
					white_play = false;
					black_play = true;
					document.getElementById('play-now').innerHTML = 'Ход черных';
				} else if (this.style.backgroundImage != '') {
					//previous.style.boxShadow = '';
					previous = this;
				}
				break;
			}

			// Белый король
			case 'url("images/king_white.png")': {
				if (this.style.backgroundImage == '') {
					next = this;
					next.style.backgroundImage = previous.style.backgroundImage;
					next.style.backgroundSize = 'contain';
					previous.style.boxShadow = '';
					previous.style.backgroundImage = '';
					white_play = false;
					black_play = true;
					document.getElementById('play-now').innerHTML = 'Ход черных';
				} else if (this.style.backgroundImage != '') {
					//previous.style.boxShadow = '';
					previous = this;
				}
				break;
			}
		}
	}
	// Если ход чёрных
	if (black_play == true) {
		switch (previous.style.backgroundImage) {

			// Чёрная пешка
			case 'url("images/pawn_black.png")': {
				if (this.style.backgroundImage == '') {
					next = this;
					next.style.backgroundImage = previous.style.backgroundImage;
					next.style.backgroundSize = 'contain';
					previous.style.boxShadow = '';
					previous.style.backgroundImage = '';
					black_play = false;
					white_play = true;
					document.getElementById('play-now').innerHTML = 'Ход белых';
				} else if (this.style.backgroundImage != '') {
					//previous.style.boxShadow = '';
					previous = this;
				}
				break;
			}

			// Черная ладья
			case 'url("images/rook_black.png")': {
				if (this.style.backgroundImage == '') {
					next = this;
					next.style.backgroundImage = previous.style.backgroundImage;
					next.style.backgroundSize = 'contain';
					previous.style.boxShadow = '';
					previous.style.backgroundImage = '';
					black_play = false;
					white_play = true;
					document.getElementById('play-now').innerHTML = 'Ход белых';
				} else if (this.style.backgroundImage != '') {
					//previous.style.boxShadow = '';
					previous = this;
				}
				break;
			}

			// Черный конь
			case 'url("images/horse_black.png")': {
				if (this.style.backgroundImage == '') {
					next = this;
					next.style.backgroundImage = previous.style.backgroundImage;
					next.style.backgroundSize = 'contain';
					previous.style.boxShadow = '';
					previous.style.backgroundImage = '';
					black_play = false;
					white_play = true;
					document.getElementById('play-now').innerHTML = 'Ход белых';
				} else if (this.style.backgroundImage != '') {
					//previous.style.boxShadow = '';
					previous = this;
				}
				break;
			}

			// Черный слон
			case 'url("images/elefant_black.png")': {
				if (this.style.backgroundImage == '') {
					next = this;
					next.style.backgroundImage = previous.style.backgroundImage;
					next.style.backgroundSize = 'contain';
					previous.style.boxShadow = '';
					previous.style.backgroundImage = '';
					black_play = false;
					white_play = true;
					document.getElementById('play-now').innerHTML = 'Ход белых';
				} else if (this.style.backgroundImage != '') {
					//previous.style.boxShadow = '';
					previous = this;
				}
				break;
			}

			// Чёрный ферзь
			case 'url("images/qween_black.png")': {
				if (this.style.backgroundImage == '') {
					next = this;
					next.style.backgroundImage = previous.style.backgroundImage;
					next.style.backgroundSize = 'contain';
					previous.style.boxShadow = '';
					previous.style.backgroundImage = '';
					black_play = false;
					white_play = true;
					document.getElementById('play-now').innerHTML = 'Ход белых';
				} else if (this.style.backgroundImage != '') {
					//previous.style.boxShadow = '';
					previous = this;
				}
				break;
			}

			// Черный король
			case 'url("images/king_black.png")': {
				if (this.style.backgroundImage == '') {
					next = this;
					next.style.backgroundImage = previous.style.backgroundImage;
					next.style.backgroundSize = 'contain';
					previous.style.boxShadow = '';
					previous.style.backgroundImage = '';
					black_play = false;
					white_play = true;
					document.getElementById('play-now').innerHTML = 'Ход белых';
				} else if (this.style.backgroundImage != '') {
					//previous.style.boxShadow = '';
					previous = this;
				}
				break;
			}
		}
	}
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