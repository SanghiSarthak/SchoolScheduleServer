const moment = require('moment-timezone');
const list = moment.tz.names(); 
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

function isAdmin(req, res, next) {
  console.log('Calling isAdmin');
  console.log(req.user);
    if ( req.user.isAdmin && req.isAuthenticated() ) {
      console.log('User is admin');
       return next();
    }
    res.status(403).json({ message: 'Access Forbidden' });
}


function isAuth(req, res, next) {
  let Tokenheader = req.headers.authorization;
  let token = Tokenheader.toString().split(" ")[1]; //Bear
  // Verify token

  jwt.verify(token, 'secert', (err, decoded) => {
      if (err) {
          console.log(err)
          return res.status(401).json({ message: 'Unauthorized' });
      }
      // Token is valid, proceed with protected action
      req.user = decoded
      console.log("isAuth ",req.user)
      return next();
  });
}

// async function getDay(req , res){
  
//   let currentDate = new Date();
//   let daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
//   let currentDay = daysOfWeek[currentDate.getDay()]; 
//   let currentHour = currentDate.getHours()
//   const data = {currentDay , currentHour }
//   console.log("data in day controller", data);
//   return data;
// }




async function getDay(req, res){
  const desiredTimeZone = 'Asia/Kolkata';
  // res.send(list)
  const currentTimeInTimeZone = moment().tz(desiredTimeZone);
  const day = currentTimeInTimeZone.format('dddd'); // Full day name (e.g., Monday)
  const hour = currentTimeInTimeZone.format('HH'); 
   currentDay = day.toLowerCase()
   currentHour = hour;
  const data = {currentDay , currentHour }
  console.log("data in day controller", data);
  return data;
}
module.exports = { isAdmin , getDay, isAuth}

