const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres', { define: { timestamps: false } })
const bodyParser = require('body-parser')


const House = sequelize.define('house', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    size: Sequelize.INTEGER,
    price: Sequelize.INTEGER
}, {
        tableName: 'houses'
    })

House.sync() 

const port = 4000
app.listen(port, () => console.log(`Listening on port ${port}`))
app.use(bodyParser.json())

// Read = GET
app.get('/houses', function (req, res, next) {
    House.findAll().then(houses => {
        res.json({ houses: houses })
    })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
        })
})

// READ = GET
app.get('/houses/:id', function (req, res, next) {
    const id = req.params.id
    
    House.findById(id)
        .then(house => res.status(201).json(house))
    
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
        })
})

// CREATE = POST
app.post('/houses', function (req, res) {
    House
        .create(req.body)
        .then(house => res.status(201).json(house))
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
        })
    })
})

// UPDATE = PUT
app.put('/houses/:id', function (req, res) {
    const id = req.params.id

    House
        .findById(id)
        .then(house => house.update({ ...req.body }))
        .then(house => res.status(201).json(house))
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
        })
})

// DESTROY = DELETE
app.delete('/houses/:id', function (req, res) {
    const id = req.params.id

    House
        .findById(id)
        .then(house => house.destroy())
        .then(house => res.status(202).json(house))
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
        })
})











