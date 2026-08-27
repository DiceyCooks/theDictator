/**
 * Credits — block 14 (`framer-fhalzc`), 248px.
 *
 * One of only two blocks on the page carrying text. Structure is a heading over
 * paired rows of name / role.
 *
 * The target's rows credit the real people who made that site. Reproducing those
 * names here would attribute their work to a page that does not contain it, so
 * the rows are placeholders — replace them with your own credits.
 */

const ROWS = [
  { name: "Name", role: "Role" },
  { name: "Name", role: "Role" },
  { name: "Name", role: "Role" },
] as const;

export function Credits() {
  return (
    <section
      aria-label="Credits"
      data-block="fhalzc"
      className="relative flex h-[100px] w-full flex-col justify-center bg-lf-ink px-6 lf:h-[248px]"
    >
      <h2 className="text-center font-[family-name:var(--font-inter)] text-[14px] font-medium uppercase leading-[1.15] tracking-[-0.025em] text-lf-paper">
        Credits
      </h2>

      <ul className="mx-auto mt-3 flex max-w-[1200px] list-none flex-row flex-wrap items-start justify-center gap-x-8 gap-y-1 lf:mt-8 lf:gap-x-16">
        {ROWS.map((row, i) => (
          <li key={i} className="text-center">
            <span className="block font-[family-name:var(--font-inter)] text-[14px] font-semibold uppercase leading-[1.15] tracking-[-0.025em] text-lf-acid">
              {row.name}
            </span>
            <span className="mt-1 block font-[family-name:var(--font-inter)] text-[12px] font-normal uppercase leading-[1.15] tracking-[-0.02em] text-[rgba(255,255,255,0.55)]">
              {row.role}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
