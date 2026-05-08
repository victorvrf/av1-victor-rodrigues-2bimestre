const apiKey = 'UnMaLFpk4HllDlXILsY7CaPIcJ8aFUFZj4msh2f1';
const apiUrl = 'https://api.nasa.gov/planetary/apod';
const galeria = document.getElementById('galeriaNasa');
const spinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const formBusca = document.getElementById('formBusca');
const inputData = document.getElementById('inputData');

// Função principal de inicialização
async function init() {
    // Definir as datas (últimos 15 dias)
    const dataFim = new Date();
    const dataInicio = new Date();
    dataInicio.setDate(dataFim.getDate() - 15);
    
    const strDataFim = formatarDataParaAPI(dataFim);
    const strDataInicio = formatarDataParaAPI(dataInicio);
    
    // Por padrão busca os últimos 15 dias para exibir múltiplos items
    buscarImagens(`${apiUrl}?api_key=${apiKey}&start_date=${strDataInicio}&end_date=${strDataFim}`);
}

// Quando o usuário pesquisa uma data
formBusca.addEventListener('submit', function(event) {
    event.preventDefault();
    const dataBuscada = inputData.value;
    if (dataBuscada) {
        buscarImagens(`${apiUrl}?api_key=${apiKey}&date=${dataBuscada}`);
    }
});

async function buscarImagens(url) {
    galeria.innerHTML = ''; // Limpar galeria
    ocultarErro();
    mostrarSpinner();
    
    try {
        const resposta = await fetch(url);
        
        if (!resposta.ok) {
            throw new Error(`Erro de comunicação com a NASA (Status: ${resposta.status})`);
        }
        
        const dados = await resposta.json();
        
        // A API pode retornar um array (se start_date for usado) ou um objeto (se date único)
        const arrayDados = Array.isArray(dados) ? dados : [dados];
        
        // Inverter array para mostrar mais recentes primeiro
        arrayDados.reverse();
        
        renderizarImagens(arrayDados);
        
    } catch (erro) {
        console.error(erro);
        mostrarErro('Falha ao buscar imagens estelares. Verifique sua conexão e tente novamente.');
    } finally {
        ocultarSpinner();
    }
}

function renderizarImagens(listaDados) {
    // Filtrar apenas imagens
    const listaImagens = listaDados.filter(item => item.media_type === 'image');
    
    if (listaImagens.length === 0) {
        mostrarErro('Nenhuma imagem encontrada para este período ou data. (Vídeos e outros formatos são ignorados).');
        return;
    }
    
    listaImagens.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 d-flex align-items-stretch';
        
        // Tratamento da data para pt-BR
        const dataOriginal = new Date(item.date);
        // Considerando fuso horário para exibição
        dataOriginal.setMinutes(dataOriginal.getMinutes() + dataOriginal.getTimezoneOffset());
        const dataFormatada = dataOriginal.toLocaleDateString('pt-BR');

        col.innerHTML = `
            <div class="card w-100">
                <img src="${item.url}" class="card-img-top" alt="${item.title}" loading="lazy">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-truncate" title="${item.title}">${item.title}</h5>
                    <div class="mb-2 text-light small">📅 ${dataFormatada}</div>
                    <p class="card-text mb-4">${item.explanation}</p>
                    <a href="detalhes.html?date=${item.date}" class="btn btn-primary mt-auto">Ver detalhes</a>
                </div>
            </div>
        `;
        
        galeria.appendChild(col);
    });
}

// Helpers
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

function ocultarErro() {
    errorMessage.classList.add('d-none');
}

function formatarDataParaAPI(dataObj) {
    const ano = dataObj.getFullYear();
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const dia = String(dataObj.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

// Chamar ao carregar o script
init();