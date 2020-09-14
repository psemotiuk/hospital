const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const User = require('./models/User')
const path = require('path')
const jwt = require('jsonwebtoken')


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());



app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/doctor', require('./routes/doctor.routes'))
app.use('/api/medicine', require('./routes/medicine.routes'))
app.use('/api/patientCard', require('./routes/patientCard.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/visits', require('./routes/visits.routes'))
app.use('/api/news', require('./routes/news.routes'))



const PORT = process.env.PORT || 8080;

async function start() {
    try {
        mongoose.Promise = global.Promise;
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        app.listen(PORT, () => {
            console.log(`App has been started on PORT: ${PORT}`);
        });

    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();