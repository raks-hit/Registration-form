const express=require('express')
const app=express()
const path =require("path")
const bodyparser=require('body-parser')
var mongoose=require('mongoose')
mongoose.connect(('mongodb://localhost/hello'),{useNewUrlParser:true,
useUnifiedTopology:true
});
var kittySchema = new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    college:String
  });
  const Kitten = mongoose.model('Kitten', kittySchema);

const port=80;

app.use('./static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))
app.get('/',(req,res)=>{
    res.status(200).render("index.pug")
});
app.post('/register',(req,res)=>{
    var mydata=new Kitten(req.body);
    mydata.save().then(()=>{
        res.send("saved")
    }).catch(()=>{
        res.send("not saved")
    })
})
    app.listen(port,()=>{
    console.log('running on port ${port} ' );
});