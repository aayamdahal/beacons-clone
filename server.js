const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')
const colors = require("colors")
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://beacons-c9136.firebaseio.com"
});

// Load config
dotenv.config({ path: './config/config.env' })  

// Passport config
require('./config/passport')(passport)

// Connect Database
connectDB()

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
    
// Method override
app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
      }
    })
  )
  
// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
  
  // Handlebars Helperss
  const {
    formatDate,
    stripTags,
    truncate,
    editIcon,
    select,
  } = require('./helpers/hbs')
  
  // Handlebars
  app.engine(
    '.hbs',
    exphbs({
      helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select,
      },
      defaultLayout: 'main',
      extname: '.hbs',
    })
  )
app.set('view engine', '.hbs')

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
  // Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global var
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
  })


// app.get("/login", (req, res) => {
//     res.render("login.html");
// });

app.get("/signup", (req,res)=> {
    res.render("signup.html");
});

app.get("/profile", (req,res)=> {
    const sessionCookie = req.cookies.session || "";
    
    admin
    .auth()
   .verifySessionCookie(sessionCookie, true /** checkRevoked */)
   .then(()=> {
       res.render("profile.html");
   })
   .catch((error) => {
       res.redirect("/login")
    });
});

// Home
app.get("/", (req,res)=> {
    res.render("index.html");
});

// Blogs
app.get("/blogs", (req,res) => {
    res.render("blogs.html");
});

// Blogs2
app.get("/blogs2", (req,res) => {
    res.render("blogs2.html");
});

// Digital Store
app.get("/digitalstore", (req,res) => {
    res.render("digital store.html");
});

// Taking Commissions
app.get("/commissions", (req,res) => {
    res.render("taking commissions.html");
});

// Leveling up Links
app.get("/links", (req,res) => {
    res.render("leveling up your links.html");
});

// Getting Started
app.get("/gettingstarted", (req,res) => {
    res.render("getting started.html");
});

// Featuring a video
app.get("/featuring", (req,res) => {
    res.render("featuring a video.html");
});

// Merchants
app.get("/merchants", (req,res) => {
    res.render("merchants.html");
});

//Pricing
app.get("/pricing", (req,res) => {
    res.render("pricing.html");
});

// Updates
app.get("/updates", (req,res) => {
    res.render("updates.html");
});

// Change log psot
app.get("/changelog", (req,res)=> {
    res.render("changelog-post.html")
})

// tips
app.get("/tips", (req,res)=> {
    res.render("tips.html")
})


// tips2
app.get("/tips2", (req,res)=> {
    res.render("tips2.html")
})

// research
app.get("/research", (req,res)=> {
    res.render("research.html")
})

// gallery
app.get("/gallery", (req,res)=> {
    res.render("gallery.html")
})

// gallery-user
app.get("/gallery-user", (req,res)=> {
    res.render("gallery-user.html")
})

// gallery
app.get("/gallery", (req,res)=> {
    res.render("gallery.html")
})

// gallery
app.get("/shop", (req,res)=> {
    res.render("shop.html")
})


// home
app.get("/home", (req,res)=> {
    res.render("home.html")
})

// foodanddrink
app.get("/foodanddrink", (req,res)=> {
    res.render("foodanddrink.html")
})

// jewlery
app.get("/jewlery", (req,res)=> {
    res.render("jewlery.html")
})

// jewlery
app.get("/paper", (req,res)=> {
    res.render("paper.html")
})

// Forgot password
app.get("/forgotpass", (req,res)=> {
    res.render("forgotpass.html")
})

// Terms
app.get("/terms", (req,res)=> {
    res.render("terms.html")
})

// Privacy
app.get("/privacy", (req,res)=> {
    res.render("privacy.html")
})

// Creators
app.get("/creators", (req,res)=> {
    res.render("for-creators.html")
})

//contacts
app.get("/contact", (req,res)=> {
    res.render("contact.html")
})

// Post request
app.post("/sessionLogin", (req,res) => {
    const idToken = req.body.idToken.toString();
    
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    
    admin 
    .auth()
    .createSessionCookie(idToken, {expiresIn})
    .then(
        (sessionCookie) => {
            const options = {maxAge: expiresIn, httpOnly: true};
            res.cookie("session", sessionCookie, options);
            res.end(JSON.stringify({status: "success"}));
        },
        (error) => {
            res.status(401).send("UNAUTHORIZED REQUEST!");
        }
        );
});

app.get("/sessionLogout", (req,res) => {
    res.clearCookie("session");
    res.redirect("./login");
});

// Static folder
app.use(express.static(path.join(__dirname, 'public')))
app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname));

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server running no ${process.env.NODE_ENV} mode on port ${PORT} `.blue.bold);
});  