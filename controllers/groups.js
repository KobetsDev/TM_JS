import Group from '../models/Group.js'

export async function getAll(req, res) {
    const groups = await Group.find({
        published: true
    }).select('name')
    // console.log(groups)
    let data = { groups: groups, title: 'Groups', active: 'groups' }
    // data = Object.assign({}, groups_db, data)
    // console.log(data)
    res.render('groups', data)
}