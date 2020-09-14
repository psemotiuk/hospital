const { Router } = require('express');
const PatientCard = require('../models/patientCard');
const { isValidObjectId } = require('mongoose');
const { Types } = require('mongoose');
const router = Router();

// api/patientCard/add
router.post(
    '/add',
    async(req, res, next) => {
        try {
            await PatientCard.create(req.body, (error, data) => {
                if (error) {
                    return next(error)
                } else {
                    res.status(201).json("Карта пациента создана");
                }
            })


        } catch (e) {
            res.status(500).json({
                message: "Что-то пошло не так, попробуйте позже"
            })
        }
    });

// api/patientCard/get
router.get('/get', async(req, res, next) => {
    try {
        PatientCard.find((error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }).populate('patient').populate('doctor')
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

// api/patient/get/:id
router.get('/get/:id', async(req, res, next) => {
    try {
        PatientCard.findById(req.params.id, (error, data) => {
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

// api/patientCard/update/:id

router.put('/update/:id', async(req, res, next) => {
    try {
        PatientCard.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
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

// api/patientCard/delete/:id

router.delete('/delete/:id', async(req, res, next) => {
    try {
        PatientCard.findByIdAndDelete(req.params.id, (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.status(200).json({ message: "Пациент удален" });
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});
// Patient.find(function(err, patients) {
//     if (err) return console.error(err);
//     console.log(patients);
// })
// Patient.find({
//     surname: "new"
// }, (err, patients) => {
//     if (err) console.error(err);
//     console.log(patients);
// })


module.exports = router;