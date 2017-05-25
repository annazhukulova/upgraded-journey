/*Проверка строки на "палиндром" - читается ли она слева направо так же, как и справа налево*/

function isPalindrome(s) {
	var i = 0; 
	s = s.toLowerCase();        // приводим к нижнему регистру
	s = s.replace(/\s|,/g, ''); // убираем точки и пробелы, можно добавить "уборку" точек и пр.	
	while (s[i] == s[s.length-1-i] && i < s.length) 
		{i++;}	            // увеличиваем итератор, если соотв. эл-ты совпадают
	return(i == s.length);      // 117 символов, не считая пробелы для читабельности кода
}
 
console.log(isPalindrome("level"));                  // true
console.log(isPalindrome("levels"));                 // false
console.log(isPalindrome("A car, a man, a maraca")); // true
