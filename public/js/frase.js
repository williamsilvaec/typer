/**
 * Created by willi on 20/05/2017.
 */

$('#botao-frase').click(fraseAleatoria);
$('#botao-frase-id').click(buscaFrase);
$('#botao-sync').click(sincronizaPlacar);

function fraseAleatoria() {

    $('#spinner').toggle();

    $.get('http://localhost:3001/frases', trocaFraseAleatoria).fail(() => {

        $('#erro').toggle();
        setTimeout(() => $('#erro').toggle(), 2000);

    }).always(() => $('#spinner').toggle());
}

function trocaFraseAleatoria(data) {

    let frase = $('.frase');
    let indiceAleatorio = Math.floor(Math.random() * 9);
    let fraseAleatoria = data[indiceAleatorio].texto;

    frase.text(fraseAleatoria);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[indiceAleatorio].tempo);
}

function buscaFrase() {
    $('#spinner').toggle();
    let fraseId = $('#frase-id').val();

    let dados = {id : fraseId};

    $.get('http://localhost:3001/frases', dados, trocaFrase)
    .fail(() => {
        $('#erro').toggle();
        setTimeout(() => $('#erro'), 2000)
    }).always(() => $('#spinner').toggle())

}

function trocaFrase(data) {
    let frase = $('.frase');
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}

function sincronizaPlacar() {

    var placar = [];
    var linhas = $('tbody>tr');


    linhas.each(function () {
        var usuario = $(this).find('td:nth-child(1)').text();
        var palavras = $(this).find("td:nth-child(2)").text();
        placar.push({usuario: usuario, pontos:palavras});
    });

    var dados = {placar: placar};
    $.post('http://localhost:3001/placar', dados, function () {
       console.log('deu certo');
    });
}



