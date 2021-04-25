const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogPost');

router.get('/', (req, res) => {
  // const data = { 
  //   username: 'argroch',
  //   age: 40
  // };
  // res.json(data);

  BlogPost.find({ })
    .then((data) => {
      console.log('Data: ', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('Error: ', error);
    });

});

router.post('/save', (req, res) => {
  console.log('Body: ', req.body);
  const data = req.body;
  const newBlogPost = new BlogPost(data);

  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({msg: 'Oopsidoodle, internal server errors!'});
    } else {
      res.json({msg: 'We received your data!'});
    }
  });
});

router.get('/name', (req, res) => {
  const data = { 
    username: 'Gumball',
    age: 12
  };
  res.json(data);
});

module.exports = router;