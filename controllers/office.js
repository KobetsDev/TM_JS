
import Address from "../models/Address.js";
import Office from "../models/Office.js";
import { IsValid } from '../utils/utils.js'

export async function getAll(req, res) {
    const offices = await Office.find()
    res.status(200).json({
        message: offices
    })
}

export async function add(req, res) {
    const num = req.query.num
    const address_place = req.query.address
    const places = req.query.places
    const check = IsValid([num, address_place, places])
    // console.log(check)
    if (!check) {
        res.status(200).json({
            message: 'Переданы не все параметры'
        })
        return;
    }
    const address_ = await Address.findOne({
        place: address_place
    })
    if (!address_) {
        res.status(200).json({
            message: 'Такого адресса нету'
        })
        return
    }

    const candidate = await Office.findOne({
        num: num,
        address: address_
    })
    if (candidate) {
        res.status(200).json({
            message: 'Такой кабинет уже есть'
        })
        return
    }


    const new_address = new Office({
        num: num,
        address: address_,
        places: places
    })
    try {
        await new_address.save()
        res.status(200).json({
            message: 'Good'
        })
    } catch (e) {
        res.status(409).json({
            message: 'Bad'
        })
    }


}