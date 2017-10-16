var tabela = [];
var campo = $(".campo-digitacao");
var campoDicionario = $(".campo-dicionario");
var dicionario = $(".quadro-de-palavras");
var incluirPalavras = $('.botao-inserir');
var inserirNaTabela = $('.inserir-na-tabela');
var collection = [];
var removeVirgula = ",";
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
    tabela = linhas();
  	tabela_geral(tabela);

    // inicializaMarcadores();

});

//detecta o espaço para poder testar a próxima palavra
campo.keyup(function(e){
    if(e.keyCode == 32){
        campo.val("")
    }
});


function inicializaMarcadores() {

    if(campo.length == 1){
      campo.removeClass('acerto');
  		campo.removeClass('erro');
  		$('#automato tr').removeClass('estado_selecionado');
  		$('#automato td').removeClass('letra_selecionada');
    }

    // campo.on("input", function(e) {
    //     var digitado = campo.val();
    //     for (var i = 0; i < collection.length; i++) {
    //       var comparavel = collection[i].substr(0, digitado.length);
    //     if ($.inArray(digitado, collection) > -1) {
    //     // if(digitado == comparavel){
    //         campo.addClass("borda-verde");
    //         campo.removeClass("borda-vermelha");
    //     } else {
    //         campo.addClass("borda-vermelha");
    //         campo.removeClass("borda-verde");
    //     }
    //   }
    //
    // });
}
campo.keyup(function(e) {
  if(tabela.length > 0){
    validacao(e);
  }
});


function validacao(){
  var a = 'a'; // Para saber se o que está digitado é válido
	var z = 'z';
  var estado = 0; // Inicia a verificação pelo estado inicial
	var letter_error = false;
  var caracter = campo.val();
  if(campo.length == 1){
    campo.removeClass('acerto');
    campo.removeClass('erro');
    $('#automato tr').removeClass('estado_selecionado');
    $('#automato td').removeClass('letra_selecionada');
  }

  for (var i = 0; i < caracter.length; i++) {
    console.log(caracter[i]);
    if(caracter[i].charCodeAt(0) >= a.charCodeAt(0) && caracter[i].charCodeAt(0) <= z.charCodeAt(0) && letter_error == false){
			highlightState(estado, caracter[i]);
      console.log(tabela[estado][caracter[i]]);
			if(tabela[estado][caracter[i]] == '-'){ // se o estado não for de erro, ele aceita
				estado = tabela[estado][caracter[i]];
				inAccept();
			} else { // Rejeita caso o estado seja de erro
				inError();
				letter_error = true;
				// break;
			}
    }
  }
}
function inError(){
	$('.campo-digitacao').removeClass('acerto');
	$('.campo-digitacao').addClass('erro');
}
function inAccept(){
	$('.campo-digitacao').addClass('acerto');
	$('.campo-digitacao').removeClass('erro');
}

function highlightState(state, letter){
	$('#automato tr').removeClass('estado_selecionado');
	$('#automato td').removeClass('letra_selecionada');
	$('#automato .estado_' + state).addClass('estado_selecionado');
	$('#automato .caracter_' + letter).addClass('letra_selecionada');
}
