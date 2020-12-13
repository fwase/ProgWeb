const index = (req, res) => {
    res.render("main/index")
}

const sobre = (req, res) => {
    res.render("main/sobre")
}

const jogo = (req, res) => {
    res.render("main/jogo")
}

const interface = (req, res) => {
    res.render("main/interface")
}

const cursos = (req, res) => {
    res.render("main/cursos")
}


module.exports = { index, sobre, jogo, interface, cursos }