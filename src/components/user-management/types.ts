export type UserRole =
  | "Service Provider"
  | "Property Manager"
  | "Contractor"
  | "Property Owner"
  | "Property Partner"
  | "Vendor"
  | "Admin Asst."
  | "Admin";

export type UserStatus = "Active" | "Pending" | "Suspended";

export type UserItem = {
  id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  status: UserStatus;
  joinedDate: string;
  lastLogin: string;
};

export const initialUsersList: UserItem[] = [
  {
    id: "USR-001",
    name: "James Okafor",
    email: "j.okafor@gmail.com",
    username: "diaz1",
    role: "Service Provider",
    status: "Pending",
    joinedDate: "Jun 25, 2026",
    lastLogin: "Never",
  },
  {
    id: "USR-002",
    name: "Nina Patel",
    email: "n.patel@properties.com",
    username: "nichol21",
    role: "Property Manager",
    status: "Active",
    joinedDate: "Mar 3, 2026",
    lastLogin: "Yesterday",
  },
  {
    id: "USR-003",
    name: "Carlos Rivera",
    email: "carlos.r@email.com",
    username: "bka4",
    role: "Contractor",
    status: "Active",
    joinedDate: "Feb 20, 2026",
    lastLogin: "Jun 24, 2026",
  },
  {
    id: "USR-004",
    name: "Tom Wilson",
    email: "t.wilson@contracting.com",
    username: "kubah5",
    role: "Contractor",
    status: "Active",
    joinedDate: "Jan 30, 2026",
    lastLogin: "Jun 22, 2026",
  },
  {
    id: "USR-005",
    name: "Lisa Park",
    email: "lisa.p@realty.com",
    username: "lsosh6",
    role: "Property Manager",
    status: "Active",
    joinedDate: "Nov 12, 2025",
    lastLogin: "Jun 25, 2026",
  },
  {
    id: "USR-006",
    name: "Alex Morgan",
    email: "alex.m@projexpro.com",
    username: "alexm",
    role: "Admin",
    status: "Active",
    joinedDate: "Jan 15, 2026",
    lastLogin: "Today",
  },
  {
    id: "USR-007",
    name: "David Sterling",
    email: "david.s@sterling.com",
    username: "dsterling",
    role: "Property Manager",
    status: "Active",
    joinedDate: "Apr 10, 2026",
    lastLogin: "Jun 20, 2026",
  },
  {
    id: "USR-008",
    name: "Elena Rostova",
    email: "elena@sparkleclean.com",
    username: "erostova",
    role: "Service Provider",
    status: "Pending",
    joinedDate: "May 5, 2026",
    lastLogin: "Never",
  },
  {
    id: "USR-009",
    name: "Robert Vance",
    email: "robert@vance.com",
    username: "rvance",
    role: "Property Owner",
    status: "Active",
    joinedDate: "Feb 1, 2026",
    lastLogin: "Jun 18, 2026",
  },
  {
    id: "USR-010",
    name: "Marcus Sterling",
    email: "m.sterling@apexpartner.com",
    username: "msterling",
    role: "Property Partner",
    status: "Active",
    joinedDate: "Mar 14, 2026",
    lastLogin: "Today",
  },
  {
    id: "USR-011",
    name: "David Miller",
    email: "david@fastflowvendor.com",
    username: "dmiller",
    role: "Vendor",
    status: "Active",
    joinedDate: "Jan 12, 2026",
    lastLogin: "Yesterday",
  },
  {
    id: "USR-012",
    name: "Samantha Wright",
    email: "s.wright@projexpro.com",
    username: "swright",
    role: "Admin Asst.",
    status: "Active",
    joinedDate: "Apr 02, 2026",
    lastLogin: "Today",
  },
];
