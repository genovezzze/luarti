import Link from "next/link";
import { Logo } from "./Logo";

type Props = { title: string; button: string; href: string; align?: "center" | "left" };

export function CtaBand({ title, button, href, align = "center" }: Props) {
  return (
    <section className={`cta-band cta-band--${align}`}>
      <div className="container cta-band__inner" data-reveal>
        {align === "center" && <Logo className="cta-band__logo" />}
        <h2 className="h2">{title}</h2>
        <Link href={href} className="btn btn--dark btn--lg">{button}</Link>
      </div>
    </section>
  );
}
