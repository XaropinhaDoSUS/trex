var caneca;

// 200 | 300 | 400 ml

function desligaCafeteira(tempo)
{
    console.log('Tempo para desligar: ' + tempo + ' segundos');
}

caneca = 300;

switch (caneca) {
    case 100:
        desligaCafeteira(5);
        break;
    case 200:
        desligaCafeteira(10);
        break;
    case 300:
        desligaCafeteira(15);
        break;
    default:
        desligaCafeteira(2);
        break;
}
