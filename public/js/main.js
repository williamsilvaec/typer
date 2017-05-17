
var campo = $('.campo-digitacao');
var tempoInicial = $('#tempo-digitacao').text();

$(function(){
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	$('#botao-reiniciar').click(reiniciaJogo);
})

function inicializaContadores() {
	campo.on('input', function() {
		var conteudo = campo.val();
		
		var qtdePalavras = conteudo.split(/\S+/).length - 1;
		$('#contador-palavras').text(qtdePalavras);
		
		var qtdeCaracteres = conteudo.length;
		$('#contador-caracteres').text(qtdeCaracteres);
	});
	
}

function inicializaCronometro() {
	
	var tempoRestante = $('#tempo-digitacao').text();
	
	campo.one('focus', function() {

		$('#botao-reiniciar').attr('disabled', true);

		var cronometroId = setInterval(function(){
			tempoRestante--;
			$('#tempo-digitacao').text(tempoRestante);
			if (tempoRestante < 1) {
				campo.attr('disabled', true);
				$('#botao-reiniciar').attr('disabled', false);
				clearInterval(cronometroId);
			}
		}, 1000);
	});	
}

function atualizaTamanhoFrase() {
	var frase = $('.frase').text();
	var numeroPalavras = frase.split(' ').length;
	var tamanhoFrase = $('#tamanho-frase');
	tamanhoFrase.text(numeroPalavras);
}

function reiniciaJogo() {
	campo.attr('disabled', false);
	campo.val('');
	$('#contador-palavras').text('0');
	$('#contador-caracteres').text('0');
	$('#tempo-digitacao').text(tempoInicial);
	inicializaCronometro();
}