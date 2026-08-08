export type TransactionType = "Income" | "Payout" | "Refund";
export type TransactionStatus = "Completed" | "Pending" | "Failed";

export type TransactionItem = {
  id: string;
  date: string;
  description: string;
  partner: string;
  type: TransactionType;
  amount: number;
  paymentMethod: string;
  status: TransactionStatus;
};

export type MainInvoiceTab =
  | "property-partner-invoices"
  | "vendor-payments"
  | "platform-commissions"
  | "subscription-billings";

export type PropertyInvoiceStatusFilter =
  | "All"
  | "Paid"
  | "Overdue"
  | "Billed"
  | "Failed Payment";

export type SubscriptionBillingStatusFilter =
  | "All"
  | "Active Subscriptions"
  | "Trial Periods"
  | "Cancelled Plans";

// 1. Property Partner Invoices Data Model
export interface PropertyPartnerInvoice {
  id: string;
  date: string;
  description: string;
  partner: string;
  category: "Subscription Renewal" | "Work Order Fee" | "Specialized Job Invoice";
  amount: number;
  paymentMethod: string;
  status: "Paid" | "Overdue" | "Billed" | "Failed Payment";
}

// 2. Vendor Payments Data Model
export interface VendorPaymentItem {
  id: string;
  date: string;
  vendorName: string;
  type: "Completed Job Payout" | "Specialized Rate Job" | "Refund" | "Credit" | "Payback";
  workOrder: string;
  amount: number;
  paymentMethod: string;
  status: "Pending Payout" | "Processing" | "Paid" | "Failed";
}

// 3. Platform Commissions Data Model
export interface PlatformCommissionItem {
  id: string;
  date: string;
  workOrder: string;
  property: string;
  vendorName: string;
  totalJobAmount: number;
  commissionRate: string;
  platformCommission: number;
  paymentMethod: string;
  status: "Collected" | "Pending Split" | "Completed";
}

// 4. Subscription Billings Data Model
export interface SubscriptionBillingItem {
  id: string;
  date: string;
  partner: string;
  planName: string;
  tier: "Enterprise" | "Professional" | "Basic";
  amount: number;
  billingCycle: "Monthly" | "Annual";
  paymentMethod: string;
  status: "Active Subscriptions" | "Trial Periods" | "Cancelled Plans";
}

// Initial Mock Data: Property Partner Invoices
export const initialPropertyPartnerInvoices: PropertyPartnerInvoice[] = [
  {
    id: "INV-9021",
    date: "Jun 26, 2026",
    description: "Monthly subscription renewal - Sunset Towers",
    partner: "Sunset Apartments LLC",
    category: "Subscription Renewal",
    amount: 2500,
    paymentMethod: "Credit Card (Visa ****4242)",
    status: "Paid",
  },
  {
    id: "INV-9022",
    date: "Jun 25, 2026",
    description: "Work order fee - Electrical Repair SR-1290",
    partner: "Maple Properties LLC",
    category: "Work Order Fee",
    amount: 450,
    paymentMethod: "ACH Bank Transfer",
    status: "Paid",
  },
  {
    id: "INV-9023",
    date: "Jun 24, 2026",
    description: "Specialized job invoice - HVAC Overhaul",
    partner: "Harbor Point Realty",
    category: "Specialized Job Invoice",
    amount: 3800,
    paymentMethod: "Bank Wire",
    status: "Overdue",
  },
  {
    id: "INV-9024",
    date: "Jun 23, 2026",
    description: "Monthly subscription renewal - Professional Tier",
    partner: "Oak Heights Group",
    category: "Subscription Renewal",
    amount: 1200,
    paymentMethod: "Credit Card (MC ****8812)",
    status: "Billed",
  },
  {
    id: "INV-9025",
    date: "Jun 22, 2026",
    description: "Work order fee - Plumbing Repair SR-1284",
    partner: "Greenview Developments",
    category: "Work Order Fee",
    amount: 280,
    paymentMethod: "Credit Card (Visa ****1109)",
    status: "Failed Payment",
  },
  {
    id: "INV-9026",
    date: "Jun 21, 2026",
    description: "Specialized job invoice - Certified Electrician",
    partner: "Elmwood Properties",
    category: "Specialized Job Invoice",
    amount: 1950,
    paymentMethod: "ACH Bank Transfer",
    status: "Overdue",
  },
  {
    id: "INV-9027",
    date: "Jun 20, 2026",
    description: "Work order fee - Roof Maintenance SR-1279",
    partner: "Westpark Commercial",
    category: "Work Order Fee",
    amount: 850,
    paymentMethod: "Bank Wire",
    status: "Paid",
  },
];

// Initial Mock Data: Vendor Payments
export const initialVendorPayments: VendorPaymentItem[] = [
  {
    id: "VPAY-4410",
    date: "Jun 26, 2026",
    vendorName: "Mike Chen (Plumbing)",
    type: "Completed Job Payout",
    workOrder: "SR-1293",
    amount: 890,
    paymentMethod: "Direct Deposit (Stripe Connect)",
    status: "Pending Payout",
  },
  {
    id: "VPAY-4411",
    date: "Jun 25, 2026",
    vendorName: "Nina Patel (Electrical)",
    type: "Specialized Rate Job",
    workOrder: "SR-1292",
    amount: 1250,
    paymentMethod: "ACH Direct Transfer",
    status: "Pending Payout",
  },
  {
    id: "VPAY-4412",
    date: "Jun 24, 2026",
    vendorName: "Tom Wilson (HVAC)",
    type: "Completed Job Payout",
    workOrder: "SR-1291",
    amount: 620,
    paymentMethod: "Direct Deposit (Stripe Connect)",
    status: "Pending Payout",
  },
  {
    id: "VPAY-4413",
    date: "Jun 23, 2026",
    vendorName: "Lisa Park (Cleaning)",
    type: "Refund",
    workOrder: "SR-1288",
    amount: 150,
    paymentMethod: "Platform Credit",
    status: "Paid",
  },
  {
    id: "VPAY-4414",
    date: "Jun 22, 2026",
    vendorName: "Alex Kumar (Painting)",
    type: "Specialized Rate Job",
    workOrder: "SR-1285",
    amount: 980,
    paymentMethod: "Direct Deposit (Stripe Connect)",
    status: "Pending Payout",
  },
  {
    id: "VPAY-4415",
    date: "Jun 21, 2026",
    vendorName: "Carlos Rivera (Roofing)",
    type: "Payback",
    workOrder: "SR-1280",
    amount: 400,
    paymentMethod: "ACH Direct Transfer",
    status: "Paid",
  },
  {
    id: "VPAY-4416",
    date: "Jun 20, 2026",
    vendorName: "Danielle Vance (Carpentry)",
    type: "Credit",
    workOrder: "SR-1275",
    amount: 220,
    paymentMethod: "Platform Credit",
    status: "Pending Payout",
  },
];

// Initial Mock Data: Platform Commissions
export const initialPlatformCommissions: PlatformCommissionItem[] = [
  {
    id: "COM-1081",
    date: "Jun 26, 2026",
    workOrder: "SR-1293",
    property: "Maple Residences",
    vendorName: "Mike Chen (Plumbing)",
    totalJobAmount: 890,
    commissionRate: "15%",
    platformCommission: 133.5,
    paymentMethod: "Stripe Automatic Split",
    status: "Collected",
  },
  {
    id: "COM-1082",
    date: "Jun 25, 2026",
    workOrder: "SR-1292",
    property: "Sunset Towers",
    vendorName: "Nina Patel (Electrical)",
    totalJobAmount: 1250,
    commissionRate: "15%",
    platformCommission: 187.5,
    paymentMethod: "Stripe Automatic Split",
    status: "Collected",
  },
  {
    id: "COM-1083",
    date: "Jun 24, 2026",
    workOrder: "SR-1291",
    property: "Harbor Point Realty",
    vendorName: "Tom Wilson (HVAC)",
    totalJobAmount: 620,
    commissionRate: "12%",
    platformCommission: 74.4,
    paymentMethod: "Stripe Automatic Split",
    status: "Pending Split",
  },
  {
    id: "COM-1084",
    date: "Jun 23, 2026",
    workOrder: "SR-1289",
    property: "Oak Heights Group",
    vendorName: "Alex Kumar (Painting)",
    totalJobAmount: 1500,
    commissionRate: "15%",
    platformCommission: 225.0,
    paymentMethod: "Stripe Automatic Split",
    status: "Collected",
  },
  {
    id: "COM-1085",
    date: "Jun 22, 2026",
    workOrder: "SR-1285",
    property: "Greenview Developments",
    vendorName: "Carlos Rivera (Roofing)",
    totalJobAmount: 3200,
    commissionRate: "10%",
    platformCommission: 320.0,
    paymentMethod: "Stripe Automatic Split",
    status: "Completed",
  },
];

// Initial Mock Data: Subscription Billings
export const initialSubscriptionBillings: SubscriptionBillingItem[] = [
  {
    id: "SUB-8012",
    date: "Jun 26, 2026",
    partner: "Sunset Apartments LLC",
    planName: "Enterprise Tier Plan",
    tier: "Enterprise",
    amount: 2500,
    billingCycle: "Monthly",
    paymentMethod: "Credit Card (Visa ****4242)",
    status: "Active Subscriptions",
  },
  {
    id: "SUB-8013",
    date: "Jun 25, 2026",
    partner: "Harbor Point Realty",
    planName: "Professional Tier Plan",
    tier: "Professional",
    amount: 1200,
    billingCycle: "Monthly",
    paymentMethod: "Credit Card (MC ****8812)",
    status: "Active Subscriptions",
  },
  {
    id: "SUB-8014",
    date: "Jun 24, 2026",
    partner: "Oakwood Estates",
    planName: "Enterprise Tier Plan (Annual)",
    tier: "Enterprise",
    amount: 24000,
    billingCycle: "Annual",
    paymentMethod: "ACH Direct Debit",
    status: "Trial Periods",
  },
  {
    id: "SUB-8015",
    date: "Jun 23, 2026",
    partner: "Greenview Developments",
    planName: "Basic Tier Plan",
    tier: "Basic",
    amount: 499,
    billingCycle: "Monthly",
    paymentMethod: "Credit Card (Visa ****1109)",
    status: "Cancelled Plans",
  },
  {
    id: "SUB-8016",
    date: "Jun 22, 2026",
    partner: "Westpark Commercial",
    planName: "Enterprise Tier Plan",
    tier: "Enterprise",
    amount: 2500,
    billingCycle: "Monthly",
    paymentMethod: "Credit Card (Amex ****3001)",
    status: "Active Subscriptions",
  },
];

// Legacy list for fallback
export const initialTransactionsList: TransactionItem[] = [
  {
    id: "TXN-8847",
    date: "Jun 26, 2026",
    description: "Monthly rent - Maple Residences",
    partner: "Maple Properties LLC",
    type: "Income",
    amount: 8400,
    paymentMethod: "Bank Transfer",
    status: "Completed",
  },
  {
    id: "TXN-8846",
    date: "Jun 25, 2026",
    description: "Service payment - Plumbing SR-1293",
    partner: "Mike Chen (Contractor)",
    type: "Payout",
    amount: 890,
    paymentMethod: "Direct Deposit",
    status: "Completed",
  },
  {
    id: "TXN-8845",
    date: "Jun 25, 2026",
    description: "Monthly subscription - Enterprise plan",
    partner: "Harbor Point Realty",
    type: "Income",
    amount: 2500,
    paymentMethod: "Credit Card",
    status: "Completed",
  },
];
