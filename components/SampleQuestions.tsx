"use client";

const QUESTIONS = [
  "What yeast strains work best for a dry English-style cider?",
  "How do I manage malic acid levels during fermentation?",
  "What quality benchmarks should I use for sensory evaluation?",
  "How does SO₂ management affect cider stability and shelf life?",
];

type Props = {
  onSelect: (question: string) => void;
  disabled?: boolean;
};

export function SampleQuestions({ onSelect, disabled }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p
        className="text-[10px] font-light uppercase tracking-[2px] text-[#3d3d3d]/40"
        style={{ fontFamily: "var(--font-lato)" }}
      >
        Try asking
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            disabled={disabled}
            className="glass-chip px-4 py-3 text-left text-sm text-[#3d3d3d]/65 hover:text-[#852d2d] disabled:cursor-not-allowed disabled:opacity-50"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
