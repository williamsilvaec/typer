function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "William";
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);

    $('.placar').slideDown(500);

    scrollPlacar();
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function scrollPlacar() {
    let posicaoPlacar = $('.placar').offset().top;

    $('body').animate({scrollTop: posicaoPlacar + 'px'}, 1000);
}

function removeLinha() {

    event.preventDefault();

    var linha = $(this).parent().parent();

    linha.fadeOut(1000);

    setTimeout(() => linha.remove(), 1000);
}

$('#botao-placar').click(mostraPlacar);

function mostraPlacar() {
    $('.placar').stop().slideToggle(600);
    scrollPlacar();
}

function atualizaPlacar() {

    $.get('http://localhost:3000/placar', function (data) {

        // data.forEach(resposta => {
        //     var linha = novaLinha(resposta.usuario, resposta.pontos);
        //     linha.find('.botao-remover').click(removeLinha);
        //
        //     $('tbody').append(linha);
        // });
        $.each(data, function () {
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find('.botao-remover').click(removeLinha);
            $('tbody').append(linha);
        });

    });
}
