// services/aiService.js
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateRoadmap = async (idea) => {
  const prompt = `Create a detailed startup roadmap based on the following idea:\n\n"${idea}"\n\nBreak the roadmap into clear phases. For each phase, list steps (numbered like 1., 2., etc.) and include bullet point substeps if needed. Format clearly and use consistent structure.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const output = completion.choices[0].message.content;
    console.log("🔍 RAW AI RESPONSE:\n", output); // Debug: see what the AI generated

    const formatRoadmap = (text) => {
      const phaseSections = text.split(/(?:\*\*|##)?\s*Phase\s+\d+[:\-]?\s*/gi).slice(1);

      if (phaseSections.length === 0) {
        console.warn("⚠️ No phases found in AI response.");
        return [];
      }

      return phaseSections.map((phaseBlock, index) => {
        const [titleLine, ...rest] = phaseBlock.trim().split('\n\n');
        const [title, weeks] = titleLine?.split(' (') || [`Phase ${index + 1}`, 'TBD'];

        const lines = rest.join('\n').split('\n').map(l => l.trim()).filter(Boolean);

        const steps = [];
        let currentStep = null;

        lines.forEach(line => {
          if (/^\d+[\.\)]\s*/.test(line)) {
            if (currentStep) steps.push(currentStep);
            currentStep = {
              title: line.replace(/^\d+[\.\)]\s*/, '').replace(/\*\*/g, '').trim(),
              substeps: []
            };
          } else if (/^[-*]\s+/.test(line)) {
            const clean = line.replace(/^[-*]\s+/, '').replace(/\*\*/g, '').trim();
            if (currentStep) currentStep.substeps.push(clean);
          } else {
            if (currentStep && line.length > 0) {
              currentStep.substeps.push(line);
            }
          }
        });

        if (currentStep) steps.push(currentStep);

        return {
          phase: title?.trim() || `Phase ${index + 1}`,
          weeks: weeks?.replace(')', '').trim() || 'TBD',
          steps
        };
      });
    };

    return formatRoadmap(output);

  } catch (error) {
    console.error('❌ OpenAI generation error:', error.response?.data || error.message);
    return 'OpenAI generation failed.';
  }
};
