var n = 0;

//cria a tabela com as letras nao repetidas do dicionario e as linhas \
//                                                      correspondentes
function insereTabela() {
    var cabecaTabela = $(".tabela-automato").find("thead");
    var corpoTabela = $(".tabela-automato").find("tbody");


    var primeiraLinha = novaPrimeiraLinha(caracteres.sort());
    cabecaTabela.append(primeiraLinha);
    for (var i = 0; i < caracteres.length; i++) {
        var linhaBody = novaLinha(linhaBody);
        corpoTabela.append(linhaBody);
    }
    percorreTabela();
}

//cria a cabeça da tabela
function novaPrimeiraLinha(caracteres){
    var primeiraLinha = $("<tr>");
    primeiraLinha.append($("<th>").text("-"));
    for (var i = 0; i < caracteres.length; i++) {
        var coluna = $("<th>").text(caracteres[i]);
        primeiraLinha.append(coluna);
    }
    return primeiraLinha;
}

//cria as linhas do corpo da tabela
function novaLinha(){
    var linhaBody = $("<tr>");
    var colunaBody;
    for (var i = 0; i < caracteres.length; i++) {
        var q = $("<td class='first'>");
        // primeiraColuna.text('q'+ $(".first").length);
    }
    linhaBody.append(q);

    for (var i = 0; i < caracteres.length; i++) {
        colunaBody = $("<td class='td-corpo'>").text('-');
        linhaBody.append(colunaBody);
    }
    return linhaBody;
}

//percorre a tabela
function percorreTabela(){
    $('table.tabela-automato').each(function(el){
        $("td.first").text('q' + n);
        $("td.td-corpo").text(caracteres)
    });

}

campo.keypress(function(e){
  tdTabela = $('.tabela-automato').find('th').text().split("");
  $('table.tabela-automato').each(function(el){
      if (e.keyCode == keyCode){
        console.log('fsas');
      }
  });


});
