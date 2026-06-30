import { ChatInterface } from "@/components/ChatInterface";

export default function Home() {
  return (
    <>
      {/* Fixed background: warm off-white base */}
      <div className="fixed inset-0 -z-20" style={{ background: "#f2ede7" }} />

      {/* Color blobs — give the glass something to blur through */}
      <div
        aria-hidden
        className="fixed -z-10"
        style={{
          top: "-10%", left: "-5%",
          width: "55vw", height: "55vw",
          background: "radial-gradient(circle, rgba(133,45,45,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden
        className="fixed -z-10"
        style={{
          top: "5%", right: "-10%",
          width: "45vw", height: "45vw",
          background: "radial-gradient(circle, rgba(192,160,82,0.14) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden
        className="fixed -z-10"
        style={{
          bottom: "-5%", left: "30%",
          width: "50vw", height: "40vw",
          background: "radial-gradient(circle, rgba(86,135,106,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="flex h-screen flex-col overflow-hidden">

        {/* Header */}
        <header className="glass-header flex-shrink-0">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <div>
              <div
                className="text-xl font-medium uppercase tracking-[3px] text-[#852d2d]"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Cider Institute
              </div>
              <div
                className="text-[10px] font-light uppercase tracking-[2px] text-[#3d3d3d]/50"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                Knowledge Assistant
              </div>
            </div>
            <a
              href="https://www.ciderinstitute.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-light uppercase tracking-[1.5px] text-[#3d3d3d]/50 transition-colors duration-200 hover:text-[#852d2d]"
              style={{
                fontFamily: "var(--font-lato)",
                border: "1px solid rgba(61,61,61,0.18)",
                padding: "6px 12px",
              }}
            >
              Visit Website
            </a>
          </div>
        </header>

        {/* Hero strip */}
        <div
          className="flex-shrink-0 px-6 py-5"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div className="mx-auto max-w-5xl">
            <h1
              className="mb-1 text-[1.6rem] font-light uppercase tracking-[4px] text-[#3d3d3d]"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Ask anything about{" "}
              <span style={{ color: "#852d2d" }}>cidermaking</span>
            </h1>
            <p
              className="text-[10px] font-light uppercase tracking-[2px] text-[#3d3d3d]/40"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              Powered by AI · Based on Cider Institute expertise
            </p>
          </div>
        </div>

        {/* Chat */}
        <div className="flex min-h-0 flex-1 flex-col">
          <ChatInterface />
        </div>

        {/* Footer */}
        <div
          className="flex-shrink-0 px-6 py-3"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          <div className="mx-auto max-w-5xl flex items-center justify-between">
            <p
              className="text-[10px] uppercase tracking-[1px] text-[#3d3d3d]/35"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              © {new Date().getFullYear()} Cider Institute · Nonprofit educational organization
            </p>
            <p
              className="text-[10px] uppercase tracking-[0.5px] text-[#3d3d3d]/25"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              Demo · Verify AI responses with qualified professionals
            </p>
          </div>
        </div>

      </div>
    </>
  );
}
