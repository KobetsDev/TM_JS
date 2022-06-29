import Group from '../models/Group.js'
import Lesson from '../models/Lesson.js'

async function createCalendarWeek(lessons) {
    let mass = { 'Понедельник': {} }
    for (let i = 0; i < lessons.length; i++) {
        const groupId = lessons[i].group;
        const groupName = await Group.findById(groupId).select('name')
        console.log('asd', groupName.name, typeof (groupName.name))
        // lessons[i].group1 = groupName.name
        // console.log(lessons[i])
        let day = []
        day.push({ name: lessons[i].name, group: groupName.name })
        mass['Понедельник'] = day
    }
    return mass
}


export async function getByName(req, res) {
    var group_name = req.params.group

    const group = await Group.findOne({
        name: group_name
    })
    if (!group) {
        return res.status(400).json({
            message: 'Такой группы нет'
        })
    }
    if (!group.published) {
        return res.status(400).json({
            message: 'Группы закрыта'
        })
    }
    // let addLesson = new Lesson({
    //     name: 'Высшая математика',
    //     group: group._id,

    // })
    // await addLesson.save()
    const lessons = await Lesson.find({
        group: group
    })
    const timetable = await createCalendarWeek(lessons)

    console.log('qwe', timetable)
    let data = {
        group: group.name,
        title: group.name,
        active: 'group',
        timetable: timetable
    }

    res.render('group', data)
}

export async function add(req, res) {
    let group = new Group({
        name: req.params.group,
        published: true
    })
    console.log(req.params.group)
    try {
        await group.save()
        res.status(200).send('Good')
    } catch (e) {
        res.status(409).send('Bad')
    }

}