const express =require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const cookieParser =require('cookie-parser');

const config = require('./config/key');

const { User } = require("./models/User");


mongoose.connect(config.mongoURI,
{useNewUrlParser:true}).then(()=> console.log("DB connected"))
.catch(err=>console.error(err));



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());



app.post("/api/users/register",(req, res)=>{

        const user = new User(req.body);

        user.save((err, userDate)=> {
            if(err) return res.json({success: false, err})
        })

    return res.status(200).json({
        success:true
    })
})




app.post("/api/users/login", (req, res) => {
    //요청된 이메일이 DB에 있는지 검색한다.
  
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다."
        });
      }
  
      //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는지 확인.
  
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({loginSuccess: false,message: "비밀번호가 틀렸습니다."});
  
        //비밀번호 또한 맞다면 토큰은 생성.
  
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
  
          //토큰 저장 (쿠키)
  
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      });
    });
  });




app.listen(5000);