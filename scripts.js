const tipos = {
    "bug" : "./icons/bug.svg",
    "dark" : "./icons/dark.svg",
    "dragon" : "./icons/dragon.svg",
    "electric" : "./icons/electric.svg",
    "fairy" : "./icons/fairy.svg",
    "fighting" : "./icons/fighting.svg",
    "fire" : "./icons/fire.svg",
    "flying" : "./icons/flying.svg",
    "ghost" : "./icons/ghost.svg",
    "grass" : "./icons/grass.svg",
    "ground" : "./icons/ground.svg",
    "ice" : "./icons/ice.svg",
    "normal" : "./icons/normal.svg",
    "poison" : "./icons/poison.svg",
    "psychic" : "./icons/psychic.svg",
    "rock" : "./icons/rock.svg",
    "steel" : "./icons/steel.svg",
    "water" : "./icons/water.svg"
}
  

async function pokemon(tipos){
    const pokemon = document.getElementById('pokemon').value
    const poke = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)).json()
    const nome = poke['name']

    document.getElementById('nome').innerHTML = nome.toUpperCase()
    document.getElementById('foto').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon}.png`

    var tipo = poke['types'][0]['type']['name']
    var tipoImg = tipos[tipo]
    var img = document.createElement("img")

    img.src = tipoImg
    img.classList = 'h-5 w-5'
    document.getElementById('tipos').innerHTML = ""
    document.getElementById('tipos').appendChild(img)

    if (poke['types'][1]){
        var tipo2 = poke['types'][1]['type']['name']
        var tipoImg = tipos[tipo2]
        var img = document.createElement("img")

        img.src = tipoImg
        img.classList = 'h-5 w-5'

        document.getElementById('tipos').appendChild(img)
    }

    habilidades(poke)
    moves(poke)
}


async function habilidades(poke){
    var habilidade = await(await fetch(poke['abilities'][0]['ability']['url'])).json()
    var nome = habilidade['name'][0].toUpperCase() + habilidade['name'].substring(1)
    
    if (habilidade.hasOwnProperty('effect_entries') && habilidade['effect_entries'].length > 0) {
        var descricao = await habilidade['effect_entries'][0]['effect']
        document.getElementById('descricao').innerHTML = descricao
    } else {
        document.getElementById('descricao').innerHTML = "Descrição não disponível"
    }
    
    document.getElementById('habilidade').innerHTML = nome
}


async function moves(pokemon){
    var listaMove = document.getElementById('golpes')
    var movelist = []

    listaMove.innerHTML = ''
    
    for (var item in pokemon['moves']){
        movelist.push(pokemon['moves'][item]['move']['name'])
    }

    for (var item = 0; item < movelist.length; item++){
        listaMove.innerHTML += `<li class="list-none text-sm flex place-content-center bg-white/5">${movelist[item][0].toUpperCase() + movelist[item].substring(1).replace('-', ' ')}</li>`
    }
}