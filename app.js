const express =require('express');
const path = require( 'path' );
const bodyParser = require('body-parser');
const morgan = require( 'morgan' ); 
const { connectToMongo, closeMongoConnection } = require('./database/database');
const collegeRoutes = require('./routes/CollegeRoutes');
const adminRoutes =require('./routes/AdminRoutes');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const { isAdmin } = require('./helper/helper');
const cors = require('cors');
const app = express();

app.use(morgan('tiny'));
const corsOptions = {
    //origin: 'http://127.0.0.1:5500',
    origin: 'https://schoolfrontend-cu35.onrender.com/',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
};

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 
}
}));


app.get("/",(req,res)=>{
    res.send( "Hello World");
})
app.use(passport.initialize());
app.use(passport.session());

app.use('/colleges', collegeRoutes);
app.use('/admin',adminRoutes );


try {
    connectToMongo().then(()=>{
    console.log("Connected to Database")
   })
} catch (error) {
    console.log("Error while connecting to the database");
    console.log(error);
}



const port = 8000; 
app.listen(port, ()=>{
    console.log(`Connected on port ${port}`);
})
