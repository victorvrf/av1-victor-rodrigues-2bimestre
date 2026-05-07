const apiKey = 'UnMaLFpk4HllDlXILsY7CaPIcJ8aFUFZj4msh2f1';
const apiUrl = 'https://api.nasa.gov/planetary/apod';

const spinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const detalhesContainer = document.getElementById('detalhesContainer');

const imagemApod = document.getElementById('imagemApod');
const tituloApod = document.getElementById('tituloApod');
const dataApod = document.getElementById('dataApod');
const descricaoApod = document.getElementById('descricaoApod');

document.addEventListener('DOMContentLoaded', async () => {
    // Obter data da URL
    const parametrosUrl = new URLSearchParams(window.location.search);
    const dataOriginal = parametrosUrl.get('date');
    
    if (!dataOriginal) {
        mostrarErro('Nenhuma data fornecida. Impossível carregar os detalhes do espaço.');
        ocultarSpinner();
        return;
    }
    
    try {
        const resposta = await fetch(`${apiUrl}?api_key=${apiKey}&date=${dataOriginal}`);
        
        if (!resposta.ok) {
            throw new Error(`Erro HTTP! status: ${resposta.status}`);
        }
        
        const dados = await resposta.json();
        
        if (dados.media_type !== 'image') {
            throw new Error('A mídia requisitada não é uma imagem (pode ser um vídeo).');
        }
        
        preencherDados(dados);
        
    } catch (erro) {
        console.error("Erro na busca dos detalhes:", erro);
        mostrarErro('Falha ao obter as informações na base da NASA. ' + erro.message);
    } finally {
        ocultarSpinner();
    }
});

function preencherDados(dados) {
    // A API fornece url (qualidade padrão) e hdurl (alta definição). Tentamos usar HD para os detalhes.
    imagemApod.src = dados.hdurl || dados.url;
    imagemApod.alt = dados.title;
    
    tituloApod.textContent = dados.title;
    
    // Tratamento de data
    const objData = new Date(dados.date);
    objData.setMinutes(objData.getMinutes() + objData.getTimezoneOffset());
    dataApod.textContent = `📅 ${objData.toLocaleDateString('pt-BR')}`;
    
    descricaoApod.textContent = dados.explanation;
    
    // Mostar a container de exibição
    detalhesContainer.classList.remove('d-none');
}

function mostrarSpinner() {
    spinner.classList.remove('d-none');
}

function ocultarSpinner() {
    spinner.classList.add('d-none');
}

function mostrarErro(mensagem) {
    errorMessage.textContent = mensagem;
    errorMessage.classList.remove('d-none');
}