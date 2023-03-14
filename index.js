const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./models');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');


const app = express();
dotenv.config();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true}));
app.use(cors());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send("All Ok");
})

db.sequelize.sync().then(() =>{
    app.listen(process.env.PORT, () => {
        console.log('Server Started');
    })
});

