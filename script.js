const container = document.querySelector('#usuarios');
const url = 'https://jsonplaceholder.typicode.com/users';

async function carregar() {
    try {
      container.innerHTML = '<p>CARREGANDO...</p>';

      const res = await fetch(url);
      const data = await res.json();

      let html = '';

      data.forEach(usuario => {
        html += `
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${usuario.name}</h5>
              <p class="card-text">${usuario.email}</p>
              <p class="card-text">${usuario.address.street} - ${usuario.address.city}</p>
            </div>
          </div>
        </div>`;
      });

      container.innerHTML = html;
      console.log(data);
    } catch (error) {
      container.innerHTML = '<p>ERRO AO CARREGAR OS DADOS!</p>';
      console.log('Deu erro: ' + error);
    }
}

carregar();