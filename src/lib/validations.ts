import { z } from "zod";

// Auth validations
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Product validations
export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().optional(),
  basePrice: z.number().positive("Price must be positive"),
  categoryId: z.string().min(1, "Category is required"),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(false),
});

export const variantSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  color: z.string().optional(),
  size: z.string().optional(),
  material: z.string().optional(),
  priceDifference: z.number().default(0),
  stockQuantity: z.number().int().min(0, "Stock cannot be negative"),
  lowStockThreshold: z.number().int().default(5),
});

// Order validations
export const shippingSchema = z.object({
  shippingName: z.string().min(2, "Name is required"),
  shippingEmail: z.string().email("Invalid email address"),
  shippingPhone: z.string().min(10, "Valid phone number is required"),
  shippingAddress: z.string().min(5, "Address is required"),
  shippingCity: z.string().min(2, "City is required"),
  shippingPostalCode: z.string().min(4, "Postal code is required"),
  shippingCountry: z.string().default("Pakistan"),
});

export const prescriptionSchema = z.object({
  rightEye: z.object({
    sph: z.number().optional(),
    cyl: z.number().optional(),
    axis: z.number().optional(),
    add: z.number().optional(),
  }).optional(),
  leftEye: z.object({
    sph: z.number().optional(),
    cyl: z.number().optional(),
    axis: z.number().optional(),
    add: z.number().optional(),
  }).optional(),
  pd: z.number().optional(),
}).optional();

// Review validation
export const reviewSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  rating: z.number().int().min(1).max(5, "Rating must be between 1 and 5"),
  comment: z.string().min(10, "Review must be at least 10 characters"),
});

// Address validation
export const addressSchema = z.object({
  label: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  country: z.string().default("Pakistan"),
  isDefault: z.boolean().default(false),
});

// Category validation
export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  image: z.string().optional(),
});
