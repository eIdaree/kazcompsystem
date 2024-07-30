// workersController.js
const Worker = require('../models/Worker'); // Adjust the path as needed
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// Get all workers
const getAllWorkers = asyncHandler(async (req, res) => {
    const workers = await Worker.find().lean();
    if (!workers?.length) {
        return res.status(400).json({ message: 'No workers found' });
    }
    res.json(workers);
});

// Create a new worker
const createNewWorker = asyncHandler(async (req, res) => {
    const { fname, lname, email, phone_number, roles, salary, password } = req.body;

    if (!fname || !lname || !email || !phone_number || !password) {
        return res.status(400).json({ message: 'All fields except salary are required' });
    }

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const workerObject = { fname, lname, email, phone_number, roles, salary, password: hashedPwd };

        const worker = await Worker.create(workerObject);

        if (worker) {
            res.status(201).json({ message: `New worker ${worker.email} created` });
        } else {
            res.status(400).json({ message: 'Invalid worker data received' });
        }
    } catch (err) {
        if (err.code === 11000) {
            if (err.keyValue.email) {
                return res.status(409).json({ message: 'Email already registered' });
            } else if (err.keyValue.phone_number) {
                return res.status(409).json({ message: 'Phone number already registered' });
            }
        }
        res.status(500).json({ message: 'An error occurred while creating the worker', error: err.message });
    }
});

// Update worker
const updateWorker = asyncHandler(async (req, res) => {
    const { id, fname, lname, email, phone_number, roles, salary, active, password } = req.body;

    if (!id || !fname || !lname || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except salary and password are required' });
    }

    const worker = await Worker.findById(id).exec();
    if (!worker) {
        return res.status(400).json({ message: 'Worker not found' });
    }

    const phoneDuplicate = await Worker.findOne({ phone_number }).lean().exec();
    const emailDuplicate = await Worker.findOne({ email }).lean().exec();

    if (phoneDuplicate && phoneDuplicate._id.toString() !== id) {
        return res.status(409).json({ message: 'Phone number already registered' });
    }

    if (emailDuplicate && emailDuplicate._id.toString() !== id) {
        return res.status(409).json({ message: 'Email already registered' });
    }

    worker.fname = fname;
    worker.lname = lname;
    worker.email = email;
    worker.phone_number = phone_number;
    worker.roles = roles;
    worker.salary = salary;
    worker.active = active;

    if (password) {
        worker.password = await bcrypt.hash(password, 10);
    }

    const updatedWorker = await worker.save();

    res.json({ message: `Worker ${updatedWorker.email} updated successfully` });
});

// Delete worker
const deleteWorker = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Worker ID Required' });
    }

    const worker = await Worker.findById(id).exec();

    if (!worker) {
        return res.status(400).json({ message: 'Worker not found' });
    }

    const result = await worker.deleteOne();

    const reply = `Worker ${result.email} with ID ${result._id} deleted`;

    res.json(reply);
});

module.exports = {
    getAllWorkers,
    createNewWorker,
    updateWorker,
    deleteWorker
};
