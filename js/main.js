
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
    inicializaMarcadores();
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
});

//detecta o espaço para poder testa a próxima palavra
campo.keyup(function(e){
    if(e.keyCode == 32){
        campo.val("")
        inicializaMarcadores();
    }
});


function inicializaMarcadores() {

    if(campo.length == 1){
      campo.removeClass('borda-verde');
  		campo.removeClass('borda-vermelha');
  		$('#automato tr').removeClass('estado_selecionado');
  		$('#automato td').removeClass('letra_selecionada');
    }
    
    campo.on("input", function(e) {
        var digitado = campo.val();
        // var comparavel = frase.substr(0, digitado.length);

        if (jQuery.inArray(digitado, collection) > -1) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}
