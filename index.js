const { urlencoded } = require('express');
const express = require('express');
const port = 8000;
const path = require('path');
const app = express();
const db = require('./config/mongoose');
const contact = require('./model/contact');

app.set('view engine','ejs');
app.set('views' , path.join(__dirname , 'views'));

//middleware
app.use(express.urlencoded()); 

app.use(express.static("assests"));


var contactList =[
    {
        name : "sahil",
        phone:"9953801280"
    },
    {
        name : "Tony stark",
        phone:"995365465"
    },
    {
        name : "sulemon bhai",
        phone:"99587589"
    }
];


app.get('/' , function(req , res){
    contact.find({},function(err,contacts){
        if(err){
            console.log("Error in fetching contacts from db");
            return;
        }
        return res.render('home',{
        title : 'Contact List',
        contact_list : contacts
    });
    })
});

app.get('/practice', function(req , res){
    return res.render('practice',{
        title : 'Let us play with ejs'
    })
}); 

app.post('/new-contact',function(req , res){
    // return res.redirect('/practice');
    // // console.log(req.body);
    // contactList.push(req.body);
    // return res.redirect('/');

    contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("error in creating a contact");
            return;
        }
        console.log("**********",newContact)
        return res.redirect('back');
    });
});


//for deleting the contact
app.get('/delete-contact/:id',function(req,res){
    console.log(req.params);
    //get the id from query
    let id = req.params.id;

        //find the contact in the database using id and delete it
    let contactId = contact.findByIdAndDelete(id,function(err,){
        if(err){
            console.log('error in deleting from the database');
            return;
        }
        return res.redirect('back');
    });

});

app.listen(port , function(err){
    if(err){
        console.log("There is an error.",err);
        return;
    }
    console.log("Yup !! Server is runing..!!");
    
});