const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Blog = mongoose.model('Blog');
const redis = require('redis');
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
const util = require('util');


module.exports = app => {
  app.get('/api/blogs/:id', requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.session.user._id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get('/api/blogs', requireLogin, async (req, res) => {
    client.get = util.promisify(client.get);
    const cachedBlogs = await client.get(req.session.user._id);
    if (cachedBlogs) {
      return res.send(JSON.parse(cachedBlogs));
    }
    const blogs = await Blog.find({ _user: req.session.user._id });
    client.set(req.session.user._id, JSON.stringify(blogs)); 
    res.send(blogs);
  });

  app.post('/api/blogs', requireLogin, async (req, res) => {
    const { title, content } = req.body;
    const blog = new Blog({
      title,
      content,
      _user: req.session.user._id
    });
    
    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
