if (process.env.NODE_ENV !== 'production') {
     require('dotenv').config()
}

let morgan = require('morgan')
const AppError = require('./utils/appError.js')
const express = require('express')
// Initialize the app
const app = express();
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const users : any = []


let product = require('./service/product/productController')
let store = require('./service/store/businessStoreController')
let userAuth = require('./service/auth/user/userAuthentication')
let business = require('./service/business/businessController')

// Setup server port
var port = process.env.PORT || 8080;

app.use(morgan('tiny'));

app.use(flash())
app.use(session({
     secret: process.env.SESSION_SECRET,
     resave: false,
     saveUnitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.json())
app.use(product);
app.use(store)
app.use(userAuth)
app.use(business)



// Send message for default URL
app.get('/', (req: any, res: any) => res.send('Hello World with Express'));

app.all('*', (req, res, next) => {

     next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
})

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