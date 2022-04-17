const celulas = document.querySelectorAll(".celula");
const txt_turno = document.querySelector('.text-turno')

const placar_x = document.querySelector('.player_x')
const placar_o = document.querySelector('.player_o')

let checarTurno = true //TURNO TRUE --> JOGADOR X

let contx = 0
let conto = 0

const JOGADOR_X = "X"
const JOGADOR_O = "O"

const COMBINACOES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

document.addEventListener('click', (event) => {
    //SE CLICAR NO ELEMENTO COM CLASS "CELULA" EVENT TARGET NO ID DELE
    if (event.target.matches('.celula')) {
        jogar(event.target.id)
    }
})

function jogar(id) {
    //COM O ID DO PARÂMETRO, EU CAÇO O ELEMENTO CLICADO
    const celula = document.getElementById(id)
    //PARA TURNO == TRUE --> FIGURA X
    turno = checarTurno ? JOGADOR_X : JOGADOR_O
    if (!celula.classList.contains(turno)) {
        celula.innerHTML = `<img src="img/${turno}.svg">`
        //MARCANDO O DONO DA CÉLULA
        celula.classList.add(turno)
        //TROCA DO TEXT DE TURNO
        turno_troca = checarTurno ? JOGADOR_O : JOGADOR_X
        txt_turno.innerHTML = `<h3>Sua vez <span>${turno_troca}</span></h3>`
        //VER SE HÁ VENCEDOR
        checarVencedor(turno)
        detalhe()
    }
}

function detalhe() {
    turno_troca = checarTurno ? JOGADOR_O : JOGADOR_X

    if (turno_troca === "O") {
        placar_x.classList.add('active')
        placar_o.classList.remove('active')
    }

    if (turno_troca === "X") {
        placar_x.classList.remove('active')
        placar_o.classList.add('active')
    }
}

function checarVencedor(turno) {
    const winner = COMBINACOES.some((comb) => {
        return comb.every((index) => {
            return celulas[index].classList.contains(turno)
        })
    })

    if (winner) {
        encerrarGame(turno)
    } else if (checarEmpate()) { //CALLBACK TRUE OF FALSE
        encerrarGame()
    } else {
        //TROCANDO TURNO
        checarTurno = !checarTurno
    }
}

function checarEmpate() {
    let x = 0
    let o = 0

    for (index in celulas) {
        if (!isNaN(index)) {
            if (celulas[index].classList.contains(JOGADOR_X)) {
                x++
            }
            if (celulas[index].classList.contains(JOGADOR_O)) {
                o++
            }
        }
    }

    return x + o === 9 ? true : false
}

function encerrarGame(winner = null) {

    const point_x = document.querySelector('#point_x')
    const point_o = document.querySelector('#point_o')

    if (winner) {

        if (turno == "X") {
            contx++
            point_x.innerHTML = `${contx}`
            txt_turno.innerHTML = `<h3>X ganhou!</h3>`
        } else if (turno == "O") {
            conto++
            point_o.innerHTML = `${conto}`
            txt_turno.innerHTML = `<h3>O ganhou!</h3>`
        }

    } else {
        txt_turno.innerHTML = `<h3>Empate!</h3>`
    }

    //REINICIAR CELULAS
    for (index in celulas) {
        if (!isNaN(index)) {
            if (celulas[index].classList.contains('X')) {
                celulas[index].innerHTML = ''
                celulas[index].classList.remove('X')
            }

            if (celulas[index].classList.contains('O')) {
                celulas[index].innerHTML = ''
                celulas[index].classList.remove('O')
            }
        }
    }



}
