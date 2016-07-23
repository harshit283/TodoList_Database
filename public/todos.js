var largest_id=0;

$(document).ready(function()
{
    $.post('/initial',function(data,status)
    {
        show_todos(data);
    });

});



$("#press").click(function()
{
    var object={};
    object.value= $("#Q").val();
    object.id = largest_id +1;

    $.post('/addtodo',object,function (data , status) {

        show_todos(data);
    });
});



$("#clear").click( function() {

    $.post('/clear',function(data,status)
    {
        show_todos(data);
    });
});


function func(el)
{

    var obj={};
    obj.id   =  el.getAttribute('id');
    if(el.checked)
        obj.done = 1;
    else obj.done = 0;

    $.post('/click' ,obj , function(data,status) {

        show_todos(data);

    });
}

function show_todos(data)
{

    var ans='';
    if(data.length)
    {
        largest_id = data[0].id;
        for(var x=0;x<data.length;x++)
        {
            if(data[x].done==false)
            {
                ans+='<li>' + '<input type="checkbox"' + 'id="' + data[x].id + '"' + ' onclick="func(this)">' + data[x].task + '</li>';
            }

            else
            {
                ans+='<li style="text-decoration:line-through">'+
                    '<input type="checkbox"' + 'id="' + data[x].id + '"' + ' onclick="func(this)"' + 'checked' + '>' + data[x].task + '</li>';
            }
        }
    }

    $("#msg").html(ans);
}