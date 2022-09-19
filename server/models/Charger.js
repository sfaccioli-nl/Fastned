import mongoose from 'mongoose';

const chargerSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['HPC', 'T52', 'T53C'],
    },
    serialNumber: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['CONNECTED', 'NOT_CONNECTED', 'REMOVED'],
    },
  },
  {
    timestamps: true,
  }
);

const Charger = mongoose.model('Charger', chargerSchema);
export default Charger;
