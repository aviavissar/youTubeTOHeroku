const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false
});

 // "mongodb": "C:\Users\Avia\mongodb\server\4.4\bin\mongod.exe  --dbpath=C:\Users\Avia\mongo-data",






