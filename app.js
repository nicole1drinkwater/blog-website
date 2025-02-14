const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse molestie dui nec porta convallis. Nam ut ante eget massa interdum cursus ut ac tortor. Etiam luctus, mi varius ultricies commodo, ex nisl facilisis leo, eget luctus urna diam quis eros.";
const aboutContent = "Maecenas porta nisi at lacus varius suscipit. Aliquam vel hendrerit erat. Donec ullamcorper ligula nec augue malesuada, at tempor tellus commodo. Cras gravida quis odio in imperdiet. Sed commodo augue id ligula volutpat, at vulputate neque elementum. Donec nec elit tellus. Integer tempor sit amet ipsum eu semper. Quisque laoreet efficitur lacinia. Phasellus molestie nunc non neque congue, vel dignissim lectus dignissim. Nullam interdum placerat maximus. Integer auctor tellus porta ligula.Mauris odio orci, laoreet in dictum in, congue ac neque. Vestibulum rutrum placerat congue. Mauris at arcu at tortor semper viverra quis a lorem. Integer aliquet consectetur felis, vitae iaculis enim aliquam at. Etiam a pellentesque ligula.";
const contactContent = "Maecenas magna turpis, congue facilisis arcu sed, sagittis tincidunt eros. Maecenas nec urna vel arcu commodo pellentesque. Aliquam non enim massa. Morbi tempus dolor a interdum tincidunt. Nulla auctor feugiat nulla sit amet facilisis. Fusce ultricies sapien nec ante pulvinar fermentum et quis ex.";

const entries = [];

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

    res.render("home", {
        homePageContent: homeStartingContent
    });

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
    console.log(req.body.newEntry);
})

app.listen(3000, function() {
    console.log("Server started on port 3000");
})