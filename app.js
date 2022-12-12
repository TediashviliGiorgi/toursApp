const express = require("express");
const fs = require("fs");
const morgan = require("morgan");


const app = express();
const PORT = 3000

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//Middlewares------------------------

app.use(morgan("dev"))

app.use(express.json());

app.use((req, res, next) => {
    console.log("hello from the middleware")

    next()
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()

    next()
})
//------------------------------------
//----Tour rouute hendlers
const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: tours
    });
}


const getTour = (req, res) => {
    console.log(req.requestTime)
    const tour = tours.find(el => el.id === Number(req.params.id))
    if (!tour) {
        console.log(1)
        return res.status(404).json({
            status: "fail",
            message: "Invalid"
        })
    }

    res.status(200).json({
        status: "success",
        data: tour
    });
}

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId }, req.body)

    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}

const updateTour = (req, res) => {
    if (Number(req.params.id) > tours.length) {
        console.log(1)
        res.status(404).json({
            status: "fail",
            message: "Invalid"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tour: "<Updated tour here>"
        }
    })
}

const deleteTour = (req, res) => {
    if (Number(req.params.id) > tours.length) {
        console.log(1)
        res.status(404).json({
            status: "fail",
            message: "Invalid"
        })
    }
    res.status(200).json({
        status: "success",
        data: null
    })
}

//-----------------
//User route hendlers-------
const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route not iet defined'
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route not iet defined'
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route not iet defined'
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route not iet defined'
    })
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route not iet defined'
    })
}
//--------------------------

//Tour routes-------------------
const tourRouter = express.Router()
app.use('/api/v1/tours', tourRouter)
const userRouter = express.Router()
app.use('/api/v1/users', userRouter)
tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour)

tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

//User routes
userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser)

userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

app.listen(PORT, () => {
    console.log(`App sucessfully started on port ${PORT}`)
})

    //--------------------------
