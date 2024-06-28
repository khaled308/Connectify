import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const authSchema = new Schema(
  {
    uId: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date }
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

authSchema.pre('save', async function (this, next: () => void) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

authSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

authSchema.methods.hashPassword = async function (password: string) {
  return await bcrypt.hash(password, 10);
};

const AuthModel = mongoose.model('Auth', authSchema);
export default AuthModel;
