import mongoose from 'mongoose';

const chargerSchema = mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['HPC', 'T52', 'T53C'],
            required: true,
        },
        serialNumber: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        status: {
            type: String,
            enum: ['CONNECTED', 'NOT_CONNECTED', 'REMOVED'],
            required: true,
        },
        location: {
            type: mongoose.Types.ObjectId,
            ref: 'Location',
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

const Charger = mongoose.model('Charger', chargerSchema);
export default Charger;
