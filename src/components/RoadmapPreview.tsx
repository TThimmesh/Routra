import React from 'react';

type Substep = string;

type Step = {
  title: string;
  substeps?: Substep[];
};

type Phase = {
  phase: string;
  weeks: string;
  steps: Step[];
};

type RoadmapPreviewProps = {
  roadmapData: Phase[];
  onEdit: () => void;
};

const RoadmapPreview: React.FC<RoadmapPreviewProps> = ({ roadmapData, onEdit }) => {
  if (!roadmapData || roadmapData.length === 0) return null;

  return (
    <div className="relative max-w-4xl mx-auto mt-6 px-4">
      <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-6 overflow-hidden shadow-xl">
        <div className="max-h-[300px] overflow-hidden opacity-20 pointer-events-none select-none">
          {roadmapData.map((phase, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-lg font-semibold text-indigo-600">{phase.phase}</h3>
              <p className="text-xs text-gray-500 mb-2">{phase.weeks}</p>
              {phase.steps?.map((step, sIdx) => (
                <div key={sIdx} className="mb-2">
                  <p className="font-medium text-sm">{step.title}</p>
                  <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-300 ml-4">
                    {step.substeps?.map((sub, subIdx) => (
                      <li key={subIdx}>{sub}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button
            onClick={onEdit}
            className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 shadow-lg transition pointer-events-auto"
          >
            Start Editing
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPreview;
