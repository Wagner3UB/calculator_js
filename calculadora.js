'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
//colocando o * antes do = fazemos com que o queryselector pegue todos os ids que tenham a palavra tecla
const operadores = document.querySelectorAll('[id*=operador]');
let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined;

const calcular = () =>{
  if(operacaoPendente()){
    const numeroAtual = parseFloat(display.textContent);
    novoNumero = true; //isso vai servir para limpar o display para exibir o numero atual
    const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
    atualizarDisplay(resultado);
    /*
    este calculo abaixo é sem o uso de eval, que é uma função nativa JS mas que possue falhas de segurança
    if(operador == '+'){
      atualizarDisplay(numeroAnterior + numeroAtual)
    }else if(operador == '-'){
      atualizarDisplay(numeroAnterior - numeroAtual)
    }else if(operador == '*'){
      atualizarDisplay(numeroAnterior * numeroAtual)
    }else if(operador == '/'){
      atualizarDisplay(numeroAnterior / numeroAtual)
    }
    */
  }
}
const atualizarDisplay = (texto) => {
  if(novoNumero){
    display.textContent = texto;
    novoNumero = false;
  }else{
    display.textContent += texto;
  }
}
const inserirNumero = (evento) => {
  atualizarDisplay(evento.target.textContent);
}
numeros.forEach(numero => {
  numero.addEventListener('click', inserirNumero)
});
const selecionarOperador = (evento) => {
  //este if evita que ao clicar em um operador antes de clicar em um numero ele armazene o display na memoria
  if(!novoNumero){
    calcular();
    novoNumero = true;
    operador = evento.target.textContent;
    //Toda vez que for clicado em um operador, este operador sera armazenado aqui
    numeroAnterior = parseFloat(display.textContent);
    //Toda vez que for clicado em um operador o numero do display sera armazenado aqui
  }
}
operadores.forEach(operador => {
  operador.addEventListener('click', selecionarOperador)
});

//resolvendo o problema da tecla igual continuar operaçoes
const ativarIgual = () =>{
  calcular();
  operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);

//limpando o display
const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

//limpar calculo
const limparCalculo = () => {
  limparDisplay();
  operador = undefined;
  novoNumero = true;
  numeroAnterior = undefined;
};
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

//Apagar o ultimo digito adicionado
const removerUltimoNumero = () => {
  display.textContent = display.textContent.slice(0,-1);
}
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

//invertendo o sinal da operaçao
const inverterSinal = () => {
  novoNumero = true;
  atualizarDisplay(display.textContent * -1)
};
document.getElementById('inverter').addEventListener('click', inverterSinal);

//Colocar numero decimal
const existeDecimal = () => display.textContent.indexOf(',') != -1; // testa para saber se existe , na string
console.log(existeDecimal);
const existeValor = () => display.textContent.length > 0; //testa para saber se tem um numero baseado no tamanho da string

const inserirDecimal = () => {
  if (!existeDecimal()){
    if(existeValor()){
      atualizarDisplay(',');
    }else{
      atualizarDisplay('0,');
    }
  }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal);