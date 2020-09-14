const { Router } = require('express');
const Medicine = require('../models/medicine');
const { isValidObjectId } = require('mongoose');
const { Types } = require('mongoose');
const router = Router();

// api/medicine/add
router.post(
    '/add',
    async(req, res, next) => {
        try {
            await Medicine.create(req.body, (error, data) => {
                if (error) {
                    return next(error)
                } else {
                    res.status(201).json("Препарат создан");
                }
            })


        } catch (e) {
            res.status(500).json({
                message: "Что-то пошло не так, попробуйте позже"
            })
        }
    });

// api/medicine/get
router.get('/get', async(req, res, next) => {
    try {
        Medicine.find((error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        });
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

// api/medicine/get/:id
router.get('/get/:id', async(req, res, next) => {
    try {
        Medicine.findById(req.params.id, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        });
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

// api/medicine/update/:id

router.put('/update/:id', async(req, res, next) => {
    try {
        Medicine.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.json(data);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

// api/medicine/delete/:id

router.delete('/delete/:id', async(req, res, next) => {
    try {
        Medicine.findByIdAndDelete(req.params.id, (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.status(200).json({ message: "Препарат удален" });
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});
router.get('/findMedicine', async(req, res, next) => {
    try {
        Medicine.find({
            $or: [{
                    "name": { $regex: ".*" + req.query.data + ".*", $options: 'i' }
                },
                {
                    "manufacturer": { $regex: ".*" + req.query.data + ".*", $options: 'i' }
                }
            ]
        }, (error, data) => {

            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.status(200).json(data);
            }
        }).populate('medicine');
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

module.exports = router;