const cep = document.querySelector("#cep")

buscarCep();

function buscarCep() {

    cep.addEventListener("blur", (e) => { //Assim que o usuario tirar o foco pega o que foi digitado.
        let search = cep.value.replace("-", "") // Conserta oque o usuario digitou, tirando o traço que o usuario digitar.  
        let n = Number(search)
        if (isNaN(n)) {
            console.log('Nao é um numero')
            alert('Digite somente numero.')
            cep.value = ""
            buscarCep();
        } else {
            /*Toda vez que fomos fazer um fetch,
             é sempre bom dar uns parametros, 
             para assim dizer que estamos trabalhamos com servidores diferentes.*/
            const options = {
                mothod: 'GET',
                mode: 'cors',
                cache: 'default'
            }
            fetch(`https://viacep.com.br/ws/${search}/json/`, options)
                .then(response => {
                    response.json()
                        .then(data => trataResultado(data))
                })
                .catch(e => alert('Deu erro:' + e, message))
        }
    })
}
const trataResultado = (result) => {
    // Para cada campo que veio no resultado, coloque na variavel campo. 
    for (const campo in result) {
        // Pega o campo que estar vindo no resultado e iguala com o ID do meu HTML, se for igual deixa, se nao for igual, descarta.  
        if (document.querySelector("#" + campo)) {
            // Preenche os input com ID igual ao campo dos resultados que estao vindo.
            document.querySelector("#" + campo).value = result[campo]
        }
    }
}




