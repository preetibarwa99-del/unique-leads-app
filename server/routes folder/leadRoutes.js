const express = require("express");
const router = express.Router();
// const Lead = require("./models/Lead");
const Lead = require("../models folder/Lead");

// GET ALL LEADS
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch leads",
      error: error.message
    });
  }
});

// ADD LEAD
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, company, status } = req.body;

    const lead = new Lead({
      name,
      email,
      phone,
      company,
      status: status || "New"
    });

    const savedLead = await lead.save();

    res.status(201).json(savedLead);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create lead",
      error: error.message
    });
  }
});

// UPDATE STATUS
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found"
      });
    }

    res.json(lead);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update lead",
      error: error.message
    });
  }
});

// DELETE LEAD
router.delete("/:id", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found"
      });
    }

    res.json({
      message: "Lead deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete lead",
      error: error.message
    });
  }
});

module.exports = router;