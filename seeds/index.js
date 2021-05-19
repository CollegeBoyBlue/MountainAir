const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/MountainAir', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Update.")
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 450; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6094b2268bf7fa061486d2f5',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque esse sapiente nam alias incidunt, vitae modi adipisci dicta necessitatibus id, quo praesentium molestias reprehenderit veritatis quasi aliquid maxime accusamus tenetur non facere blanditiis ad. Iste odio delectus ducimus, suscipit distinctio necessitatibus labore esse ad, expedita ex eaque corrupti quod voluptates.',
            price,
            geometry: {
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwjd5dnhj/image/upload/v1620742762/MountainAir/p1j0087mwfaxxhpca9x5.jpg',
                    filename: 'MountainAir/p1j0087mwfaxxhpca9x5'
                },
                {
                    url: 'https://res.cloudinary.com/dwjd5dnhj/image/upload/v1620742763/MountainAir/jfxkntj2sa8dfef6uy1y.jpg',
                    filename: 'MountainAir/jfxkntj2sa8dfef6uy1y'
                },
                {
                    url: 'https://res.cloudinary.com/dwjd5dnhj/image/upload/v1620742764/MountainAir/ljuxxupj3kpa0okz1r0d.jpg',
                    filename: 'MountainAir/ljuxxupj3kpa0okz1r0d'
                },
                {
                    url: 'https://res.cloudinary.com/dwjd5dnhj/image/upload/v1620742765/MountainAir/hvppmhwtt8tmxwcj6elw.jpg',
                    filename: 'MountainAir/hvppmhwtt8tmxwcj6elw'
                },
                {
                    url: 'https://res.cloudinary.com/dwjd5dnhj/image/upload/v1620742767/MountainAir/kfnjhpjom3yuprnrgmcc.jpg',
                    filename: 'MountainAir/kfnjhpjom3yuprnrgmcc'
                },
                {
                   url: 'https://res.cloudinary.com/dwjd5dnhj/image/upload/v1620742769/MountainAir/dg93hstsjdyzz0nrinj3.jpg',
                   filename: 'MountainAir/dg93hstsjdyzz0nrinj3'
                }
            ] 
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})