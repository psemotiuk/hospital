const { Router } = require('express')
const visits = require('../models/visits')
const confog = require('../config/default.json')
const router = Router()


// api/visits/add
router.post(
    '/add',
    async(req, res, next) => {
        try {
            await visits.create(req.body, (error, data) => {
                if (error) {
                    return next(error)
                } else {
                    res.status(201).json("Визит создан");
                }
            })


        } catch (e) {
            res.status(500).json({
                message: "Что-то пошло не так, попробуйте позже"
            })
        }
    });

// api/visits/get
router.get('/get', async(req, res, next) => {
    try {
        visits.find((error, data) => {
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

// api/visits/get/:id
router.get('/get/:id', async(req, res, next) => {
    try {
        visits.findById(req.params.id, (error, data) => {
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

// api/byUserId/:id
router.get('/get/user/:id', async(req, res, next) => {
    try {
        visits.find({
            user: req.params.id
        }, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }).populate('user').populate('doctor');
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

// api/visits/update/:id
router.put('/update/:id', async(req, res, next) => {
    try {
        visits.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
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

// api/visits/delete/:id

router.delete('/delete/:id', async(req, res, next) => {
    try {
        visits.findByIdAndDelete(req.params.id, (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.status(200).json({ message: "Визит удален" });
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

module.exports = router;