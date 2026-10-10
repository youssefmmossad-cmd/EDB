import express from "express";

const app = express();

// ========== MIDDLEWARE ==========
// Log every request, then pass it on
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Read JSON request bodies into req.body
app.use(express.json());

// ========== DATABASE ==========
// Our fake database for now
let listings = [
  { id: 1, title: "Nile View Apartment", pricePerNight: 85 },
  { id: 2, title: "Beach House", pricePerNight: 140 },
  { id: 3, title: "Desert Eco-Lodge", pricePerNight: 60 },
];
let nextId = 4;

// ========== MODEL ==========
function getAllListings() {
  return listings;
}

function getListingById(id) {
  return listings.find((listing) => listing.id === id);
}

// ========== CONTROLLERS ==========
function handleGetAll(req, res) {
  res.json(getAllListings());
}

function handleGetOne(req, res) {
  const listing = getListingById(Number(req.params.id));
  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }
  res.json(listing);
}

// ========== ROUTES ==========
app.get("/", (req, res) => {
  res.send("Welcome to ebd bn'b");
});

app.get("/api/listings", handleGetAll);
app.get("/api/listings/:id", handleGetOne);

// ========== START ==========
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});