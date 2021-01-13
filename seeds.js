var mongoose = require("mongoose"),
    campground = require("./models/campground"),
    Comment = require("./models/comment");


var data = [
    {
        name: "clouds rest",
        image: "https://images.unsplash.com/photo-1530537880974-a076f2eaf827?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80",
        discription: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "Desert Mesa",
        image: "https://images.unsplash.com/photo-1542742581-952b17fd856e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
        discription: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "Canyon Floor",
        image: "https://images.unsplash.com/photo-1549994011-128bd6e50216?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        discription: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }
]
function seedDB() {
    //remove all campgrounds
    campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("campgrounds removed!!!!");
        
        //add a few campgrounds
        data.forEach(function (seed) {
            campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("added a campground");
                    //add a few comments
                    Comment.create({
                        text: "unfortuantely there is no wifi there",
                        author: "Ahmed Amir"
                    }, function (err, Comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comment.push(Comment);
                            campground.save();
                            console.log("created new comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;