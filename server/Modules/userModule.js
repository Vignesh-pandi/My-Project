const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const mongo = require("../connect");

exports.signin = async (req, res) => {
  console.log(req.body);
  try {
    const userExist = await mongo.selectedDb
      .collection("users-data")
      .findOne({ email: req.body.email });
    if (!userExist) {
      return res.status(400).send({ msg: "Email not found" });
    }
    const isSamePassword = await bcrypt.compare(
      req.body.password,
      userExist.password
    );
    if (!isSamePassword) {
      return res.status(400).send({ msg: "Password Incorrect" });
    }
    res.status(200).send({ msg: "Valid User" });
  } catch (error) {
    console.log(error);
  }
};

const checkpassword = (password, confirmpassword) => {
  return password === confirmpassword ? true : false;
};
exports.signup = async (req, res, next) => {
  try {
    //email id validation step
    const existuser = await mongo.selectedDb
      .collection("users-data")
      .findOne({ email: req.body.email });
    if (existuser) {
      return res.status(400).send({ msg: "Email already exist" });
    }
    //password and confirmpassword checking
    const samepassword = checkpassword(
      req.body.password,
      req.body.confirmpassword
    );
    if (!samepassword) {
      return res.status(400).send({ msg: "Password Incorrect" });
    } else delete req.body.confirmpassword;

    // password encryption
    const randomString = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, randomString);
    //store in database
    const insertedresponse = await mongo.selectedDb
      .collection("users-data")
      .insertOne({ ...req.body });
    res.send({ msg: "User Created Successfully" });
  } catch (error) {
    res.send(error);
  }
};

exports.contact = async (req, res, next) =>{
  try {
    const con = await mongo.selectedDb
    .collection("contact")
    .insertOne({...req.body})
    res.status(200).send({msg: 'We will reach you soon'})
  } catch (error) {
    console.log(error)
    res.status(400).send({msg :'Error'})
  }
}
