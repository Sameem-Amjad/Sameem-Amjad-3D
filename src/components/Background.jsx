// Fixed decorative background: warm near-black, faint terminal grid, soft acid
// glow top-left, vignette, and film grain. No WebGL.
const Background = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base">
    {/* grid lines */}
    <div className="absolute inset-0 bg-grid-lines bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

    {/* soft acid + ember glows */}
    <div className="absolute -left-[12%] -top-[10%] h-[45vh] w-[45vh] rounded-full bg-acid/10 blur-[130px]" />
    <div className="absolute right-[-8%] top-[35%] h-[40vh] w-[40vh] rounded-full bg-ember/10 blur-[140px]" />

    {/* vignette */}
    <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-base to-transparent" />
    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-base/80 to-transparent" />

    {/* grain */}
    <div className="grain absolute inset-0 opacity-[0.13] mix-blend-soft-light" />
  </div>
);

export default Background;
