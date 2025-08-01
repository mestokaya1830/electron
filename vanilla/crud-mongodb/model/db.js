const mongoose = require('mongoose');

//PROMISE
const db = mongoose.connect('mongodb://electron:mk1972mk@localhost:27017/electron?authSource=electron')
.then(() => console.log('Connected with Promise'))
.catch((err) => console.log(err))
module.exports = db;

//ASYNC
// const db = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URL);
//     console.log(conn.connection.host);
// 		console.log('Connected with Async')
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };

// export default db;
