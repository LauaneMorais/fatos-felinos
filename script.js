const API_URL = 'https://meowfacts.herokuapp.com';
const div_resultado_fatos = document.getElementById('resultado-fatos');

const botao_fato_unico = document.getElementById('fato-unico');
const botao_tres_fatos = document.getElementById('tres-fatos');
const botao_fato_russo = document.getElementById('fato-russo');
const botao_fato_russo_portugues = document.getElementById('fato-russo-portugues');
const botao_quant_aleatoria_fatos = document.getElementById('quant-aleatoria-fatos');
const botao_buscar_fato_por_id = document.getElementById('botao-de-busca');

botao_fato_unico.addEventListener('click', () => {
    carregarFatos();

});

botao_tres_fatos.addEventListener('click', () => {
    carregarFatos({count: 3});

});

botao_fato_russo.addEventListener('click', () => {
    carregarFatos({lang: 'rus'});

});

botao_fato_russo_portugues.addEventListener('click', async () => {
   
    div_resultado_fatos.innerHTML = '<p class="carregamento">Carregando...</p>';

    try {
        //a api tem 91 fatos diferentes
        const id_aleatorio = Math.floor(Math.random() * 91) + 1;

        const resposta_portugues = await axios.get(API_URL, {params: {id: id_aleatorio, lang: 'por'}});
        const fato_em_portugues = resposta_portugues.data.data;

        const resposta_russo = await axios.get(API_URL, {params: {id: id_aleatorio, lang: 'rus'}});
        const fato_em_russo = resposta_russo.data.data;

        div_resultado_fatos.innerHTML = '';
        mostrarFatos(fato_em_portugues);
        mostrarFatos(fato_em_russo);

    } catch (error) {
        console.error ('Erro ao carregar fatos.', error);
        div_resultado_fatos.innerHTML = '<p class="erro">Não foi possível carregar os fatos.</p>';  
    }

})

botao_quant_aleatoria_fatos.addEventListener('click', () => {

    const maxFatos = 5;
    let quantidadeAleatoria = Math.floor(Math.random() * maxFatos) + 1;

    carregarFatos({count: quantidadeAleatoria, lang: 'por'});

})

botao_buscar_fato_por_id.addEventListener('click', () => {

    const id_digitado = document.getElementById('buscar-fato');
    const id_de_busca = id_digitado.value;


    if (id_de_busca == '') {
        alert('Por favor, digite um ID para realizar a busca.');
    } else {
        carregarFatos({id: id_de_busca});
    }

    div_resultado_fatos.innerHTML = '';
})

async function carregarFatos(parametros = {}) {
    div_resultado_fatos.innerHTML = '<p class="carregamento">Carregando...</p>';

    try {
        const resposta = await axios.get(API_URL, {
            params: parametros
        });

        const fatos = resposta.data.data;
        div_resultado_fatos.innerHTML = '';
        mostrarFatos(fatos);
    } catch (error) {
        console.error('Erro ao carregar fatos.', error);
        div_resultado_fatos.innerHTML = '<p class="erro">Infelizmente não foi possível carregar os seus fatos felinos.</p>';
    }
};

function mostrarFatos(fatos) {

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