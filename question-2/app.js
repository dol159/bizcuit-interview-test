const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { v4: uuid } = require('uuid')
const Beer = require('./beer')
const port = 4000

mongoose.connect('mongodb://localhost:27017/test-db', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(express.json())

app.get('/beer/random', async (req, res) => {
    try {

        const count = await Beer.countDocuments()

        if (count === 0) res.status(204).end()

        const random = Math.floor(Math.random() * count)
        const result = await Beer.findOne().skip(random).exec()

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.json(result)
        await result.updateOne({ randomCount: result.randomCount + 1 })
    } catch (e) {
        res.status(500).send(e.toString())
    }
})

app.post('/beer', async (req, res) => {
    try {
        const payload = req.body
        const beer = new Beer({ ...payload, randomCount: 0 })
        await beer.save()
        res.status(201).end()
    } catch (e) {
        res.status(400).send(e.toString())
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
