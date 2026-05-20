"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type ShowcaseItem = {
  id: string;
  title: string;
  description: string;
  images?: string;
};

type ShowcaseTab = {
  id: string;
  label: string;
  summary: string;
  items: ShowcaseItem[];
};

const showcaseTabs: ShowcaseTab[] = [
  {
    id: "use-cases",
    label: "Use cases",
    summary:
      "Pick a workflow and the panel adapts with the same calm rhythm as the FAQ block, but with richer interaction.",
    items: [
      {
        id: "code-review",
        title: "Code review",
        description: "Build, debug, and ship faster without losing rigor.",
        images: "case1.png",
      },
      {
        id: "support-copilot",
        title: "Support copilot",
        description:
          "Resolve tickets with context from docs, product data, and tone.",
        images: "case2.png",
      },
      {
        id: "research-workflows",
        title: "Research workflows",
        description:
          "Sift through sources, summarize nuance, and keep evidence attached.",
      },
      {
        id: "operations-agents",
        title: "Operations agents",
        description:
          "Automate repeatable internal tasks while keeping a human in the loop.",
      },
    ],
  },
  {
    id: "industries",
    label: "Industries",
    summary:
      "The visual language stays steady while the examples shift to industry-specific language, risk, and outcomes.",
    items: [
      {
        id: "finance",
        title: "Finance",
        description:
          "Support analysts, operations, and reporting with controlled automation.",
      },
      {
        id: "healthcare",
        title: "Healthcare",
        description:
          "Reduce admin load while keeping communication clearer for staff and patients.",
      },
      {
        id: "retail",
        title: "Retail",
        description:
          "Give commerce, support, and content teams one sharper operating layer.",
      },
      {
        id: "legal",
        title: "Legal",
        description:
          "Support review-heavy work with fast summaries and source-backed comparison.",
      },
    ],
  },
  {
    id: "blueprints",
    label: "Blueprints",
    summary:
      "These are reusable starting points: clear inputs, predictable outputs, and room to customize the final shape.",
    items: [
      {
        id: "knowledge-hub",
        title: "Knowledge hub",
        description:
          "A reusable pattern for grounded answers across internal docs and handbooks.",
      },
      {
        id: "incident-desk",
        title: "Incident desk",
        description:
          "A response pattern for triage, summaries, and fast stakeholder updates.",
      },
      {
        id: "revenue-copilot",
        title: "Revenue copilot",
        description:
          "A pipeline-friendly pattern for sales research, prep, and follow-up.",
      },
      {
        id: "qa-orchestrator",
        title: "QA orchestrator",
        description:
          "A repeatable foundation for multi-step quality checks and release readiness.",
      },
    ],
  },
];

const initialActiveItems = Object.fromEntries(
  showcaseTabs.map((tab) => [tab.id, tab.items[0]?.id ?? ""]),
) as Record<string, string>;

const contentTransition = {
  duration: 0.35,
  ease: [0.22, 1, 0.36, 1] as const,
};

const layoutTransition = {
  type: "spring",
  stiffness: 360,
  damping: 32,
  mass: 0.85,
} as const;

const fallbackShowcaseImage = "/images/cases/case1.png";

const UseCasesBlock = () => {
  const [activeTabId, setActiveTabId] = useState(showcaseTabs[0]?.id ?? "");
  const [activeItemIds, setActiveItemIds] =
    useState<Record<string, string>>(initialActiveItems);

  const activeTab =
    showcaseTabs.find((tab) => tab.id === activeTabId) ?? showcaseTabs[0];
  const activeItem =
    activeTab.items.find((item) => item.id === activeItemIds[activeTab.id]) ??
    activeTab.items[0];
  const activeItemId =
    activeItem?.id ?? activeTab.items[0]?.id ?? "";
  const activeImageSrc = activeItem?.images
    ? `/images/cases/${activeItem.images}`
    : fallbackShowcaseImage;

  return (
    <section className="w-full bg-[#f4f2eb] px-6 py-25 md:px-10 lg:px-0">
      <div className="mx-auto max-w-340">
        <div className="mb-4 flex justify-center lg:mb-6">
          <div className="w-full overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div
              className="mx-auto inline-flex min-w-max items-center gap-1 rounded-[12px] border border-[#d3d0c8] bg-[#faf7f1]/90 p-1.5 backdrop-blur"
              role="tablist"
              aria-label="Use case categories"
            >
              {showcaseTabs.map((tab) => {
                const isActive = tab.id === activeTab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTabId(tab.id)}
                    className="relative rounded-[8px] px-4 py-2.5 text-[16px] leading-none font-medium tracking-[-0.025em] text-[#111111] transition-colors duration-300 sm:px-5"
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="showcase-tab-pill"
                        className="absolute inset-0 rounded-[10px] bg-[#111111]"
                        transition={layoutTransition}
                      />
                    ) : null}

                    <span
                      className={`relative z-10 transition-colors duration-300 ${
                        isActive ? "text-white" : "text-[#111111]/65"
                      }`}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[350px_1fr] lg:gap-[86px]">
          <div className="pt-[12px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeTab.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={contentTransition}
                className="mb-8 max-w-[330px] font-serif text-[18px] leading-[1.35] tracking-[-0.02em] text-[#5f5c56]"
              >
                {activeTab.summary}
              </motion.p>
            </AnimatePresence>

            <div>
              {activeTab.items.map((item) => {
                const isActive = item.id === activeItemId;

                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() =>
                      setActiveItemIds((current) => ({
                        ...current,
                        [activeTab.id]: item.id,
                      }))
                    }
                    className="group relative w-full rounded-[22px] px-4 py-[18px] text-left"
                  >
                    {isActive ? (
                      <motion.span
                        layoutId={`showcase-item-highlight-${activeTab.id}`}
                        className="absolute inset-0 rounded-[22px] bg-white/76"
                        transition={layoutTransition}
                      />
                    ) : null}

                    <span className="relative z-10 flex items-start justify-between gap-6">
                      <span className="min-w-0">
                        <span
                          className={`block text-[24px] leading-[1.08] font-semibold tracking-[-0.03em] transition-colors duration-300 ${
                            isActive
                              ? "text-[#111111]"
                              : "text-[#111111]/58 group-hover:text-[#111111]"
                          }`}
                        >
                          {item.title}
                        </span>

                        <AnimatePresence initial={false}>
                          {isActive ? (
                            <motion.span
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{
                                opacity: 1,
                                height: "auto",
                                marginTop: 16,
                              }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={contentTransition}
                              className="block overflow-hidden pr-6 font-serif text-[18px] leading-[1.35] tracking-[-0.02em] text-[#5f5c56]"
                            >
                              {item.description}
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                      </span>

                      <motion.span
                        animate={{
                          opacity: isActive ? 1 : 0.45,
                          x: isActive ? 0 : -4,
                        }}
                        transition={contentTransition}
                        className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d8d2c8] bg-white text-[#111111]"
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 fill-none stroke-current [stroke-width:1.5]"
                        >
                          <path d="M7 17 17 7" />
                          <path d="M8 7h9v9" />
                        </svg>
                      </motion.span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="min-h-[580px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeItemId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={contentTransition}
                className="relative h-full min-h-[580px] overflow-hidden rounded-[26px] border border-[#d3d0c8] bg-[#ebe7de]"
              >
                <Image
                  src={activeImageSrc}
                  alt={activeItem?.title ?? "Showcase image"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesBlock;
