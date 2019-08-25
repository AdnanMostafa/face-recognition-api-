const Clarifai =require ('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: '9a5382cc69e94623b12d90ee45818ac5'
   });

const handleApiCall = (req,res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err=> res.status(400).json('Unable to work with API'))
}
   

const handleImage = (req,res,db) => {
    const {id} =req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get Entries'))
}

module.exports ={
    handleImage,
    handleApiCall
}
