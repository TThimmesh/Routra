// controllers/roadmapController.js
exports.generateRoadmap = async (req, res) => {
    console.log('Received POST request with:', req.body); // <--- this is the log
  
    const { idea } = req.body;
  
    res.json({
      message: 'Roadmap generated!',
      input: idea,
      mockRoadmap: [
        { step: 'Define MVP', due: 'Week 1' },
        { step: 'Build landing page', due: 'Week 2' },
        { step: 'Start beta list', due: 'Week 3' }
      ]
    });
  };
  