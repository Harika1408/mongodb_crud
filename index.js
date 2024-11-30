//importing all third party modules
const express=require('express');
const mongoose=require('mongoose');
const bodyParser =require('body-parser');
//importing our own created module brand
const Brand=require('./models/Brand');

const app=express()
const port=3000;
//connecting mongodb,where connect is a function
mongoose.connect('mongodb+srv://kosuriharika:hari1408@cluster0.36qad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then 
 (()=>console.log('connected to mongodb'))
 .catch(err=>console.error('error connectingto mongodb',err));
 //middleware 
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(express.static('public'));//for serving static fields(like work like css)
 //set ejs as the view engine
 app.set('view engine','ejs');
//routes
//home page -show all brands and the form for adding a new brand
app.get('/',async (req,res)=>{
try{
    const brands=await Brand.find();
    res.render('index',{brands});
}catch (err) {
    console.log(err);
    res.status(500).send('server error');
}

}
);
//add new brand
//addition of products
app.post('/add',async(req,res)=>{
    try{
        const newBrand = new Brand({
            //take from the body where is name
            name:req.body.name,
            //take from body where is description
            description:req.body.description
        });
        await newBrand.save();
        //after svaing redirecting to home page
        res.redirect('/');
    }
    catch(err){
        console.log(err);
        res.status(500).send('error adding brand');
    }
    });
    //i wantb to edit particular row using id
    //edit brand page -prepopurlate the form with the existing data 
    app.get('/edit/:id',async(req,res)=>{
        try{
            //taking id from url(params)
            const brand = await Brand.findById(req.params.id);
            if(!brand)return res.status(404).send('Brand not Found');
            //return to edit page
            res.render('edit',{brand});
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send('server error');
        }
        }
    );
    //update brand
    app.post('/edit/:id',async(req,res)=>{
        try{
            await Brand.findByyIdAndUpdate(req.params.id,req.body);
            res.redirect('/');
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send('error updating brand');
        }
    });

    //delete brand
    app.post('/delete/:id',async(req,res)=>{
        try{
            await Brand.findByIdAndDelete(req.params.id);
            res.redirect('/');
        }
        catch(err)
        {
            console.log(err);
            res.status(500).send('error deleting brand');
        }
        }
);






//strat the server
app.listen(port,()=>{
    console.log('srver running at http://localhost:${port}');
});

