import Link from "next/link";
import { FOOTER_COLUMNS } from "@/constants/footer-navigations";
import { FooterMeta } from "../ui/footer-meta";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden bg-[#12110f] text-[#f5f1e8]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.24) 52%, rgba(255,255,255,0) 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute -left-20 top-16 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "rgba(164, 132, 74, 0.12)" }}
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-80 w-80 -translate-y-1/3 rounded-full blur-3xl"
        style={{ background: "rgba(67, 91, 74, 0.12)" }}
      />

      <div className="relative mx-auto max-w-360 px-6 py-14 sm:px-8 md:py-18 lg:px-12 lg:pb-12 lg:pt-22 xl:px-16">
        <div className="grid gap-14 lg:grid-cols-[minmax(200px,1.2fr)_repeat(4,minmax(0,1fr))] lg:gap-12 xl:gap-28">
          <div className="flex flex-col gap-10 lg:min-h-150 lg:justify-between">
            <Link
              href="/"
              aria-label="Hermes home"
              className="select-none inline-flex w-fit items-center text-[32px] font-black uppercase leading-none tracking-[-0.08em] text-white transition-opacity duration-200 hover:opacity-80"
              style={{ textDecoration: "none" }}
            >
              H /
            </Link>

            <div className="hidden lg:block">
              <FooterMeta year={year} />
            </div>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.key} className="space-y-8">
              {column.sections.map((section) => (
                <div key={section.heading} className="space-y-2">
                  <h2 className="text-[12.5px] font-semibold tracking-[-0.01em] text-white">
                    {section.heading}
                  </h2>

                  <ul className="space-y-1 ">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[12px] text-[#aaa295] transition-colors duration-200 hover:text-white"
                          style={{ textDecoration: "none" }}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          <div className="lg:hidden">
            <FooterMeta year={year} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
