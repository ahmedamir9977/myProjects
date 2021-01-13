var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware")
    ;

router.get("/", function (req, res) {
    Campground.find({}, function (err, allcampGrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { Campground: allcampGrounds });
        }
    });
    // res.render("campgrounds",{campGrounds:campGrounds});
});

router.post("/", middleware.isLoggedIn, function (req, res) {

    //get data from form and then added to the array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var dsc = req.body.discription;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampGrounds = { name: name, price: price, image: image, discription: dsc, author: author };
    Campground.create(newCampGrounds, function (err, createdEntry) {
        if (err) {
            console.log(err);
        } else {
            console.log(createdEntry);
            res.redirect("/campgrounds");
        }
    });
    //redirect back to the campgrounds page again
});

router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comment").exec(function (err, foundCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { Campground: foundCampgrounds });
        }
    });
});

// Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});

    // Update Campground Route
    router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
        //find and update the correct campground
        Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
            if (err) {
                res.redirect("/campgrounds");
            } else {
                //redirect somewhere(show page)
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
    });

    //Destroy Campground Route
    router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
        Campground.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.redirect("/campgrounds");
            } else {
                res.redirect("/campgrounds");
            }
        });
    });

    module.exports = router;