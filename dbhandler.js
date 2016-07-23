

var connection = null;
var mysql = require('mysql');

function create_connection() {

    connection = mysql.createConnection(
        {
            host : 'localhost',
            user : 'todouser',
            database : 'tododb'
        }
    );
}


function fetch_todos(call_back) {

    var todolist=[];
    create_connection();
    connection.connect();
    connection.query( 'SELECT * from todolist2 ORDER BY id DESC' , function (err,rows,fields)
    {
        if(err)
            call_back(err,null);
        else
        {
            for(var i=0;i<rows.length;i++)
            {
                todolist.push({
                    id:rows[i].id,
                    task : rows[i].task,
                    done:rows[i].done
                });
            }
            call_back(null,todolist);
        }

    });
    connection.end();

}


function add_todo(todo,call_back) {

    create_connection();
    connection.connect();
    const str = "INSERT INTO todolist2 VALUES (" +
        todo.id + ", " +
        "'" + todo.task + "', " +
        todo.done +
        ");";

    connection.query(str,function (err,result) {
        if(err)
            call_back(err,null);

        else
            call_back(null,result);
    });

    connection.end();

}



function change_value(todo,call_back)
{
    create_connection();
    connection.connect();
    var str;
    if(todo.done==true)
        str = 'update todolist2 set done=1 where id=' + todo.id +';';
    else str = 'update todolist2 set done=0 where id=' + todo.id +';';

    connection.query(str,function (err,result) {
        if(err)
            call_back(err,null);

        else
            call_back(null,result);
    });

    connection.end();
}


function delete_values(call_back) {

    create_connection();
    connection.connect();
    var str = 'delete from todolist2 where done = 1;';
    connection.query(str,function (err,result) {

        if(err)
            call_back(err,null);
        else call_back(null,result);
    });
    connection.end();

}

module.exports = {

    show_todos : fetch_todos,
    add_todo : add_todo,
    change_value : change_value,
    delete_values : delete_values

};
