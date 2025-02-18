const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

var _ = require('lodash');

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie dui nec porta convallis. Nam ut ante eget massa interdum cursus ut ac tortor. Etiam luctus, mi varius ultricies commodo, ex nisl facilisis leo, eget luctus urna diam quis eros.";
const aboutContent = "Maecenas porta nisi at lacus varius suscipit. Aliquam vel hendrerit erat. Donec ullamcorper ligula nec augue malesuada, at tempor tellus commodo. Cras gravida quis odio in imperdiet. Sed commodo augue id ligula volutpat, at vulputate neque elementum. Donec nec elit tellus. Integer tempor sit amet ipsum eu semper. Quisque laoreet efficitur lacinia. Phasellus molestie nunc non neque congue, vel dignissim lectus dignissim. Nullam interdum placerat maximus. Integer auctor tellus porta ligula.Mauris odio orci, laoreet in dictum in, congue ac neque. Vestibulum rutrum placerat congue. Mauris at arcu at tortor semper viverra quis a lorem. Integer aliquet consectetur felis, vitae iaculis enim aliquam at. Etiam a pellentesque ligula.";
const contactContent = "Maecenas magna turpis, congue facilisis arcu sed, sagittis tincidunt eros. Maecenas nec urna vel arcu commodo pellentesque. Aliquam non enim massa. Morbi tempus dolor a interdum tincidunt. Nulla auctor feugiat nulla sit amet facilisis. Fusce ultricies sapien nec ante pulvinar fermentum et quis ex.";

const posts = [];
let numPosts = 0;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

    res.render("home", {
        homePageContent: homeStartingContent,
        journalPosts : posts,
        PostsCount : numPosts
    });

})

app.get("/posts/:postName", function(req, res) {

    const requestedTitle = _.lowerCase(req.params.postName);

    console.log(req.params.postName);

    posts.forEach(function(post) {
        const storedTitle = _.lowerCase(post.title);

        if (storedTitle === requestedTitle) {
            console.log("Match found!");

            res.render("post", {
                entryTitle : post.title,
                entryContent : post.entry,
                lodash: _
            });

        } else {
            console.log("Not a match!");
        }
    })

})

app.get("/about", function(req, res) {

    res.render("about", {
        aboutPageContent: aboutContent
    });

})

app.get("/contact", function(req, res) {

    res.render("contact", {
        contactPageContent: contactContent
    });

})

app.get("/compose", function(req, res) {

    res.render("compose", {
    });

})

app.post("/compose", function(req, res) {

    const post = {
        title: req.body.newTitle,
        entry: req.body.newEntry,
      };
    
    posts.push(post);
    numPosts++;

    res.redirect("/");
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
})