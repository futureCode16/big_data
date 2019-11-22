const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/Visit', {useNewUrlParser: true, useUnifiedTopology:true},(err)=>{
    if(err)console.log(err);
    console.log('connected successfully!');
});
