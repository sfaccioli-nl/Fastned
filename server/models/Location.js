import mongoose from 'mongoose';

const locationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        location: {
            type: Number,
            trim: true,
        },
        postalCode: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
        deleted: {
            type: Boolean,
            default: 0,
        },
        chargers: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'Charger',
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Location = mongoose.model('Location', locationSchema);
export default Location;
