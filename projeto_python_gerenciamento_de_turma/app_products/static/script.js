let nomeTurma = document.getElementById("nomeTurma")
let nomeCurso = document.getElementById("nomeCurso")
let nomeProfessor = document.getElementById("nomeProfessor")
let dataInicio = document.getElementById("dataInicio")
let dataFim = document.getElementById("dataFim")
let qtdAlunos = document.getElementById("qtdAlunos");
let slAlunos = document.getElementById("slAlunos");
let btnAdicionarAluno = document.getElementById("btnAdicionarAluno"); // Botão para adicionar alunos ao editar
let formTurma = document.getElementById("formTurma")

let idTurmaParaEditar = null;

function exibirQuantidadeAlunosParaCriar() {
    slAlunos.innerHTML = "";
    for (let i = 0; i < qtdAlunos.value; i++) {
        let div = document.createElement("div");
        div.classList.add("form-group-line");
        div.innerHTML = `
                <input id="in_aluno_nome_${i}" style="flex: 1;" type="text" placeholder="Nome do Aluno" required>
                <input id="in_aluno_idade_${i}" style="flex: 0 0 25%;" type="number" placeholder="Idade" required>
        `;
        slAlunos.appendChild(div);
    }
}

function adicionarAlunoAoEditar(){
    let nome = prompt("Digite o nome do aluno");
    let idade = prompt("Digite a idade do aluno");

    let dados = {
        "turma": idTurmaParaEditar,
        "nome": nome,
        "idade": idade
    };

    // Logica para adicionar o aluno na API

    let idAluno = 0; // Trocar pelo ID da API

    let div = document.createElement("div");
    div.classList.add("form-group-line");
    div.id = `aluno_${idAluno}`;
    div.innerHTML = `
            <input id="in_aluno_nome_${idAluno}" style="flex: 1;" type="text" placeholder="Nome do Aluno" value="${nome}" required>
            <input id="in_aluno_idade_${idAluno}" style="flex: 0 0 25%;" type="number" placeholder="Idade" value="${idade}" required>
            <button class="btn danger" style="flex: 0 0 15%;" type="button" onclick="removerAluno(${idAluno})">Remover</button>
    `;
    slAlunos.appendChild(div);

    qtdAlunos.value = parseInt(qtdAlunos.value) + 1;
}

function prencherDadosParaEditar(curso, turma, professor, dataInicioEditar, dataFimEditar, alunos) {
    nomeCurso.value = curso;
    nomeTurma.value = turma;
    nomeProfessor.value = professor;
    dataInicio.value = dataInicioEditar;
    dataFim.value = dataFimEditar;
    qtdAlunos.value = alunos.length;

    btnAdicionarAluno.hidden = false;
    btnAdicionarAlunoCadastro.disabled = true;
    qtdAlunos.disabled = true;
    
    slAlunos.innerHTML = "";
    for (let i = 0; i < qtdAlunos.value; i++) {
        let div = document.createElement("div");
        div.classList.add("form-group-line");
        div.id = `aluno_${alunos[i].id}`;
        div.innerHTML = `
                <input id="in_aluno_nome_${alunos[i].id}" style="flex: 1;" type="text" placeholder="Nome do Aluno" value="${alunos[i].nome}" required>
                <input id="in_aluno_idade_${alunos[i].id}" style="flex: 0 0 25%;" type="number" placeholder="Idade" value="${alunos[i].idade}" required>
                <button class="btn danger" style="flex: 0 0 15%;" type="button" onclick="removerAluno(${alunos[i].id})">Remover</button>
        `;
        slAlunos.appendChild(div);
    }
}

function obtemDadosAlunosParaCriarEditar() {
    let alunos = [];
    for (let i = 0; i < qtdAlunos.value; i++) {
        let aluno = {
            "nome": document.getElementById(`in_aluno_nome_${i}`).value,
            "idade": document.getElementById(`in_aluno_idade_${i}`).value,
        };
        alunos.push(aluno);
    }
    return alunos;
}

function removerAluno(id_aluno) {
    // Implemente a lógica para remover o aluno

    element = document.getElementById(`aluno_${id_aluno}`);
    element.remove();

    qtdAlunos.value = parseInt(qtdAlunos.value) - 1;

    console.log(`Removendo aluno com ID: ${id_aluno}`); // Remover depois esse console, utilize para testes
    
}

function removerTurma(id_turma) {
    // Utilize o confirm antes de remover a turma
    // Implemente a lógica para remover a turma

    console.log(`Removendo turma com ID: ${id_turma}`); // Remover depois esse console, utilize para testes
}

function editarTurma(id_turma) {
    // Implemente a lógica para editar a turma

    console.log(`Editando turma com ID: ${id_turma}`); // Remover depois esse console, utilize para testes
}

function salvarTurma(event) {
    event.preventDefault();
    // Implemente a lógica para criar a turma
    
    let alunos = obtemDadosAlunosParaCriarEditar();
    
    if (idTurmaParaEditar == null) {
        // Implemente a lógica para criar a turma
    } else {
        // Implemente a lógica para editar a turma
    }

    console.log(alunos); // Remover depois esse console, utilize para testes
}


// Eventos
formTurma.addEventListener("submit", salvarTurma);


exibirQuantidadeAlunosParaCriar();

prencherDadosParaEditar("Curso", "Turma", "Professor", "2023-01-01", "2023-12-31", [{id:1, nome: "Aluno 1", idade: 20},{id:2, nome: "Aluno 1", idade: 20}]); //Dados de testes