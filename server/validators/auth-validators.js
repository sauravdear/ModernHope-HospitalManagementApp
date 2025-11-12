const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least three characters" })
    .max(256, { message: "Name must not exceed 255 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "The email is invalid" })
    .min(3, { message: "Email must at least 3 characters" })
    .max(256, { message: "Email must not exceed 255 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "The number should be at least 10 characters" })
    .max(20, { message: "The number should be less than 20 characters" }),

  facility: z
    .string({ required_error: "Facility is required" })
    .trim()
    .min(2, { message: "Facility must be at least 2 characters" })
    .max(256, { message: "Facility must not exceed 255 characters" }),

  facilityType: z
    .string({ required_error: "Facility type is required" })
    .trim()
    .min(2, { message: "Facility type must be at least 2 characters" })
    .max(256, { message: "Facility type must not exceed 255 characters" }),

  password: z
    .string({ required_error: "The password is required" })
    .trim()
    .min(8, { message: "The password should be at least 8 characters" })
    .max(1024, { message: "The password should not exceed 1024 characters" }),

  role: z
    .enum(['patient', 'doctor', 'admin'], { 
      required_error: "Role is required",
      invalid_type_error: "Role must be patient, doctor, or admin"
    })
    .default('patient'),

  // Optional doctor-specific fields (required when role is 'doctor')
  specialization: z
    .string()
    .trim()
    .min(2, { message: "Specialization must be at least 2 characters" })
    .max(100, { message: "Specialization must not exceed 100 characters" })
    .optional(),

  department: z
    .string()
    .trim()
    .min(2, { message: "Department must be at least 2 characters" })
    .max(100, { message: "Department must not exceed 100 characters" })
    .optional(),

  experience: z
    .number()
    .min(0, { message: "Experience cannot be negative" })
    .max(60, { message: "Experience seems too high" })
    .optional()
    .default(0),

  consultationFee: z
    .number()
    .min(0, { message: "Consultation fee cannot be negative" })
    .max(10000, { message: "Consultation fee seems too high" })
    .optional()
    .default(50),

  qualifications: z
    .array(z.string())
    .optional()
    .default([]),

  // Optional patient-specific fields
  dateOfBirth: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format"
    }),

  gender: z
    .enum(['male', 'female', 'other'], {
      invalid_type_error: "Gender must be male, female, or other"
    })
    .optional(),

  bloodGroup: z
    .string()
    .trim()
    .max(10, { message: "Blood group must not exceed 10 characters" })
    .optional(),

  address: z
    .object({
      street: z.string().trim().optional(),
      city: z.string().trim().optional(),
      state: z.string().trim().optional(),
      zipCode: z.string().trim().optional()
    })
    .optional()
}).refine((data) => {
  // Additional validation for doctors
  if (data.role === 'doctor') {
    if (!data.specialization) {
      throw new Error("Specialization is required for doctors");
    }
    if (!data.department) {
      throw new Error("Department is required for doctors");
    }
  }
  return true;
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email format" })
    .min(3, { message: "Email must at least 3 characters" })
    .max(256, { message: "Email must not exceed 255 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(1024, { message: "Password should not exceed 1024 characters" }),

  remember: z.boolean().optional(), 
});

// Additional validation schemas for specific operations
const updateProfileSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least three characters" })
    .max(256, { message: "Name must not exceed 255 characters" })
    .optional(),

  phone: z
    .string()
    .trim()
    .min(10, { message: "The number should be at least 10 characters" })
    .max(20, { message: "The number should be less than 20 characters" })
    .optional(),

  dateOfBirth: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format"
    }),

  gender: z
    .enum(['male', 'female', 'other'])
    .optional(),

  bloodGroup: z
    .string()
    .trim()
    .max(10)
    .optional(),

  address: z
    .object({
      street: z.string().trim().optional(),
      city: z.string().trim().optional(),
      state: z.string().trim().optional(),
      zipCode: z.string().trim().optional()
    })
    .optional(),

  specialization: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .optional(),

  department: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .optional(),

  experience: z
    .number()
    .min(0)
    .max(60)
    .optional(),

  consultationFee: z
    .number()
    .min(0)
    .max(10000)
    .optional()
});

const appointmentSchema = z.object({
  doctorId: z
    .string({ required_error: "Doctor ID is required" })
    .trim()
    .min(1, { message: "Doctor ID is required" }),

  appointmentDate: z
    .string({ required_error: "Appointment date is required" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format"
    }),

  appointmentTime: z
    .string({ required_error: "Appointment time is required" })
    .trim()
    .min(1, { message: "Appointment time is required" }),

  department: z
    .string({ required_error: "Department is required" })
    .trim()
    .min(2, { message: "Department must be at least 2 characters" }),

  specialization: z
    .string({ required_error: "Specialization is required" })
    .trim()
    .min(2, { message: "Specialization must be at least 2 characters" }),

  symptoms: z
    .string({ required_error: "Symptoms are required" })
    .trim()
    .min(10, { message: "Please describe symptoms in detail (at least 10 characters)" })
    .max(1000, { message: "Symptoms description too long" }),

  notes: z
    .string()
    .trim()
    .max(500, { message: "Notes too long" })
    .optional()
    .default("")
});

module.exports = {
  signupSchema,
  loginSchema,
  updateProfileSchema,
  appointmentSchema
};