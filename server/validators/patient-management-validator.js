const { z } = require("zod");

// Schema for individual medication
const medicationSchema = z.object({
  name: z.string().min(1, "Medication name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  frequency: z.string().min(1, "Frequency is required"),
  prescribed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  doctor: z.string().min(3, "Doctor name must be at least 3 characters")
});

// Schema for medical history entries
const medicalHistorySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  doctor: z.string().min(3, "Doctor name must be at least 3 characters"),
  diagnosis: z.string().min(3, "Diagnosis is required"),
  treatment: z.string().min(3, "Treatment information is required")
});

// Main patient schema
const patientSchema = z.object({
  name: z
    .string({ required_error: "Patient name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(100, { message: "Name must not exceed 100 characters" }),

  dob: z
    .string({ required_error: "Date of birth is required" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),

  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be Male, Female, or Other"
  }),

  contact: z
    .string({ required_error: "Contact information is required" })
    .min(5, { message: "Contact must be at least 5 characters" })
    .max(100, { message: "Contact must not exceed 100 characters" }),

  address: z
    .string()
    .max(200, { message: "Address must not exceed 200 characters" })
    .optional(),

  insurance: z
    .string()
    .max(100, { message: "Insurance info must not exceed 100 characters" })
    .optional(),

  allergies: z
    .string()
    .max(500, { message: "Allergies info must not exceed 500 characters" })
    .optional()
    .default("None"),

  bloodType: z.enum(
    ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], 
    { invalid_type_error: "Invalid blood type" }
  ).optional().default("A+"),

  medications: z.array(medicationSchema).optional().default([]),
  history: z.array(medicalHistorySchema).optional().default([])
});


const validatePatient = (req, res, next) => {
  try {
    const validatedData = patientSchema.parse(req.body);
    req.validatedData = validatedData;
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      return res.status(422).json({
        message: "Validation failed",
        errors
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  patientSchema,
  validatePatient
};