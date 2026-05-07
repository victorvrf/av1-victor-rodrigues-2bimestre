# Trabalho Escolar: NASA Explorer

## 👨‍💻 Descrição do Projeto
O **NASA Explorer** é uma aplicação web desenvolvida como trabalho escolar. Seu objetivo principal é consumir a API pública (Astonomy Picture of the Day - APOD) oferecida pela NASA para apresentar listagens ricas e painéis em HD de imagens astronômicas recentes, com suas referidas descrições científicas.

## 🚀 Tecnologias Utilizadas
O projeto respeitou os requisitos estritos estabelecidos:
* **HTML5:** Estrutura e semântica;
* **CSS3:** Animações e customização criativa do layout (Tema espacial estrelado);
* **Bootstrap 5:** Sistema de grids poderoso, navegação, cards dinâmicos e responsividade base;
* **JavaScript (Vanilla / Puro):** Lógica funcional da aplicação. Não foram utilizados frameworks como React/Vue;
* **Fetch API / Async Await:** Tecnologia nativa do JavaScript para consumo Assíncrono de Serviços (API);

## ✨ Funcionalidades
1. **Fetch & Listagem Dinâmica** (Página principal `index.html`): Ao inicializar, ocorre uma busca nas fotos astronômicas da NASA dos últimos 15 dias. Os blocos em tela são populados dinamicamente via JS manipulando o DOM.
2. **Ignorar Tipos Inválidos**: O App garante e trata a condição de retornar mídias apenas quando a interface possuir `media_type === 'image'`.
3. **Barra de Pesquisa de Data (Página Principal):** Uma caixa que usa uma data estática fornecida pelo usuário, validada, buscando diretamente de arquivo/data.
4. **Tratamento de Estado & UX:** Informações modulares, `loading spinners` para quando uma chamada está pendente e bloco informativo atraente caso haja eventuais falhas do servidor/rede (CATCH block).
5. **Página de Visão Expandida/Detalhes (`detalhes.html`):** Rota que utiliza propriedades de query (`?date=AAAA-MM-DD`). Ao ser carregada, realiza nova busca de metadados, apresentando a imagem em sua resolução *HDURL* com a descrição textual ampliada e permitindo scroll na leitura do artigo, preservando um design sofisticado.

## ⚙️ Como Executar
Por ser um site totalmente estático (Front-End) não requer builds e empacotadores (como Node.js/NPM). Siga as etapas:

1. Baixe os arquivos;
2. Extraia o conteúdo num diretório;
3. Dê duplo-clique sobre `index.html` no seu gestor de arquivos. O site será aberto no navegador padrão (recomendado Google Chrome, MS Edge ou Firefox atuais) com funcionalidade de consumo de API ligada de imediato.
*(Obs: Depende de acesso à Internet).*

## 📁 Estrutura de Pastas
```
trabaio/
│
├── index.html         # Tela inicial com Cards
├── detalhes.html      # Página de destaque individual
│
├── css/
│   └── style.css      # Regras customizadas e tema
│
├── js/
│   ├── script.js      # Lógicas de carregamento / Index API
│   └── detalhes.js    # Lógica baseada em URLSearchParams e Detalhes
│
└── README.md          # Este documento
```