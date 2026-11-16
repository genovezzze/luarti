import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { Logo } from "./Logo";

type Props = { locale: Locale; dict: Dict };

export function Footer({ locale, dict }: Props) {
  const home = `/${locale}`;
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo />
          <p className="footer__tagline">{dict.footer.tagline}</p>
        </div>
        <div>
          <h3 className="footer__h">{dict.footer.navigation}</h3>
          <ul className="footer__list">
            <li><Link href={`${home}/services`}>{dict.nav.services}</Link></li>
            <li><Link href={`${home}/work`}>{dict.nav.work}</Link></li>
            <li><Link href={`${home}#approach`}>{dict.nav.approach}</Link></li>
            <li><Link href={`${home}#pricing`}>{dict.nav.pricing}</Link></li>
            <li><Link href={`${home}/about`}>{dict.nav.about}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="footer__h">{dict.footer.contact}</h3>
          <ul className="footer__list">
            <li><Link href={`${home}/contact`}>{dict.nav.cta}</Link></li>
            {/* TODO: add email / phone / LinkedIn */}
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} LUARTI. {dict.footer.rights}</span>
      </div>
    </footer>
  );
}
