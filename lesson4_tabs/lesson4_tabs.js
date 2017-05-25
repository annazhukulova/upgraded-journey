// Косяк: при загрузке страницы три скрытых блока "прыгают" и исчезают, что заметно
(function($) {
	$(function() {
		$('#text2').hide(); // По умолчанию прячем все вкладки кроме первой
		$('#text3').hide();
		$('#text4').hide();
		$(document).on('click', '#tab1', function(event) {				
			$('#text1').show(); 
			$('#text2').hide();
			$('#text3').hide();
			$('#text4').hide();
			$(this).toggleClass('active');
			event.preventDefault();
		});
		$(document).on('click', '#tab2', function(event) { // При нажатии на вторую вкладку
			$('#text2').show();                            // Показываем вторую вкладку
			$('#text1').hide();                            // Остальные прячем
			$('#text3').hide();                            // Аналогично для остальных вкладок
			$('#text4').hide();
			$(this).toggleClass('active');
			event.preventDefault();
		});
		$(document).on('click', '#tab3', function(event) {
			$('#text3').show();
			$('#text2').hide();
			$('#text1').hide();
			$('#text4').hide();
			$(this).toggleClass('active');
			event.preventDefault();
		});
		$(document).on('click', '#tab4', function(event) {
			$('#text4').show();
			$('#text2').hide();
			$('#text3').hide();
			$('#text1').hide();
			$(this).toggleClass('active');
			event.preventDefault();
		});
	});
})(jQuery);