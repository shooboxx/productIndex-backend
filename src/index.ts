// if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
// }
import db from './models';
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const morgan = require('morgan')
const AppError = require('./utils/appError.js')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
// Initialize the app
const app = express();
const bodyParser = require('body-parser')
const passport = require('passport')
const methodOverride = require('method-override')
const hpp = require('hpp')
const xss = require('xss')


let product = require('./service/product/productController')
let store = require('./service/store/businessStoreController')
let userAuth = require('./service/auth/user/userAuthentication')
let business = require('./service/business/businessController')
let review = require('./service/reviews/reviewController')
let user = require('./service/user/userController')
let search = require('./service/search/searchController')
let inventory = require('./service/inventory/businessInventoryController')


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
const corsConfig = {
     "origin": process.env.ALLOWED_CORS_URLS,
     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
     "preflightContinue": false,
     "optionsSuccessStatus": 204,
     "withCredentials": true
   }
app.use(cors(corsConfig))
app.use(cookieParser());
app.use(express.json())
app.use(methodOverride('_method'))
app.use(helmet())
app.use('/api/auth', limiter)

app.use('/api',business)
app.use('/api',product)
app.use('/api',store)
app.use('/api',userAuth)
app.use('/api',review)
app.use('/api',user)
app.use('/api',search)
app.use('/api',inventory)


app.use(hpp())


// Send message for default URL
app.get('/', (req: any, res: any) => {
  res.send('Check was successful');

})
app.all('*', (req, res, next) => next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404)))

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'
  res.status(err.statusCode).json({
       status: err.status,
       message: err.message
  })
})
db.sequelize
.authenticate()
.then(() => {
    app.listen(port, function () {
        console.log("Running RestHub on port " + port);
      })
}).catch((err : any) => {console.log(err.message)});

// Launch app to listen to specified port


