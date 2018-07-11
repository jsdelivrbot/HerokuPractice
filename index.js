const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
var pg = require('pg');

var app = express();
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.get('/', (req, res) => res.render('pages/index'));
  app.post('/update',function(req,res){
    pg.connect(process.env.DATABASE_URL, function(err,conn,done){
    if(err) console.log(err);
    conn.query('UPDATE salesfoce.Contact set Phone = $1 WHERE id= $2',
    [req.body.phone.trim(),req.body.id.trim()],
    function(err, result){
      done();
      res.json(result);
  });
    });
  });

  app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
