var plays_won = 0

const number_played = {
    1: "Papel",
    2: "Pedra",
    3: "Tesoura"
}

const mapped_plays = {
    [["Papel","Papel"]]: 0,
    [["Papel","Pedra"]]: 1,
    [["Papel","Tesoura"]]: -1,
    [["Pedra","Papel"]]: -1,
    [["Pedra","Pedra"]]: 0,
    [["Pedra","Tesoura"]]: 1,
    [["Tesoura","Papel"]]: 1,
    [["Tesoura","Pedra"]]: -1,
    [["Tesoura","Tesoura"]]: 0
}

function print_choices(){
    console.log("Escolha sua jogada:")
    console.log("1 - Papel")
    console.log("2 - Pedra")
    console.log("3 - Tesoura")
}

function get_random_number(min, max){
    return min + Math.floor((max - min) * Math.random())
}

while(true){
    print_choices()
    number_player = parseInt(prompt())
    
    if(number_played[number_player] === undefined){
        plays_won--;
        console.log("A sua pontuação foi de " + plays_won)
        break
    }

    choice_player = number_played[number_player]
    choice_computer = number_played[get_random_number(1,3)]
    
    console.log("O computador jogou " + choice_computer)

    play_result = mapped_plays[[choice_player, choice_computer]]

    if(play_result === 1){
        console.log("Você ganhou!")
    }
    else if(play_result === 0){
        console.log("A rodada empatou!")
    }
    else{
        console.log("Você perdeu!")
        plays_won--;
        console.log("A sua pontuação foi de " + plays_won)
        break
    }

    plays_won += play_result
}
