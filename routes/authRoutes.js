const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');


module.exports = app => {
  app.post(
    '/api/register',
    async (req, res, next) => {
      const { name, password } = req.body;
      const user = new User({ name, password });
      user.save();
      res.send(200);
      next();
    }
  );
  app.post('/api/login', async (req, res, next) => {
    const { name, password } = req.body;
    const db_name = await User.findOne({ name })
    if (db_name && db_name.password === password) {
      // 设置session
      req.session.user = {_id: db_name._id};
      res.status(200).send({state: 0, msg: '登录成功'});
    } else {
      res.status(200).send({state: 2, msg: '用户名或密码错误'})
    }
    next()
  })
  
  app.get('/auth/logout', (req, res) => {
    req.session.user = null;
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    if (req.session.user) {
      res.status(200).send({state: 0, name: req.session.user});
    } else {
      res.status(200).send({state: 2, msg: '未登录'});     
    }
  });
};
