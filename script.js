const API_URL = 'https://meowfacts.herokuapp.com';
const div_resultado_fatos = document.getElementById('resultado-fatos');

const botao_fato_unico = document.getElementById('fato-unico');
const botao_tres_fatos = document.getElementById('tres-fatos');
const botao_fato_russo = document.getElementById('fato-russo');

botao_fato_unico.addEventListener('click', () => {
    carregarFatos();
});
botao_tres_fatos.addEventListener('click', () => {
    carregarFatos({count: 3});
});
botao_fato_russo.addEventListener('click', () => {
    carregarFatos({lang: 'rus'});
});

async function carregarFatos(parametros = {}) {
    div_resultado_fatos.innerHTML = '<p class="carregamento">Carregando...</p>';

    try {
        const resposta = await axios.get(API_URL, {
            params: parametros
        });

        const fatos = resposta.data.data;
        mostrarFatos(fatos);
    } catch (error) {
        console.error('Erro ao carregar fatos.', error);
        div_resultado_fatos.innerHTML = '<p class="erro">Infelizmente não foi possível carregar os seus fatos felinos.</p>';
    }
};

function mostrarFatos(fatos) {
    div_resultado_fatos.innerHTML = '';

    if(fatos && fatos.length > 0) {
        fatos.forEach(fato => {
            const caixa = document.createElement('div');
            caixa.classList.add('caixa-fato');

            caixa.innerHTML = `<p>${fato}</p>`;

            div_resultado_fatos.appendChild(caixa);
        });
    } else {
        div_resultado_fatos.innerHTML = '<p>Nenhum fato encontrado.</p>'
    }
}