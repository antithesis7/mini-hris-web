const LEAVE_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

const LEAVE_STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  approved: "bg-green-100 text-green-700 border-green-300",
  rejected: "bg-red-100 text-red-700 border-red-300",
};

const LEAVE_TYPES = {
  ANNUAL: 1,
  SICK: 2,
  UNPAID: 3,
  ON_DUTY: 4,
  MATERNITY: 5,
  PATERNITY: 6,
};

export { 
    LEAVE_STATUS, 
    LEAVE_STATUS_COLORS, 
    LEAVE_TYPES, 
};