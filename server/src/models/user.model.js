const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true, minlength: 8, private: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const user = this;

  const saltWorkFactor = parseInt(process.env.SALT_WORK_FACTOR, 10);
  const salt = await bcrypt.genSalt(saltWorkFactor);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password).catch(() => false);
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
