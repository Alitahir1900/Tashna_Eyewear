export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string | null;
  basePrice: number;
  categoryId: string;
  category: Category;
  isFeatured: boolean;
  isNew: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
  reviews?: Review[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  color?: string | null;
  size?: string | null;
  material?: string | null;
  priceDifference: number;
  stockQuantity: number;
  lowStockThreshold: number;
  isActive: boolean;
  product?: Product;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText?: string | null;
  order: number;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  products?: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string | null;
  user?: any;
  guestEmail?: string | null;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  shippingName: string;
  shippingEmail: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
  trackingNumber?: string | null;
  notes?: string | null;
  prescriptionData?: any;
  prescriptionFileUrl?: string | null;
  orderItems: OrderItem[];
  orderStatusHistory?: OrderStatusHistory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productVariantId: string;
  productVariant: ProductVariant;
  productName: string;
  variantDetails: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  createdAt: Date;
}

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  status: OrderStatus;
  note?: string | null;
  createdBy?: string | null;
  createdAt: Date;
}

export interface CartItem {
  id: string;
  userId?: string | null;
  sessionId?: string | null;
  productVariantId: string;
  productVariant: ProductVariant & { product: Product };
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  createdAt: Date;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  user: any;
  rating: number;
  comment: string;
  isApproved: boolean;
  adminResponse?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  userId: string;
  label?: string | null;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum PaymentMethod {
  JAZZCASH = "JAZZCASH",
  EASYPAISA = "EASYPAISA",
  CARD = "CARD",
  BANK_TRANSFER = "BANK_TRANSFER",
  COD = "COD",
}

export enum Role {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  ORDER_FULFILLMENT = "ORDER_FULFILLMENT",
}
