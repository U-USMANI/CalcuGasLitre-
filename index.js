const express = require('express');
const app = express();
const cors = require('cors');
const env = require('dotenv');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const socket = require('socket.io');
// const userRoutes = require("./routes/userroutes");
// const http = require('http');
// const server = require('https').createServer(app);
// const server = http.createServer(app);


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


//environment variables or you can say constants
env.config();


//mongodb connection
mongoose.connect(
    process.env.MONGODBURL,
    {
        useNewUrlParser: true,
        useunifiedTopology: true,

    }

).then(() => {
    console.log('Connected');
});


//routes    
const apiRoutes = require('./routes/userroutes')
const Content = require('./models/Content');
app.use('/api', apiRoutes);


/** Content seeder */
const contentSeeder = [
    {
        title: "Privacy Policy",
        content: "This is privacy policy.",
        type: "privacy_policy"
    },
    {
        title: "User Agreement",
        content: "This is User Agreement.",
        type: "user_agreement"
    },
    {
        title: "Terms and Conditions",
        content: "This is terms and conditions.",
        type: "terms_and_conditions"
    }
];
const dbSeed = async () => {
    await Content.deleteMany({});
    await Content.insertMany(contentSeeder);
}
dbSeed().then(() => {
    mongoose.connection.close();
})


// app.use(userRoutes)
// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// });
const PORT = process.env.PORT || 4000;

app.listen(process.env.PORT, async () => 
    console.log(`Server is running on port ${PORT}`));

// server.listen(process.env.PORT)

