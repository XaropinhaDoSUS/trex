// Tipos de variaveis
// var string = "texto" ou 'texto'
// var numeric = 12 ou 12.5 (numérico)
// var array = ['vetor', 'matriz', 12] (numeros, textos, etc)
// var object = {}

var aluno, aluno2;

function setup()
{
    // criando uma variavel do tipo objeto (object)
    aluno = {
        altura: 1.65,
        idade: 15,
        nome: "Geovana"
    }

    aluno2 = {
        altura: 1.63,
        idade: 31,
        nome: "Andressa"
    }

    console.log(aluno.nome);
    console.log(aluno2.nome);

    console.log(aluno.idade);
}
