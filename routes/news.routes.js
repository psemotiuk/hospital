const { Router } = require('express')
const news = require('../models/news')
const confog = require('../config/default.json')
const router = Router()


// api/news/add
router.post(
    '/add',
    async(req, res, next) => {
        try {
            await news.create(req.body, (error, data) => {
                if (error) {
                    return next(error)
                } else {
                    res.status(201).json("Новость создан");
                }
            })


        } catch (e) {
            res.status(500).json({
                message: "Что-то пошло не так, попробуйте позже"
            })
        }
    });

// api/news/get
router.get('/get', async(req, res, next) => {
    try {
        news.find((error, data) => {
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

// api/news/get/:id
router.get('/get/:id', async(req, res, next) => {
    try {
        news.findById(req.params.id, (error, data) => {
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
        news.find({
            user: req.params.id
        }, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        })
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, попробуйте позже"
        })
    }
});

// api/news/update/:id
router.put('/update/:id', async(req, res, next) => {
    try {
        news.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
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

// api/news/delete/:id

router.delete('/delete/:id', async(req, res, next) => {
    try {
        news.findByIdAndDelete(req.params.id, (error, data) => {
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