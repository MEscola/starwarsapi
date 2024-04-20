require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json())
const port = 3000;

const Film = mongoose.model('Film', { 
    title: String,
    description: String,
    image_url: String,
    trailer_url: String

});


app.get('/', async (req, res) => {
    const films = await Film.find() //faço a leitura de tudo que tenho na tabela filmes
    return res.send(films)
})

app.delete('/:id', async (req, res) => {
    const film = await Film.findByIdAndDelete(req.params.id)
    return res.send(film)
})

app.put('/:id', async (req, res) => {
    const film = await Film.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    },
    {
        new:  true //envia o que foi atualizado
    }) 

    return res.send(film)
})

app.post('/', async (req,res) => {
    const film = new Film({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })
    film.save()
   return res.send(film)
})

app.listen(port, (await) => {
    mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Seu código aqui...
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
})
});