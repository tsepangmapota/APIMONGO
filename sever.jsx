const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/hr_management') // Changed to 127.0.0.1
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Mongoose models
const qualificationSchema = new mongoose.Schema({
    qualification: { type: String, required: true },
    type: { type: String, required: true },
});

const staffSchema = new mongoose.Schema({
    staffNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    qualifications: [qualificationSchema], // Ensure qualifications is an array
});

const Staff = mongoose.model('Staff', staffSchema);

// Vehicle Schema
const vehicleSchema = new mongoose.Schema({
    vin: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    mileage: { type: Number, required: true },
    driver: { type: String, required: true }, // Driver's name or ID
    status: { type: String, enum: ['available', 'in use', 'on service', 'sold on auction'], default: 'available' },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// GET endpoint to fetch staff
app.get('/api/staff', async (req, res) => {
    try {
        const staffMembers = await Staff.find();
        res.json(staffMembers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST endpoint to add staff
app.post('/api/staff', async (req, res) => {
    const newStaff = new Staff(req.body);
    try {
        const savedStaff = await newStaff.save();
        res.status(201).json(savedStaff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT endpoint to update staff
app.put('/api/staff/:staffNumber', async (req, res) => {
    const { staffNumber } = req.params;
    const updatedData = req.body;

    try {
        const updatedStaff = await Staff.findOneAndUpdate(
            { staffNumber },
            updatedData,
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedStaff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        res.json(updatedStaff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE endpoint to remove staff
app.delete('/api/staff/:staffNumber', async (req, res) => {
    try {
        const { staffNumber } = req.params;
        const deletedStaff = await Staff.findOneAndDelete({ staffNumber });
        if (!deletedStaff) {
            return res.status(404).json({ message: 'Staff member not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST endpoint to add qualification to staff
app.post('/api/staff/:staffNumber/qualifications', async (req, res) => {
    const { staffNumber } = req.params;
    const { qualification, type } = req.body;

    try {
        const staffMember = await Staff.findOneAndUpdate(
            { staffNumber },
            { $push: { qualifications: { qualification, type } } },
            { new: true, runValidators: true }
        );

        if (!staffMember) {
            return res.status(404).json({ message: 'Staff member not found' });
        }

        res.json(staffMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST endpoint to add a vehicle
app.post('/api/vehicles', async (req, res) => {
    const newVehicle = new Vehicle(req.body);
    try {
        const savedVehicle = await newVehicle.save();
        res.status(201).json(savedVehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT endpoint to update vehicle mileage and driver
app.put('/api/vehicles/:vin', async (req, res) => {
    const { vin } = req.params;
    const updatedData = req.body;

    try {
        const updatedVehicle = await Vehicle.findOneAndUpdate(
            { vin },
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updatedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.json(updatedVehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET endpoint to search for vehicles
app.get('/api/vehicles', async (req, res) => {
    const { search } = req.query; // Search query
    try {
        const vehicles = await Vehicle.find(search ? { vin: new RegExp(search, 'i') } : {});
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE endpoint to remove a vehicle
app.delete('/api/vehicles/:vin', async (req, res) => {
    try {
        const { vin } = req.params;
        const deletedVehicle = await Vehicle.findOneAndDelete({ vin });
        if (!deletedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
