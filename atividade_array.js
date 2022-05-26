var notas = [10, 5, 8, 6, 9, 6, 5, 4, 6]; // vetor
var soma = 0;
var media;
var qtd_valores;

function setup()
{
    qtd_valores = notas.length;

    for (let i = 0; i < qtd_valores; i = i + 1) {
        soma = soma + notas[i];
    }

    media = soma / qtd_valores;
    console.log(media);
}



