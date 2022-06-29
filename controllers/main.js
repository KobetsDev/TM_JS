

export function main(req, res) {

    let data = { title: 'TimeTable', active: 'main' }

    res.render('index', data)
}