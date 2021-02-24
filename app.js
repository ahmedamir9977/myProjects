var express        = require("express"), 
    app            = express(), 
    bodyparser     = require("body-parser"), 
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Campground     = require("./models/campground"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    flash          = require("connect-flash"),
    seedDB         = require("./seeds")
    ;

//requring routes    
var  commentRoutes = require("./routes/comments"),
     camgroundRoutes = require("./routes/campgrounds"),
     indexRoutes = require("./routes/index")
 ;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb+srv://amir:05430543@cluster0.gbjbz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");

app.use(express.static(__dirname + "/public"));

//seedDB(); //seed database

//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "YelpCamp Awesome",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(bodyparser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

app.use(indexRoutes);
app.use("/campgrounds",camgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
 });