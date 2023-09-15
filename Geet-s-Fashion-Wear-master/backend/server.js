import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';
import uploadRouter from './routers/uploadRouter';
import suscribe from './models/suscribeModel';
import productRouter from './routers/productRouter';

async function main() {
  await mongoose.connect(config.MONGODB_URL);
}
main().catch(err => console.log(err));
main().then(()=>{
  console.log('Connected to database');
})



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/api/uploads',uploadRouter);
app.use('/api/user',userRouter);
app.use('/api/orders',orderRouter);
app.use('/api/products',productRouter);


app.post('/api/suscribe',(req,res)=>{
  const suscriber = new suscribe({
      email : req.body.email,
    });
  suscriber.save();
  res.send({message : 'Suscribed'})
})

app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname,'/../frontEnd')));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'/../frontEnd/src/index.html'));
});

app.use((err,req,res,next)=>{
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({message : err.message});
});

app.listen(config.PORT , ()=>{
    console.log('serve at http://localhost:5000');
});