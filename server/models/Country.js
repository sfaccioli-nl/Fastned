import mongoose from 'mongoose';

const countrySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      minLength: 3,
      maxLength: 3,
    },
    deleted: {
      type: Boolean,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Country = mongoose.model('Country', countrySchema);
export default Country;
