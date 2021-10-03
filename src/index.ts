if (process.env.NODE_ENV !== 'production') {
     require('dotenv').config()
}

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

// Setup server port
var port = process.env.PORT || 8080;

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

// Send message for default URL
app.get('/', (req: any, res: any) => res.send('Hello World with Express'));
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running RestHub on port " + port);
});