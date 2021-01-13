var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User = require("../models/user")
    ;

router.get("/", function (req, res) {
    res.render("landing");
});


//================================================
//AUTH ROUTES
//================================================

//show register form
router.get("/register", function (req, res) {
    res.render("register");
});
//Register Logic
router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Login Route

router.get("/login", function (req, res) {
    res.render("login");
});

//handeling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {
    res.send("LOGIN LOGIC HAPPEN HERE");
});

//Logout Route
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged You Out!");
    res.redirect("/campgrounds");
});

module.exports = router;