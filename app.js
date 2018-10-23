const express = require('express');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const lessMiddleware = require('less-middleware');
const app = express();

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect('mongodb://localhost/cmscart', {
  useMongoClient: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
  
  //app.use('/static', express.static(path.join(__dirname, '/public')))
// Load Idea Model
require('./models/Idea');
require('./models/Pages');
const Idea = mongoose.model('ideas');
const Page = mongoose.model('Page');

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(lessMiddleware(__dirname + '/public'));
//app.use(express.static("."));
app.use(express.static(__dirname + '/public')); 
// app.use('/css',express.static('public/css'));
// app.use('/js',express.static('public/js'));
//app.use('/images',express.static('public/images'));
// app.use("/assets",express.static("assets"));

// Method override middleware
app.use(methodOverride('_method'));

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie : { secure : true}
}));

// Express Validator middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
      var namespace = param.split('.')
              , root = namespace.shift()
              , formParam = root;

      while (namespace.length) {
          formParam += '[' + namespace.shift() + ']';
      }
      return {
          param: formParam,
          msg: msg,
          value: value
      };
  },
  customValidators: {
      isImage: function (value, filename) {
          var extension = (path.extname(filename)).toLowerCase();
          switch (extension) {
              case '.jpg':
                  return '.jpg';
              case '.jpeg':
                  return '.jpeg';
              case '.png':
                  return '.png';
              case '':
                  return '.jpg';
              default:
                  return false;
          }
      }
  }
}));
// Express Messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.use(flash());

// Global variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Index Route
app.get('/', (req, res) => {
  const title = 'Software Development Company - ';
  res.render('index', {
    title: title
  });
});
// About Route
app.get('/about', (req, res) => {
  res.render('about', {layout: 'viewBlayout.handlebars'});
});
// Company Route
app.get('/company', (req, res) => {
  res.render('company', {layout: 'viewBlayout.handlebars'});
});
// Development Process Route
app.get('/developmentp', (req, res) => {
  res.render('developmentp', {layout: 'viewBlayout.handlebars'});
});

// admin index Route
app.get('/adminindex', (req, res) => {
  res.render('adminindex', {layout: 'viewAdmin.handlebars'});
});
// admin Login Route
app.get('/login', (req, res) => {
  res.render('login', {layout: 'viewLogin.handlebars'});
});
// Idea Index Page
app.get('/ideas', (req, res) => {
  Idea.find({})
    .sort({date:'desc'})
    .then(ideas => {
      res.render('ideas/index', {
        ideas:ideas
      });
    });
});

// Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});
// Add Product Form
app.get('/adminadd', (req, res) => {
    var title = "";
    var slug = "";
    var content = "";
    res.render('adminadd', {layout: 'viewAdmin.handlebars'});
});
// Edit Idea Form
app.get('/ideas/edit/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    res.render('ideas/edit', {
      idea:idea
    });
  });
});

// Process Form
app.post('/adminindex', (req , res) => {
  let errors = [];

  if(!req.body.title){
    errors.push({text:'Please add a title'});
  }
  if(!req.body.details){
    errors.push({text:'Please add some details'});
  }
  if(errors.length > 0){
    res.render('adminadd', {
      errors: errors,
      title: req.body.title,
      content: req.body.content,
      slug: req.body.slug,
      price: req.body.price,
      sorting: req.body.sorting
    });
  } else {
    const newUser = {
      title: req.body.title,
      content: req.body.content,
      slug: req.body.slug,
      price: req.body.price,
      sorting: 0
    }
    new Page(newUser)
      .save()
      .then(Page => {
        req.flash('success_msg', 'Product added');
        res.redirect('/adminindex');
      })
  }
});
// Edit Form process
app.put('/ideas/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    // new values
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save()
      .then(idea => {
        req.flash('success_msg', 'Video idea updated');
        res.redirect('/ideas');
      })
  });
});

// Delete Idea
app.delete('/ideas/:id', (req, res) => {
  Idea.remove({_id: req.params.id})
    .then(() => {
      req.flash('success_msg', 'Video idea removed');
      res.redirect('/ideas');
    });
});

const port = 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});