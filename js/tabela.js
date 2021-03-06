// var collection = [];
var estados = [[]];
var geral = 0;

function linhas(){
  var estados_i = [];
  var a = 'a';
  var z = 'z';
	for (var i = 0; i < estados.length; i++) {
		var aux = [];
		aux['estado'] = i;
		for (var j = a.charCodeAt(0); j <= z.charCodeAt(0); j++) {
			var caracter = String.fromCharCode(j);
			if(typeof estados[i][caracter] === 'undefined'){
				aux[caracter] = '-'
			} else {
				aux[caracter] = estados[i][caracter]
			}
		}
		if(typeof estados[i]['final'] !== 'undefined'){
			aux['final'] = true;
		}
		estados_i.push(aux);
	}
	return estados_i;
}

function insereTabela() {
  for (var i = 0; i < collection.length; i++) {

		var estado_atual = 0;
		var palavra_i = collection[i];
		for(var j = 0; j < palavra_i.length; j++){
			if(typeof estados[estado_atual][palavra_i[j]] === 'undefined'){
				var proximo_estado = geral + 1;
				estados[estado_atual][palavra_i[j]] = proximo_estado;
				estados[proximo_estado] = [];
				geral = estado_atual = proximo_estado;
			} else {
				estado_atual = estados[estado_atual][palavra_i[j]];
			}

			if(j == palavra_i.length - 1){
				estados[estado_atual]['final'] = true;
			}
		};
	};
}

function tabela_geral(estados_i){
  tabela = $('#automato');
	tabela.html('');
	var tr = $("<tr class='cabecalho'>");
	var th = $("<th>");
	th.html('-');
	tr.append(th);
	var a = 'a';
	var z = 'z';
	for (var j = a.charCodeAt(0); j <= z.charCodeAt(0); j++) {
		var th = $("<th>");
		th.html(String.fromCharCode(j));
		tr.append(th);
	}
	tabela.append(tr);

	// Iteração
	for(var i = 0; i < estados_i.length; i++){
		var tr = $("<tr class='trestado'>");
		var td = $("<td>");
		if(estados_i[i]['final']){
			td.html('q' + estados_i[i]['estado'] + '*');
		} else {
			td.html('q' + estados_i[i]['estado']);
		}
		tr.append(td);
		tr.addClass('estado_'+estados_i[i]['estado']);
		var a = 'a';
		var z = 'z';
		for (var j = a.charCodeAt(0); j <= z.charCodeAt(0); j++) {
			var caracter = String.fromCharCode(j);
			var td = $("<td>");
			td.addClass('caracter_'+caracter);
			if(estados_i[i][caracter] != '-'){
				td.html('q' + estados_i[i][caracter]);
			}
			tr.append(td);
		}
		tabela.append(tr);
	}
}
