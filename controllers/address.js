import Address from '../models/Address.js'

export async function getAll(req, res) {
    const AllAddress = await Address.find()
    res.status(200).json({
        message: AllAddress
    })
}

export async function add(req, res) {
    const place = req.query.place
    if (!place) {
        res.status(200).json({
            message: 'Переданы не все аргументы'
        })
        return;
    }
    const candidate = await Address.findOne({
        place: place
    })
    if (candidate) {
        res.status(200).json({
            message: 'Тако адресс уже есть'
        })
        return;
    }
    const address = new Address({
        place: place
    })
    try {
        await address.save()
        res.status(200).json({
            message: 'Good'
        })
    } catch (e) {
        res.status(400).json({
            message: 'Bad'
        })
    }
}