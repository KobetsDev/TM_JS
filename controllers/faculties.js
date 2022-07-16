
import Faculties from '../models/Faculties.js'

// http://localhost:8000/faculties/add?name=ФиТимйцуйцуйцу&short_name=ФиТим&dean_name=Волков(Декан)
export async function addfaculties(req, res) {
    const faculties_name = req.query.name
    // console.log(faculties_name, req.params.name)
    const candidate = await Faculties.findOne({
        name: faculties_name
    })
    if (candidate) {
        res.status(200).json({
            message: 'Такой факультет уже есть'
        })
        return;
    }
    const faculties_short_name = req.query.short_name
    const faculties_dean_name = req.query.dean_name
    if (!(faculties_dean_name, faculties_short_name)) {
        res.status(200).json({
            message: 'Переданы не все параметры'
        })
        return;
    }
    const faculties = new Faculties({
        name: faculties_name,
        short_name: faculties_short_name,
        dean_name: faculties_dean_name
    })
    try {
        await faculties.save()
        res.status(200).json({
            message: 'Good'
        })
    } catch (e) {
        res.status(200).json({
            message: `Ошибка при сохранении в БД${e}`
        })
    }
}