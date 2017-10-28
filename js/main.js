var campo = $("#campo-digitacao");
var campoDicionario = $(".campo-dicionario");
var dicionario = $(".quadro-de-palavras");
var incluirPalavras = $('.botao-inserir');
var inserirNaTabela = $('.inserir-na-tabela');
var collection = [];
var Tabela = [];
campo.attr("disabled", true);

/*
 * inclui palavras no dicionario lexico quando clica no botao
 *
 */
incluirPalavras.on('click', function(){
  collection.push(campoDicionario.val());
  campoDicionario.val("");
  // x = campoDicionario.val().split(" ");
  dic = dicionario.text(collection);
});


/*
 *insere as letras não repetidas do dicionario na cabeça da tabela, \
 *                                   chamando a função insereTabela()
 */

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

/*
 * detecta o espaço para poder testa a próxima palavra e adiciona a \
 *                                 palavra a lista de erros e acertos
 *
 */
$('#campo-digitacao').keyup(function(e) {
  var digitado = campo.val().replace(/( )+/g, '');

  if(e.keyCode == 32){
    e.preventDefault();
    if (jQuery.inArray(digitado, collection) > -1) {
      console.log('acerto');
      $(".acertos").append(campo.val());
    } else {
      $(".erros").append(campo.val());
    }
      campo.val("")
      inicializaMarcadores();
  }
});

/*
 * validaçoes da tabela
 *
 */
function inicializaMarcadores(event) {
  var a = 'a';
  var z = 'z'
  var campoEscrito = $('#campo-digitacao').val();

  if(campo.length == 1){
  	$('#automato tr').removeClass('estado_selecionado');
  	$('#automato td').removeClass('letra_selecionada');
  }

  var digitado = campo.val();
  var estado = 0;
  var errado = false;

  if (jQuery.inArray(digitado, collection) > -1) {
      campo.addClass("borda-verde");
  } else {
      campo.removeClass("borda-verde");
  }
  for (var i = 0; i < campoEscrito.length; i++) {
		if(campoEscrito && errado == false){
			marcaTabela(estado, campoEscrito[i]);
			if(Tabela[estado][campoEscrito[i]] != '-'){
				estado = Tabela[estado][campoEscrito[i]];
			} else {
				errado = true;
			}
		}
	}
}

function marcaTabela(linha, coluna){
	$('#automato tr').removeClass('estado_selecionado');
	$('#automato td').removeClass('letra_selecionada');
	$('#automato .estado_' + linha).addClass('estado_selecionado');
	$('#automato .caracter_' + coluna).addClass('letra_selecionada');
}
