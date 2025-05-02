// controllers/roadmapController.js
const { generateRoadmap: generateFromAI } = require('../services/aiService');

exports.generateRoadmap = async (req, res) => {
  const { idea } = req.body;

  if (!idea) {
    return res.status(400).json({ error: "Missing startup idea" });
  }

  try {
    const roadmap = await generateFromAI(idea);

    // Validate that the result is an array (as expected by the frontend)
    if (!Array.isArray(roadmap)) {
      console.error("❌ Roadmap is not an array:", roadmap);
      return res.status(500).json({
        error: "AI failed to generate a valid roadmap.",
        roadmap: [],
      });
    }

    res.status(200).json({
      message: "Roadmap generated!",
      input: idea,
      roadmap,
    });
  } catch (err) {
    console.error("❌ Unexpected server error:", err.message || err);
    res.status(500).json({
      error: "Internal server error",
      roadmap: [],
    });
  }
};
