type RoadmapStep = {
  title: string;
};

type RoadmapPhase = {
  phase: string;
  steps: RoadmapStep[];
};

type RoadmapData = {
  roadmap: RoadmapPhase[];
};

export const demoRoadmaps: Record<string, RoadmapData> = {
    "Build a meditation app": {
      roadmap: [
        {
          phase: "Planning",
          steps: [
            { title: "Research market & user needs" },
            { title: "Define MVP features" },
            { title: "Sketch wireframes" },
          ],
        },
        {
          phase: "Development",
          steps: [
            { title: "Build React Native frontend" },
            { title: "Integrate guided breathing audio" },
            { title: "Test on iOS and Android" },
          ],
        },
      ],
    },
  
    "Start a newsletter": {
      roadmap: [
        {
          phase: "Setup",
          steps: [
            { title: "Choose Substack or Beehiiv" },
            { title: "Design email template" },
          ],
        },
        {
          phase: "Launch",
          steps: [
            { title: "Write intro post" },
            { title: "Promote on social media" },
            { title: "Invite first 100 subscribers" },
          ],
        },
      ],
    },
  
    "Launch a niche job board": {
      roadmap: [
        {
          phase: "Discovery",
          steps: [
            { title: "Pick a target niche (e.g., ethical AI)" },
            { title: "Research competitors" },
          ],
        },
        {
          phase: "Build",
          steps: [
            { title: "Set up job board software" },
            { title: "Enable employer posting & payments" },
          ],
        },
      ],
    },
  
    "Create a productivity tool for ADHD": {
      roadmap: [
        {
          phase: "Research",
          steps: [
            { title: "Interview neurodivergent users" },
            { title: "Analyze needs for time-blocking" },
          ],
        },
        {
          phase: "Prototype",
          steps: [
            { title: "Design daily planner UI" },
            { title: "Test with beta group" },
          ],
        },
      ],
    },
  };
  