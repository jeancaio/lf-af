
var campo = $("#campo-digitacao");
var campoDicionario = $(".campo-dicionario");
var dicionario = $(".quadro-de-palavras");
var incluirPalavras = $('.botao-inserir');
var inserirNaTabela = $('.inserir-na-tabela');
var collection = [];
var removeVirgula = ",";
var Tabela = [];

campo.attr("disabled", true);

//inclui palavras no dicionario lexico quando clica no botao
incluirPalavras.on('click', function(){
    collection.push(campoDicionario.val());
    campoDicionario.val("");
    // x = campoDicionario.val().split(" ");
    dic = dicionario.text(collection);
});

//insere as letras não repetidas do dicionario na cabeça da tabela, \
//                                   chamando a função insereTabela()
inserirNaTabela.one('click', function(){
    campo.attr("disabled", false);
    campo.toggleClass("campo-desativado");
    var letra = dic.text().split("");
    caracteres = letra
    var index = $.inArray(",", caracteres);
    if (index>=0) caracteres.splice(index, 1);

    insereTabela();
    Tabela = linhas();
  	tabela_geral(Tabela);

    $('#campo-digitacao').keyup(function(e) {
      if(Tabela.length > 0){
        inicializaMarcadores(e);
      }
    });
});

//detecta o espaço para poder testa a próxima palavra
$('#campo-digitacao').keyup(function(e) {

    if(e.keyCode == 32){
        campo.val("")
        inicializaMarcadores();
    }
});



// $('.campo-digitacao').keyup(function(e){
//   if(tabela.length > 0){
//     valida_palavra(e);
//   }
// });




function inicializaMarcadores(event) {
    var primeiro = 'a'; // Para saber se o que está digitado é válido
    var ultimo = 'z'
    var palavras = $('#campo-digitacao').val(); // Pega o valor do campo

    if(campo.length == 1){
      campo.removeClass('borda-verde');
  		campo.removeClass('borda-vermelha');
  		$('#automato tr').removeClass('estado_selecionado');
  		$('#automato td').removeClass('letra_selecionada');
    }

        var digitado = campo.val();
        var frase = dic.text();
        var comparavel = frase.substr(0, digitado.length);
        var estado = 0; // Inicia a verificação pelo estado inicial
    		var letter_error = false;

        // if (jQuery.inArray(digitado, collection) > -1) {
        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }


        for (var i = 0; i < palavras.length; i++) {
      		// Verifica se o dígito está entre a - z
      		if(palavras[i].charCodeAt(0) >= primeiro.charCodeAt(0) && palavras[i].charCodeAt(0) <= ultimo.charCodeAt(0) && letter_error == false){
      			highlightState(estado, palavras[i]);
      			if(Tabela[estado][palavras[i]] != '-'){ // se o estado não for de erro, ele aceita
      				estado = Tabela[estado][palavras[i]];
      				inAccept();
      			} else { // Rejeita caso o estado seja de erro
      				inError();
      				letter_error = true;
      				// break;
      			}
      		}
      	}



}

// ***************************************************************** //


function valida_palavra(event){
	var primeiro = 'a'; // Para saber se o que está digitado é válido
	var ultimo = 'z';
	var palavras = $('#buscar').val(); // Pega o valor do campo
	if(palavras.length == 0){ // Verifica se o campo está vazio, assim ele reseta todos os efeitos na tabela
		$('#box').removeClass('acerto');
		$('#box').removeClass('erro');
		$('#automato tr').removeClass('estado_selecionado');
		$('#automato td').removeClass('letra_selecionada');
	}
	var estado = 0; // Inicia a verificação pelo estado inicial
	var letter_error = false;
	for (var i = 0; i < palavras.length; i++) {
		// Verifica se o dígito está entre a - z
		if(palavras[i].charCodeAt(0) >= primeiro.charCodeAt(0) && palavras[i].charCodeAt(0) <= ultimo.charCodeAt(0) && letter_error == false){
			highlightState(estado, palavras[i]);
			if(Tabela[estado][palavras[i]] != '-'){ // se o estado não for de erro, ele aceita
				estado = Tabela[estado][palavras[i]];
				inAccept();
			} else { // Rejeita caso o estado seja de erro
				inError();
				letter_error = true;
				// break;
			}
		}
	};
}

function inError(){
	$('#box').removeClass('acerto');
	$('#box').addClass('erro');
}
function inAccept(){
	$('#box').addClass('acerto');
	$('#box').removeClass('erro');
}

function highlightState(state, letter){
	$('#automato tr').removeClass('estado_selecionado');
	$('#automato td').removeClass('letra_selecionada');
	$('#automato .estado_' + state).addClass('estado_selecionado');
	$('#automato .caracter_' + letter).addClass('letra_selecionada');
}
