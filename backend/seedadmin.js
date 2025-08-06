// seedAdmin.js
var mongoose=require('mongoose');
var bcrypt =require ('bcryptjs');
var Admin =require ('./models/admin.js'); // adjust the path

const seedAdmin = async () => {
  await mongoose.connect('mongodb://localhost:27017/your db');

  // const email = 'your email address';
  // const plainPassword = 'your password';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await Admin.create({ email, password: hashedPassword });
  console.log('Admin created');

  mongoose.disconnect();
};

seedAdmin();