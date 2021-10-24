if (process.env.NODE_ENV !== 'production') {
     require('dotenv').config()
}
const { db } = require('../config/config.js')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const morgan = require('morgan')
const AppError = require('./utils/appError.js')
const express = require('express')
// Initialize the app
const app = express();
const bodyParser = require('body-parser')
const passport = require('passport')
const methodOverride = require('method-override')
const hpp = require('hpp')
const xss = require('xss')

const users : any = []

let product = require('./service/product/productController')
let store = require('./service/store/businessStoreController')
let userAuth = require('./service/auth/user/userAuthentication')
let business = require('./service/business/businessController')
let review = require('./service/reviews/reviewController')
let user = require('./service/user/userController')

// Setup server port
var port = process.env.PORT || 8080;

const limiter = rateLimit({
     max: 100,
     windowMs: 60 * 60 * 1000,
     message: 'Too many request from this IP address. Please try again in 1 hour'
})

if (process.env.NODE_ENV === 'development') {
     app.use(morgan('dev'));
}

app.use(express.json())
app.use(methodOverride('_method'))
app.use(helmet())
app.use('/api/auth', limiter)

app.use('/api',product);
app.use('/api',store)
app.use('/api',userAuth)
app.use('/api',business)
app.use('/api',review)
app.use('/api',user)

app.use(hpp())


// Send message for default URL
app.get('/', (req: any, res: any) => res.send('Check was successful'));
app.all('*', (req, res, next) => next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404)))

app.use((err, req, res, next) => {
     err.statusCode = err.statusCode || 500;
     err.status = err.status || 'error'
     res.status(err.statusCode).json({
          status: err.status,
          message: err.message
     })
})
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});