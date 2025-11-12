const { z } = require("zod");

const contactSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(256, { message: "Name must not exceed 255 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email format" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(256, { message: "Email must not exceed 255 characters" }),
  organization: z.string().trim().min(10).max(102),
  subject: z.string().trim().min(5).max(100),
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must not exceed 1000 characters" }),
});

module.exports = contactSchema;
