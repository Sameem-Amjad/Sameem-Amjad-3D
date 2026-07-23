import { techStack } from "../constants/techStack";

const Chip = ({ name, svg }) => (
  <div className="mx-6 flex shrink-0 items-center gap-2.5">
    <span
      className="h-6 w-6 shrink-0 opacity-90 [&>svg]:h-full [&>svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
    <span className="whitespace-nowrap font-mono text-sm uppercase tracking-wide text-muted">
      {name}
    </span>
    <span className="ml-6 text-faint">/</span>
  </div>
);

const Marquee = ({ bare = false }) => {
  const row = [...techStack, ...techStack];
  const track = (
    <div className="marquee-mask pause-hover relative flex overflow-hidden py-4">
      <div className="marquee-track animate-marquee">
        {row.map((t, i) => (
          <Chip key={i} {...t} />
        ))}
      </div>
    </div>
  );

  if (bare) return track;

  return (
    <section className="relative border-y border-line py-2">
      <p className="mb-1 px-6 font-mono text-[11px] uppercase tracking-[0.3em] text-faint sm:px-10">
        // the stack
      </p>
      {track}
    </section>
  );
};

export default Marquee;
