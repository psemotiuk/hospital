const { Router } = require('express');
const Doctor = require('../models/Doctor');
const { isValidObjectId } = require('mongoose');
const auth = require('../middleware/auth.middleware')
const { Types } = require('mongoose');
const router = Router();

// api/doctor/add
router.post(
    '/add',
    async(req, res, next) => {
        try {
            await Doctor.create(req.body, (error, data) => {
                if (error) {
                    return next(error)
                } else {
                    res.status(201).json("Доктор создан");
                }
            })


        } catch (e) {
            res.status(500).json({
                message: "Что-то пошло не так, попробуйте позже"
            })
        }
    });

// api/doctor/get
router.get('/get', async(req, res, next) => {
    try {
        Doctor.find((error, data) => {
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

// api/doctor/get/:id
router.get('/get/:id', async(req, res, next) => {
    try {
        Doctor.findById(req.params.id, (error, data) => {
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

// api/doctor/update/:id

router.put('/update/:id', async(req, res, next) => {
    try {
        Doctor.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
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

// api/doctor/delete/:id

router.delete('/delete/:id', async(req, res, next) => {
    try {
        Doctor.findByIdAndDelete(req.params.id, (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.status(200).json({ message: "Доктор удален" });
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

router.get('/find', async(req, res, next) => {
    try {
        Doctor.find({
            $or: [{
                    "name": { $regex: ".*" + req.query.data + ".*", $options: 'i' }
                },
                {
                    "surname": { $regex: ".*" + req.query.data + ".*", $options: 'i' }
                },
                {
                    "speciality": { $regex: ".*" + req.query.data + ".*", $options: 'i' }
                }
            ]
        }, (error, data) => {

            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.status(200).json(data);
            }
        }).populate('doctor');
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});


module.exports = router;