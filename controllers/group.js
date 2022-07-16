
import Group from '../models/Group.js'
import Calendar from '../models/Calendar.js'
import Faculties from '../models/Faculties.js'

import { IsValid } from '../utils/utils.js'
// import models from '../models/models.js'
// import { Group, Calendar } from '../models/models.js'

async function createCalendarWeek(lessons) {
    let mass = { 'Понедельник': {} }
    for (let i = 0; i < lessons.length; i++) {
        const groupId = lessons[i].group;
        const groupName = await Group.findById(groupId).select('name')
        // console.log('asd', groupName.name, typeof (groupName.name))
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
    console.log('qwe')
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
    //     name: 'Физра',
    //     group: group._id,

    // })
    // await addLesson.save()
    const lessons = await Calendar.find({
        group: group
    })
    const timetable = await createCalendarWeek(lessons)

    // console.log('qwe', timetable)
    let data = {
        group: group.name,
        title: group.name,
        active: 'group',
        timetable: timetable
    }

    res.render('group', data)
}

export async function add(req, res) {
    const group_name = req.query.name
    const group_published = req.query.published
    const group_faculties_short_name = req.query.faculties
    const group_profile = req.query.profile
    const check = IsValid([group_name, group_published,
        group_faculties_short_name, group_profile])
    // console.log(check)
    if (!check) {
        res.status(200).json({
            message: 'Переданы не все параметры'
        })
        return;
    }
    const candidate = await Group.findOne({
        name: group_name
    })
    // console.log('group_name', group_name)
    if (candidate) {
        res.status(200).json({
            message: 'Такая группа уже есть'
        })
        return;
    }

    const faculties_candidate = await Faculties.findOne({
        short_name: group_faculties_short_name
    })
    if (!faculties_candidate) {
        res.status(200).json({
            message: 'Такого факультета нет'
        })
        return;
    }
    let group = new Group({
        name: group_name,
        published: group_published,
        faculties: faculties_candidate,
        profile: group_profile
    })
    // console.log(req.params.group)
    try {
        await group.save()
        res.status(200).json({
            message: 'Good'
        })
    } catch (e) {
        res.status(409).json({
            message: 'Bad'
        })
        console.log(e)
    }

}