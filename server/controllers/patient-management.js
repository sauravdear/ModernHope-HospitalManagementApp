const mongoose = require("mongoose");
const Patient = require("../models/patient-model");

const PatientInfo = async (req, res, next) => {
    try {
        const response = req.body;
        
       
        if (!response.name || !response.dob || !response.contact) {
            return res.status(400).json({ 
                message: "Name, date of birth, and contact are required fields" 
            });
        }

        const createdPatient = await Patient.create(response);
        
        return res.status(201).json({
            message: "Patient has been created successfully",
            patient: createdPatient
        });

    } catch (error) {
     
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(422).json({ 
                message: "Validation failed",
                errors 
            });
        }
        
        
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Patient with this ID already exists"
            });
        }
        
        
        console.error("Error creating patient:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

module.exports = PatientInfo;