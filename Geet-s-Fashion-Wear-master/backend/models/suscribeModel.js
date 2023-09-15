import mongoose from 'mongoose';

const suscribeSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        index : true,
        unique : true,
    },
});
const suscribe = mongoose.model('suscribe',suscribeSchema);

export default suscribe;