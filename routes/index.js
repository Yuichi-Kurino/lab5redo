const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');
const tokenUtil = require('../Auth/token');
const bcrypt = require('bcrypt');

router.get('/', function(req, res){
  res.end("server running");
});

router.post('/userSignup', async function(req, res){

  const actual = await userModel.insertUser(req.body);
  res.json(actual);
});

router.post('/authenticateUser', async function (req,res) {
  //check our own database

  const userInfo = await userModel.getUserByEmail(req.body.email);
  if(userInfo.length === 0||!bcrypt.compareSync(req.body.password, userInfo[0].password)){
    res.json({process:"fail"});
  }
  else{
    const userDataPacket = {
      id:userInfo[0].uid,
      email: userInfo[0].email
    };
    const token = await tokenUtil.generateToken(userDataPacket);
    if(!token){
      res.clearCookie('userToken');
    }else {
      res.clearCookie('userToken');
      res.cookie("userToken", token, {expire: new Date() + 1});
      res.redirect('/userInterface');//change this to a redirect
    }
  }
});

router.get('/userInterface', async function (req,res){

  const userinfo = await tokenUtil.validateToken(req.cookies.userToken);

  if(userinfo) {
    const userItems = await orderModel.getItemByUserID(userinfo);

    res.json(userItems);
  }else{
    res.json({process:'fail'});
  }



});

router.post('/change', async function (req,res) {
  const userinfo = await tokenUtil.validateToken(req.cookies.userToken);
  if(userinfo) {
    const actual = await orderModel.changeItem(req.body);
    res.json(actual);
  }else{
    res.json({process:"fail"})
  }
});

router.post('/delete', async function (req,res) {
  const userinfo = await tokenUtil.validateToken(req.cookies.userToken);
  if(userinfo) {
    const actual = await orderModel.deleteItem(req.body);
    res.json(actual);
  }else{
    res.json({process:"fail"})
  }
});

router.post('/create_order', async function (req,res) {
  console.log(req.cookies);
  const userinfo = await tokenUtil.validateToken(req.cookies.userToken);
  if(userinfo){
    const actual = await orderModel.insertItem(req.body);
    res.json(actual);
  }else{
    res.json({process:"fail"});
  }
});

module.exports = router;
