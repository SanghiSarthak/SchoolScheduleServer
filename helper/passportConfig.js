const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Admin = require('../database/schema/adminUserSchema');

// config/passport.js


exports.default  = passport.use(
    new LocalStrategy({usernameField : 'email'}, async (email, password, done) => {
      console.log("Local Strategy Called");
        console.log(email , password);
     await  Admin.findOne({ email: email }).then( async user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

         bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (!isMatch) {
            return done(null, false, { message: 'Password incorrect' });
          } 
          console.log("RETURNING form Local starategy")
          return done(null, user);
        });
       
        
      });
    })
  );




passport.serializeUser((user, done) => {
    console.log("Serialize User Called");
    done(null, user._id);
  });

  passport.deserializeUser((_id, done) => {
    console.log("Desrial user called");
    Admin.findById(_id).then((user)=>{
      console.log(user);
      done(null, user);
    });
  });



