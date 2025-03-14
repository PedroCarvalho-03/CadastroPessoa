const cadastro = [];

function incluirUsuario() {
    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const dataNascimento = document.getElementById("data_nascimento").value;
    const email = document.getElementById("email").value.trim();

    if (!nome || !cpf || !dataNascimento || !email) {
        alert("Preencha todos os campos!");
        return;
    }

    // Verifica se o CPF já existe no cadastro
    if (cadastro.some(user => user.cpf === cpf)) {
        alert("CPF já cadastrado!");
        return;
    }

    // Adiciona o usuário ao array
    cadastro.push({ nome, cpf, dataNascimento, email });

    // Limpa os campos
    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("data_nascimento").value = "";
    document.getElementById("email").value = "";

    listarUsuarios();
}

// Função para listar os usuários cadastrados
function listarUsuarios() {
    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = ""; 

    if (cadastro.length === 0) {
        lista.innerHTML = "<li>Nenhum usuário cadastrado.</li>";
        return;
    }

    cadastro.forEach((user, index) => {
        const item = document.createElement("li");
        item.innerHTML = `
            <strong>${user.nome}</strong> - CPF: ${user.cpf} - Nasc.: ${user.dataNascimento} - Email: ${user.email}
            <button onclick="removerUsuario(${index})">Excluir</button>
        `;
        lista.appendChild(item);
    });
}

// Função para pesquisar usuários pelo nome
function pesquisarUsuario() {
    const nomeBusca = prompt("Digite o nome do usuário para pesquisar:").trim().toLowerCase();
    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = ""; // Limpa a lista antes de mostrar os resultados

    const resultados = cadastro.filter(user => user.nome.toLowerCase().includes(nomeBusca));

    if (resultados.length === 0) {
        lista.innerHTML = "<li>Nenhum usuário encontrado.</li>";
        return;
    }

    resultados.forEach(user => {
        const item = document.createElement("li");
        item.innerHTML = `
            <strong>${user.nome}</strong> - CPF: ${user.cpf} - Nasc.: ${user.dataNascimento} - Email: ${user.email}
        `;
        lista.appendChild(item);
    });
}

// Função para remover um usuário pelo índice
function removerUsuario(index) {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
        cadastro.splice(index, 1);
        listarUsuarios();
    }
}
