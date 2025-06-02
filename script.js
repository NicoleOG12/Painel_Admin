let usuarios = [
  { id: '1', nome: 'joão', email: 'joao@email.com', senha: '1234' },
  { id: '2', nome: 'maria', email: 'maria@email.com', senha: '5678' },
  { id: '3', nome: 'ana', email: 'ana@email.com', senha: 'abcd' },
  { id: '4', nome: 'carlos', email: 'carlos@email.com', senha: 'efgh' },
  { id: '5', nome: 'beatriz', email: 'beatriz@email.com', senha: 'ijkl' },
  { id: '6', nome: 'pedro', email: 'pedro@email.com', senha: 'mnop' },
  { id: '7', nome: 'fernanda', email: 'fernanda@email.com', senha: 'qrst' },
  { id: '8', nome: 'lucas', email: 'lucas@email.com', senha: 'uvwx' },
  { id: '9', nome: 'mariana', email: 'mariana@email.com', senha: 'yz12' },
  { id: '10', nome: 'rafael', email: 'rafael@email.com', senha: '3456' }
];

// variável que guarda qual usuário está sendo editado (por índice)
let indiceEdicao = null;

// função que mostra a lista de usuários na tabela da página
// pode receber uma lista filtrada, se não recebe todos
function renderizarTabela(filtrados = usuarios) {
  const tabela = document.getElementById('tabelaUsuarios');
  tabela.innerHTML = ''; // limpa a tabela antes de preencher

  // para cada usuário da lista, adiciona uma linha na tabela
  filtrados.forEach((usuario, index) => {
    tabela.innerHTML += `
      <tr>
        <td>${usuario.id}</td>
        <td>${usuario.nome}</td>
        <td>${usuario.email || ''}</td>
        <td>${usuario.senha}</td>
        <td class="actions">
          <button onclick="abrirModalEditar(${index})">editar</button>
          <button onclick="excluirUsuario(${index})">excluir</button>
        </td>
      </tr>`;
  });
}

// função para cadastrar um novo usuário, pegando valores dos inputs
function cadastrarUsuario() {
  const nome = document.getElementById('nomeInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const senha = document.getElementById('senhaInput').value.trim();

  // verifica se algum campo está vazio
  if (!nome || !email || !senha) {
    alert("preencha todos os campos!");
    return;
  }

  // cria um novo id, pegando o maior id existente + 1
  let novoId = 1;
  if (usuarios.length > 0) {
    const idsNumericos = usuarios.map(u => parseInt(u.id));
    novoId = Math.max(...idsNumericos) + 1;
  }

  // adiciona o novo usuário na lista
  usuarios.push({ id: novoId.toString(), nome, email, senha });
  
  // limpa os inputs depois de cadastrar
  limparInputs();
  
  // atualiza a tabela na tela
  renderizarTabela();
}

// limpa os campos do formulário de cadastro
function limparInputs() {
  document.getElementById('nomeInput').value = '';
  document.getElementById('emailInput').value = '';
  document.getElementById('senhaInput').value = '';
}

// função para excluir um usuário da lista pelo índice
function excluirUsuario(index) {
  if (confirm("deseja excluir este usuário?")) {
    usuarios.splice(index, 1); // remove da lista
    renderizarTabela(); // atualiza tabela
  }
}

// abre o modal para editar os dados 
function abrirModalEditar(index) {
  indiceEdicao = index;
  const usuario = usuarios[index];

  // preenche os inputs do modal com os dados atuais do usuário
  document.getElementById('editId').value = usuario.id;
  document.getElementById('editNome').value = usuario.nome;
  document.getElementById('editEmail').value = usuario.email || '';
  document.getElementById('editSenha').value = usuario.senha;
  
  // mostra o modal na tela
  document.getElementById('modalEditar').style.display = 'block';
}

// fecha o modal
function fecharModal() {
  document.getElementById('modalEditar').style.display = 'none';
}

// salva as alterações feitas
function salvarEdicao() {
  const nome = document.getElementById('editNome').value.trim();
  const email = document.getElementById('editEmail').value.trim();
  const senha = document.getElementById('editSenha').value.trim();

  // verifica se algum campo está vazio
  if (!nome || !email || !senha) {
    alert("preencha todos os campos!");
    return;
  }

  // atualiza os dados do usuário na lista
  usuarios[indiceEdicao].nome = nome;
  usuarios[indiceEdicao].email = email;
  usuarios[indiceEdicao].senha = senha;
  
  // fecha o modal e atualiza a tabela
  fecharModal();
  renderizarTabela();
}

// função para buscar usuários
function pesquisarUsuario() {
  const termo = document.getElementById('searchInput').value.toLowerCase();
  
  // filtra a lista checando se a palavra está em algum campo
  const filtrados = usuarios.filter(u =>
    u.id.toLowerCase().includes(termo) || 
    u.nome.toLowerCase().includes(termo) ||
    (u.email && u.email.toLowerCase().includes(termo))
  );
  
  // mostra só os resultados 
  renderizarTabela(filtrados);
}

// chama a função para mostrar todos os usuários ao carregar a página
renderizarTabela();

// quantidade inicial de flores caindo
let NUM_FLOWERS = 10;
let totalAcumuladas = 0;
const MAX_ACUMULADAS = 1000;

// função que cria as flores
function criarFlores() {
  for (let i = 0; i < NUM_FLOWERS; i++) {
    const flower = document.createElement('img');
    flower.classList.add('fall-flower');
    flower.src = 'img/petala_cerejeira.png';
    flower.alt = 'flor';

    flower.style.top = '-50px';
    flower.style.width = (Math.random() * 30 + 20) + 'px';
    flower.style.height = 'auto';
    flower.style.pointerEvents = 'none';

    // decide se a flor aparece do lado esquerdo ou direito
    const fromLeft = Math.random() < 0.5;
    flower.style.left = fromLeft
      ? (Math.random() * 500) + 'px'
      : (window.innerWidth - (Math.random() * 500 + 50)) + 'px';

    // define a duração e atraso da animação da queda
    const duration = (Math.random() * 7 + 7);
    flower.style.animationDuration = duration + 's';
    flower.style.animationDelay = (Math.random() * 5) + 's';
    flower.style.transform = `rotate(${Math.random() * 360}deg)`;

    // adiciona a flor no corpo da página
    document.body.appendChild(flower);

    // cria uma flor acumulada no chão
    if (totalAcumuladas < MAX_ACUMULADAS) {
      const acumulada = flower.cloneNode(true);
      acumulada.classList.add('acumulada');
      acumulada.classList.remove('fall-flower');
      acumulada.style.top = '560px';
      acumulada.style.bottom = '0';
      acumulada.style.animation = 'none';
      acumulada.style.pointerEvents = 'none';
      acumulada.style.position = 'fixed';
      acumulada.style.left = flower.style.left; 

      document.body.appendChild(acumulada);
      totalAcumuladas++;
    }
  }

  // chama a função novamente depois de 2.5 segundos para criar mais flores
  setTimeout(criarFlores, 2500);
}

// função para limpar as pétalas e reiniciar o efeito
function resetarPetalas() {
  document.querySelectorAll('.fall-flower, .acumulada').forEach(el => el.remove());
  totalAcumuladas = 0;
  renderizarTabela();
  criarFlores();
}

// inicia a criação das flores ao carregar o script
criarFlores();
