export const projects = [
  {
    id: "1",
    name: "Modern Villa",
    client: "Alice Johnson",
    location: "Beverly Hills, CA",
    startDate: "2024-01-15",
    expectedCompletion: "2024-12-15",
    status: "In Progress",
    progress: 45,
    budget: "$850,000",
    received: "$350,000",
    pending: "$500,000",
    stages: [
      { name: "Layout", status: "Completed" },
      { name: "Excavation", status: "Completed" },
      { name: "Foundation", status: "Completed" },
      { name: "Structure", status: "In Progress" },
      { name: "Brick Work", status: "Pending" },
      { name: "Plumbing", status: "Pending" },
      { name: "Electrical", status: "Pending" },
      { name: "Plaster", status: "Pending" },
      { name: "Flooring", status: "Pending" },
      { name: "Painting", status: "Pending" },
      { name: "Interior", status: "Pending" },
      { name: "Final Handover", status: "Pending" },
    ],
  },
  {
    id: "2",
    name: "City Heights Apartment",
    client: "Bob Smith",
    location: "Downtown Seattle, WA",
    startDate: "2023-11-20",
    expectedCompletion: "2024-08-10",
    status: "In Progress",
    progress: 75,
    budget: "$1,200,000",
    received: "$900,000",
    pending: "$300,000",
    stages: [
      { name: "Layout", status: "Completed" },
      { name: "Excavation", status: "Completed" },
      { name: "Foundation", status: "Completed" },
      { name: "Structure", status: "Completed" },
      { name: "Brick Work", status: "Completed" },
      { name: "Plumbing", status: "Completed" },
      { name: "Electrical", status: "Completed" },
      { name: "Plaster", status: "In Progress" },
      { name: "Flooring", status: "Pending" },
      { name: "Painting", status: "Pending" },
      { name: "Interior", status: "Pending" },
      { name: "Final Handover", status: "Pending" },
    ],
  },
  {
    id: "3",
    name: "Lakeview Residence",
    client: "Charlie Brown",
    location: "Austin, TX",
    startDate: "2024-03-01",
    expectedCompletion: "2025-01-20",
    status: "Planned",
    progress: 10,
    budget: "$650,000",
    received: "$150,000",
    pending: "$500,000",
    stages: [
      { name: "Layout", status: "Completed" },
      { name: "Excavation", status: "In Progress" },
      { name: "Foundation", status: "Pending" },
      { name: "Structure", status: "Pending" },
      { name: "Brick Work", status: "Pending" },
      { name: "Plumbing", status: "Pending" },
      { name: "Electrical", status: "Pending" },
      { name: "Plaster", status: "Pending" },
      { name: "Flooring", status: "Pending" },
      { name: "Painting", status: "Pending" },
      { name: "Interior", status: "Pending" },
      { name: "Final Handover", status: "Pending" },
    ],
  },
];

export const tasks = [
  {
    id: "1",
    name: "Foundation Inspection",
    project: "Modern Villa",
    stage: "Foundation",
    worker: "John Doe",
    deadline: "2024-03-20",
    status: "Pending",
  },
  {
    id: "2",
    name: "Electrical Wiring - Floor 1",
    project: "City Heights Apartment",
    stage: "Electrical",
    worker: "Mike Ross",
    deadline: "2024-03-18",
    status: "In Progress",
  },
  {
    id: "3",
    name: "Plastering - Exterior Wall",
    project: "City Heights Apartment",
    stage: "Plaster",
    worker: "Sarah Lane",
    deadline: "2024-03-15",
    status: "Completed",
  },
  {
    id: "4",
    name: "Structure Beam Reinforcement",
    project: "Modern Villa",
    stage: "Structure",
    worker: "Robert Paulson",
    deadline: "2024-03-22",
    status: "In Progress",
  },
];

export const workers = [
  { id: "1", name: "John Doe", type: "Mason", phone: "555-0123", rate: "$150/day", assignedProjects: ["Modern Villa"] },
  { id: "2", name: "Mike Ross", type: "Electrician", phone: "555-0124", rate: "$200/day", assignedProjects: ["City Heights Apartment"] },
  { id: "3", name: "Sarah Lane", type: "Painter", phone: "555-0125", rate: "$120/day", assignedProjects: ["City Heights Apartment"] },
  { id: "4", name: "Robert Paulson", type: "Plumber", phone: "555-0126", rate: "$180/day", assignedProjects: ["Modern Villa"] },
];

export const clients = [
  { id: "1", name: "Alice Johnson", phone: "555-1001", email: "alice@example.com", projects: ["Modern Villa"], paymentStatus: "Paid" },
  { id: "2", name: "Bob Smith", phone: "555-1002", email: "bob@example.com", projects: ["City Heights Apartment"], paymentStatus: "Pending" },
  { id: "3", name: "Charlie Brown", phone: "555-1003", email: "charlie@example.com", projects: ["Lakeview Residence"], paymentStatus: "Overdue" },
];

export const siteUpdates = [
  { id: "1", project: "Modern Villa", update: "Foundation completed, moving to structure.", date: "2024-03-12", progress: 40, photos: 4 },
  { id: "2", project: "City Heights Apartment", update: "Plastering in progress on floor 2.", date: "2024-03-13", progress: 75, photos: 6 },
  { id: "3", project: "Lakeview Residence", update: "Excavation started today.", date: "2024-03-14", progress: 10, photos: 2 },
];

export const messages = [
  { id: "1", from: "Alice Johnson", text: "When can we expect the next site visit?", date: "10:30 AM", unread: true },
  { id: "2", from: "Bob Smith", text: "Please share the updated plumbing layout.", date: "Yesterday", unread: false },
];

export const calendarEvents = [
  { date: "2024-03-20", title: "Plumbing Start - Modern Villa", type: "Plumbing" },
  { date: "2024-03-25", title: "Electrical Start - City Heights", type: "Electrical" },
  { date: "2024-04-10", title: "Plaster Start - Lakeview", type: "Plaster" },
];

export const payments = [
  { id: "1", project: "Modern Villa", milestone: "Foundation Payment", amount: "$50,000", status: "Paid", date: "2024-02-10" },
  { id: "2", project: "Modern Villa", milestone: "Structure Payment", amount: "$75,000", status: "Pending", date: "2024-04-15" },
  { id: "3", project: "City Heights Apartment", milestone: "Initial Payment", amount: "$100,000", status: "Paid", date: "2023-12-01" },
];
