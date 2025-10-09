let nomeTurma = document.getElementById("nomeTurma")
let nomeCurso = document.getElementById("nomeCurso")
let nomeProfessor = document.getElementById("nomeProfessor")
let dataInicio = document.getElementById("dataInicio")
let dataFim = document.getElementById("dataFim")
let qtdAlunos = document.getElementById("qtdAlunos");
let slAlunos = document.getElementById("slAlunos");
let btnAdicionarAluno = document.getElementById("btnAdicionarAluno"); // Botão para adicionar alunos ao editar
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

// ============================================
// ATIVIDADE 4: REMOÇÃO DE TURMAS E ALUNOS
// ============================================
async function removerAluno(id_aluno) {
    if (!confirm('Tem certeza que deseja remover este aluno?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/alunos/${id_aluno}/`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Erro ao remover aluno');
        }
        
        const element = document.getElementById(`aluno_${id_aluno}`);
        element.remove();
        
        qtdAlunos.value = parseInt(qtdAlunos.value) - 1;
        
        alert('Aluno removido com sucesso!');
        
    } catch (error) {
        console.error('Erro ao remover aluno:', error);
        alert('Erro ao remover aluno. Tente novamente.');
    }
}

async function removerTurma(id_turma) {
    if (!confirm('Tem certeza que deseja remover esta turma? Todos os alunos associados também serão removidos.')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/turma/${id_turma}/`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Erro ao remover turma');
        }
        
        alert('Turma removida com sucesso!');
        carregarTurmas();
        
    } catch (error) {
        console.error('Erro ao remover turma:', error);
        alert('Erro ao remover turma. Tente novamente.');
    }
}

// ============================================
// ATIVIDADE 3: EDIÇÃO DE TURMAS E ALUNOS
// ============================================
async function editarTurma(id_turma) {
    try {
        const response = await fetch(`/api/turma/${id_turma}/`);
        
        if (!response.ok) {
            throw new Error('Erro ao carregar turma para edição');
        }
        
        const turma = await response.json();
        
        idTurmaParaEditar = id_turma;
        
        prencherDadosParaEditar(
            turma.nome_curso,
            turma.nome_turma,
            turma.nome_professor,
            turma.data_inicio,
            turma.data_fim,
            turma.alunos || []
        );
        
        // Rolar para o formulário
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error('Erro ao carregar turma para edição:', error);
        alert('Erro ao carregar turma para edição.');
    }
}

async function editarTurmaExistente(dadosTurma) {
    const responseTurma = await fetch(`/api/turma/${idTurmaParaEditar}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosTurma)
    });
    
    if (!responseTurma.ok) {
        throw new Error('Erro ao editar turma');
    }
    
    alert('Turma editada com sucesso!');
    limparFormulario();
    carregarTurmas();
    idTurmaParaEditar = null;
}

// ============================================
// ATIVIDADE 2: CRIAÇÃO DE TURMAS E ALUNOS
// ============================================
async function salvarTurma(event) {
    event.preventDefault();
    
    const dadosTurma = {
        nome_curso: nomeCurso.value,
        nome_turma: nomeTurma.value,
        nome_professor: nomeProfessor.value,
        data_inicio: dataInicio.value,
        data_fim: dataFim.value
    };
    
    try {
        if (idTurmaParaEditar == null) {
            // Criar nova turma
            const responseTurma = await fetch('/api/turma/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosTurma)
            });
            
            if (!responseTurma.ok) {
                throw new Error('Erro ao criar turma');
            }
            
            const turmaCriada = await responseTurma.json();
            
            // Criar alunos associados à turma
            let alunos = obtemDadosAlunosParaCriarEditar();
            
            for (let aluno of alunos) {
                const dadosAluno = {
                    nome: aluno.nome,
                    idade: aluno.idade,
                    turma: turmaCriada.id
                };
                
                const responseAluno = await fetch('/api/alunos/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dadosAluno)
                });
                
                if (!responseAluno.ok) {
                    throw new Error('Erro ao criar aluno');
                }
            }
            
            alert('Turma criada com sucesso!');
            limparFormulario();
            carregarTurmas();
            
        } else {
            // Editar turma existente (implementado na Atividade 3)
            await editarTurmaExistente(dadosTurma);
        }
        
    } catch (error) {
        console.error('Erro ao salvar turma:', error);
        alert('Erro ao salvar turma. Verifique os dados e tente novamente.');
    }
}

function limparFormulario() {
    nomeCurso.value = '';
    nomeTurma.value = '';
    nomeProfessor.value = '';
    dataInicio.value = '';
    dataFim.value = '';
    qtdAlunos.value = 1;
    slAlunos.innerHTML = '';
    btnAdicionarAluno.hidden = true;
    btnAdicionarAlunoCadastro.disabled = false;
    qtdAlunos.disabled = false;
    idTurmaParaEditar = null;
    exibirQuantidadeAlunosParaCriar();
}


// Eventos
formTurma.addEventListener("submit", salvarTurma);


exibirQuantidadeAlunosParaCriar();

// ============================================
// ATIVIDADE 1: LISTAGEM DE TURMAS
// ============================================

// Função para carregar e listar todas as turmas
async function carregarTurmas() {
    try {
        const response = await fetch('/api/turma/');
        
        if (!response.ok) {
            throw new Error('Erro ao carregar turmas');
        }
        
        const turmas = await response.json();
        
        const tbody = document.querySelector('.table tbody');
        tbody.innerHTML = '';
        
        turmas.forEach(turma => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${turma.nome_turma}</td>
                <td>${turma.nome_curso}</td>
                <td>${turma.nome_professor}</td>
                <td>${formatarData(turma.data_inicio)}</td>
                <td>${formatarData(turma.data_fim)}</td>
                <td>
                    <button class="btn" type="button" onclick="visualizarTurma(${turma.id})">Visualizar</button>
                    <button class="btn warning" type="button" onclick="editarTurma(${turma.id})">Editar</button>
                    <button class="btn danger" type="button" onclick="removerTurma(${turma.id})">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar turmas:', error);
        alert('Erro ao carregar turmas. Verifique se o servidor está rodando.');
    }
}

// Função auxiliar para formatar data de YYYY-MM-DD para DD/MM/YYYY
function formatarData(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

// Função para visualizar detalhes da turma (incluindo alunos)
async function visualizarTurma(id_turma) {
    try {
        const response = await fetch(`/api/turma/${id_turma}/`);
        
        if (!response.ok) {
            throw new Error('Erro ao carregar detalhes da turma');
        }
        
        const turma = await response.json();
        
        let alunosHTML = '';
        if (turma.alunos && turma.alunos.length > 0) {
            alunosHTML = '<h3>Alunos:</h3><ul>';
            turma.alunos.forEach(aluno => {
                alunosHTML += `<li>${aluno.nome} - ${aluno.idade} anos</li>`;
            });
            alunosHTML += '</ul>';
        } else {
            alunosHTML = '<p>Nenhum aluno cadastrado nesta turma.</p>';
        }
        
        const detalhes = `
            <h2>Detalhes da Turma</h2>
            <p><strong>Curso:</strong> ${turma.nome_curso}</p>
            <p><strong>Turma:</strong> ${turma.nome_turma}</p>
            <p><strong>Professor:</strong> ${turma.nome_professor}</p>
            <p><strong>Data de Início:</strong> ${formatarData(turma.data_inicio)}</p>
            <p><strong>Data de Fim:</strong> ${formatarData(turma.data_fim)}</p>
            ${alunosHTML}
        `;
        
        // Criar modal ou seção para exibir os detalhes
        let modalVisualizacao = document.getElementById('modalVisualizacao');
        if (!modalVisualizacao) {
            modalVisualizacao = document.createElement('div');
            modalVisualizacao.id = 'modalVisualizacao';
            modalVisualizacao.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
            `;
            document.body.appendChild(modalVisualizacao);
            
            // Criar overlay
            let overlay = document.createElement('div');
            overlay.id = 'overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 999;
            `;
            overlay.onclick = () => {
                modalVisualizacao.style.display = 'none';
                overlay.style.display = 'none';
            };
            document.body.appendChild(overlay);
        }
        
        modalVisualizacao.innerHTML = detalhes + '<button class="btn" onclick="document.getElementById(\'modalVisualizacao\').style.display=\'none\'; document.getElementById(\'overlay\').style.display=\'none\';">Fechar</button>';
        modalVisualizacao.style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        
    } catch (error) {
        console.error('Erro ao visualizar turma:', error);
        alert('Erro ao carregar detalhes da turma.');
    }
}

// Carregar turmas ao iniciar a página
carregarTurmas();

