// importing packages
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// importing files
const expenseSchema = require('./Model/expense')

const expenseModel = mongoose.model('Expense', expenseSchema)

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));


const mongoDBAccess = "mongodb+srv://admin123:admin123@expense.cnpijed.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoDBAccess, { useNewUrlParser: true }).then(() => {
    console.log('connected to DataBase')
}).catch((err) => {
    console.log(err)
})


app.get('/', (reqest, responds) => {
    responds.send('hello, welcome to expense app')
})

app.get('/greeting', (reqest, responds) => {
    responds.send('hello, paul welcomes you to expense app')
})


// # Implement the following routes for the expense API:

// a. GET /expenses - to retrieve all expenses

app.get('/expenses', async (req, res) => {
    const data = await expenseModel.find()
    res.send(data)
})

// b. POST /expenses - to create a new expense

app.post('/addExpense', async (req, res) => {
    const newExpense = {
        name: req.body.name,
        amount: req.body.amount,
        date: req.body.date,
        invoice: req.body.invoice
    }

    let addExpense = new expenseModel(newExpense)
    let data = await addExpense.save()

    res.send(data)

})

// c. PUT & PATCH /expenses/:id - to update a expense by ID

app.put('/expenses/:id', async (req, res) => {
    const id = req.params.id

    const newExpense = {
        name: req.body.name,
        amount: req.body.amount,
        date: req.body.date,
        invoice: req.body.invoice
    }

    let data = await expenseModel.findByIdAndUpdate(id, { $set: newExpense }, { new: true })

    res.send(data)
})

// d. DELETE /expenses/:id - to delete a expense by ID

app.delete('/expenses/:id', async (req, res) => {
    const id = req.params.id
    let data = await expenseModel.findByIdAndDelete(id)

    res.send({ msg: 'you have successfully deleted this item' })

})

// e. GET /expenses/:id - to retrieve a specific expense by ID
app.get('/expenses/:id', async (req, res) => {
    const id = req.params.id

    let data = await expenseModel.findById(id)

    res.send(data)

})

const port = 5000

app.listen(port, () => {
    console.log('hello, you are listening to port ' + port)
})

