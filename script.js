                              //-------------Dados Iniciais--------------//


let currentColor = 'black' //variável pegando cor atual que é a preta
let canDraw = false;//variavel pode desenhar = falso
let mouseX = 0;//variável posição do mouse x = 0
let mouseY = 0;//variável posição do mouse y = 0

let screen = document.querySelector('#tela');//seleciona o elemento Canvas
let ctx = screen.getContext('2d');//variável contexto


                              //-------------Eventos---------------//


// seleciona todas as cores, cria um loop e adiciona um evento em cada uma delas
document.querySelectorAll('.colorArea .color').forEach(item => {
   item.addEventListener('click', colorClickEvent); // quando o usuário clica na cor roda a função colorClickEvent
});

screen.addEventListener('mousedown', mouseDownEvent);//mousedown(mouse pressionado). Sempre que o mouse estiver clicado vai acionar a função mouseDownEvent
screen.addEventListener('mousemove', mouseMoveEvent);//mousemove(mouse se movendo). Sempre que o mouse estiver se movendo vai acionar a função mouseMoveEvent
screen.addEventListener('mouseup', mouseUpEvent);//mouseup(mouse não pressionado). Sempre que o mouse estiver sem clique vai acionar a função mouseUpEvent
document.querySelector('.clear').addEventListener('click', clearScreen);// seleciona a class html clear e adiciona um evento de clique executando a função clearScreen
/*Lógica para criação do desenho no Canvas:
- Quando o click do mouse estiver pressionado, ative o modo desenho.
- Quando o mouse se mover, se o modo desenho estiver ativado, desenhe.
- Quando o click do mouse não estiver pressionado, desative o modo desenho. 
*/

                              //--------------Funções--------------//

function colorClickEvent(e) {   //Função que verifica em qual cor o usuário clicou
   let color = e.target.getAttribute('data-color'); // pega o atributo data-color para selecionar a cor
   currentColor = color; // armazena a cor (color) na variável currentColor 

   document.querySelector('.color.active').classList.remove('active');//seleciona o elemento que tem a class .color e .active e remove o active.
   e.target.classList.add('active');//Adiciona a classe active no elemento que foi clicado
}
function mouseDownEvent(e){ // função click do mouse pressionado
   canDraw = true;
   mouseX = e.pageX - screen.offsetLeft;//calculo para pegar a posição do screen diminuindo em relação aos lados da página
   mouseY = e.pageY - screen.offsetTop;//calculo para pegar a posição do screen diminuindo em relação aos top da página
}
function mouseMoveEvent(e){//função mouse se movendo
   if(canDraw) {
      draw(e.pageX, e.pageY);// passa os parâmetros da posição do mouse
   }
}
function mouseUpEvent(){//função click do mouse não pressionado
   canDraw = false;
}
function draw(x,y) {//função que recebe as duas posições do mouse x e y
   let pointX = x - screen.offsetLeft;
   let pointY = y - screen.offsetTop;

   
   ctx.beginPath();
   ctx.lineWidth = 5;//grossura da linha
   ctx.lineJoin = "round";//pixel da linha arredondado
   ctx.moveTo(mouseX, mouseY);//mover o cursor
   ctx.lineTo(pointX, pointY);//desenha a linha
   ctx.closePath();//fecha o processo de desenhar
   ctx.strokeStyle = currentColor;//cor da linha
   ctx.stroke();//fecha o processo de desenhar

   mouseX = pointX;
   mouseY = pointY;
}
function clearScreen(){
   ctx.setTransform(1, 0, 0, 1, 0, 0);//zera o cursor e o processo de desenhar isso é uma matrix 2d
   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);//limpa o contexto canvas até o fim da largura e até o fim da altura do canvas
}