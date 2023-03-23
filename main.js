const btnAdicionar = document.querySelector(".btn-success");
const btnDeletar = document.querySelector(".btn-danger")
const campoTexto = document.querySelector("#txt");
const listaTarefas = document.querySelector(".list-group");
let tarefas = [];
const recuperarTarefa = localStorage.getItem("tarefas")

 if(recuperarTarefa) {
    tarefas = JSON.parse(recuperarTarefa);
    for(let i = 0; i<tarefas.length; i++){
        const novoItem = document.createElement("li");
        novoItem.classList.add("list-group-item");
        novoItem.innerHTML= `
                <span>${tarefas[i]}</span>
                <button type="button" class="btn btn-danger btn-sm float-end ms-2 btnExcluir">Excluir</button>
                `;
        listaTarefas.appendChild(novoItem)
    }
} 


btnAdicionar.addEventListener("click", adicionarTarefa);
listaTarefas.addEventListener("click", riscarTarefa);
btnDeletar.addEventListener("click", limparTarefas);
listaTarefas.addEventListener("click", excluirTarefa);


function adicionarTarefa (){
    const novaTarefa  = campoTexto.value.trim(); //criando uma variavel que esta recebendo o valor inserido no input das tarefas e usando trim para limpar espaços em branco

    if(novaTarefa !==""){

      tarefas.push(novaTarefa); //adicionando essa variavel que acabei de criar ao array de tarefas que criei la em cima

      localStorage.setItem("tarefas", JSON.stringify(tarefas));

      const novoItem = document.createElement("li"); //aqui estou criando uma variavel que está recebendo a criação de um novo elemento do tipo LI(list item)
      novoItem.classList.add("list-group-item"); //adicionei a class "list-group-item" ao elemento LI recem criado
      novoItem.innerHTML = `
                <span>${novaTarefa}</span>
                <button type="button" class="btn btn-danger btn-sm float-end ms-2 btnExcluir">Excluir</button>
      `;//aqui eu estou inserindo um texto html no novo item, q no caso é um lI, então ao Li ser criado ele vai vir com a nova tarefa e com um botão excluir ja adicionado
      listaTarefas.appendChild(novoItem);//aqui estou adicionando dentro do lista de tarefa q é meu UL, adicionando o meu li criado chamado "novoItem"

      campoTexto.value = "";//zerando o campo value
      campoTexto.focus();//colocando o campo value no foco
    } else {
        alert("Insira uma tarefa para adicionar")//criando um alerta para quando tentarem inserir algo vazio
    }
}

function excluirTarefa(event){//criando funcão para deletar uma tarefa unica da lista
    if(event.target.classList.contains("btnExcluir")){//aqui estou dizendo o seguinte, se o evento (no caso click), se o alvo dele (onde ele foi clicado), contem a classe (btnExcluir)
      const item = event.target.parentElement; //criando uma variavel chamado item que recebe o elemento pai do alvo do click (algo como cliquei no botão e quero pegar o elemento pai do botao, aonde ele esta inserido no caso o LI)
      const itemId = Array.from(listaTarefas.children).indexOf(item); //aqui estamos criando uma variavel pra saber descobrir de certa forma qual o item q vai ser excluido, dessa forma ele pega o listaTarefas q é nosso UL e acessa os filhos dele, no nosso caso os LI dentro da UL, so que isso não é um array, então nao da pra usar o indexOf, assim usamos o arrayFrom para instanciar(criar) um array dos LI, ai usamos o indexOf(item) e passamos como parametro a variavel "item" que esta recebendo o LI do botão que clicamos. Entao criamos um array com os LI e buscamos nesse array qual LI foi clicado usando o metedo indexOF e passando o item como parametro, ele busca no array o indice desse paremetro
      tarefas.splice(itemId, 1); //removendo do array de tarefas o itemID, passando o  itemID para mostrar a partir de qual indice q é para remover e quantos indices a partir do indice inicial seria excluido, nesse caso apenas um mesmo. Necessario remover pois nesse array deve conter somente as tarefas que estão presentes na lista mesmo
      item.remove(); //aqui estamos removendo do html o item LI que esta na variavel item, assim saindo da UL

      const tarefasNoLocalStorage = JSON.parse(localStorage.getItem("tarefas")); //Criamos uma constante chamada tarefasNoLocalStorage, que recebe o valor do conteúdo da chave "tarefas" no localStorage.Usamos a função JSON.parse() para transformar o valor da chave "tarefas" (que foi armazenado como uma string) em um objeto JavaScript.
      const tarefaExcluida = tarefasNoLocalStorage.splice(itemId, 1); //Criamos uma constante chamada tarefaExcluida, que recebe o valor do elemento do array tarefasNoLocalStorage que foi removido através da função splice(). A função splice() remove um elemento do array a partir de um índice (itemId) e com um comprimento de 1. Ela também retorna um novo array contendo o elemento removido.
      localStorage.setItem("tarefas", JSON.stringify(tarefasNoLocalStorage)); //Usamos a função localStorage.setItem() para atualizar o valor da chave "tarefas" no localStorage. Usamos a função JSON.stringify() para transformar o objeto JavaScript tarefasNoLocalStorage em uma string JSON, que é o formato aceito pelo localStorage.
    }
}

function riscarTarefa(event) {//aqui estou passando como paramentro o evento que ocorreu, no caso o click
    if(event.target.tagName === "LI"){//aqui estou vendo se o elemento clicado foi uma tag li
        event.target.classList.toggle("riscada")//caso o elemento clicado for uma LI, eu uso o classList para acessar a lista do elemento LI e com o toogle eu adiciono e removo a classe (riscada) desse LI
    }
}

function limparTarefas(){
        listaTarefas.innerHTML= "";//aqui eu pegando a variavel lista de tarefas que é responsavel pelo list group e to alterando todo o html dele, atribuindo apenas algo vazio, assim apagando todo o conteudo dele, todas as tags e elementos html em geral.
        tarefas.length = 0;//aqui estou limpando o array de tarefas adicionadas, pois como feito em cima eu ja removi todo o conteudo do lista de tarefas entao no array tbm nao pode ter nada
        localStorage.clear();
}