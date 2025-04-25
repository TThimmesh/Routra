const { generateRoadmap } = require('../services/aiService');

exports.generateRoadmap = async (req, res) => {
  const { idea } = req.body;

  if (!idea) {
    return res.status(400).json({ error: 'Missing startup idea' });
  }

  const roadmap = await generateRoadmap(idea);

  res.json({
    message: 'Roadmap generated!',
    input: idea,
    roadmap: roadmap
  });
};
