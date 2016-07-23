

var dbhandler = require('./dbhandler');
var express= require('express');
var app= express();
var body_parser=require('body-parser');

app.set('port' ,process.env.PORT || 3000);
app.use(body_parser.urlencoded({extended : true}));
app.use(body_parser.json());

app.use('/', express.static('public'));


app.post('/initial',function (req,res)
{
      myfunction(function (result) {
          res.send(result);
      });
});

app.post('/addtodo',function (req,res) {

    var newtodo =
    {
        task : req.body.value,
        id:req.body.id,
        done:0
    };

    dbhandler.add_todo(newtodo , function (err,result) {

        if(err)
            console.log(err);
        else
        {
            myfunction(function (result) {
                res.send(result);
            });
        }

    });

});



app.post('/click',function (req,res) {

    var obj = {
        id: req.body.id,
        done: req.body.done
    }


    dbhandler.change_value(obj,function (err,result)
    {
        if(err)
            console.log(err);
        else
        {
            myfunction(function (result) {
                res.send(result);
            });
        }
    });


});


app.post('/clear',function (req,res) {

    dbhandler.delete_values(function (err,result) {

        if(err)
            console.log(err);
        else
        {
            myfunction(function (result) {
                res.send(result);
            });
        }

    });

});


function myfunction(cb) {

    dbhandler.show_todos(function (err, result) {
        if (err)
            console.log(err);
        else
           cb(result);

    });
}


app.listen(3000,function () {
    console.log("SERVER STARTED AND LISTENING AT PORT 3000");
});












