const mongoose = require('mongoose');

const inscriptionSchema = new mongoose.Schema({
    txid: { type: String, required: true, index: true },
    vout: { type: Number, required: true },
    content: { type: String, required: true },
    blockHeight: { type: Number, required: true, index: true },
    blockHash: { type: String, required: true },
    inscriptionId: { type: Number, required: true, index: true }, // Assuming each inscription has a unique ID
    // ... Additional fields for metadata if required
}, { timestamps: true });

const Inscription = mongoose.model('Inscription', inscriptionSchema);
