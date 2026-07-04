import { siteInfo } from "../data/siteData";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Works", href: "#works" },
  { label: "Experience", href: "#experience" },
];

export default function Navbar() {
  return (
    <header className="scroll-navbar">
      <a className="scroll-navbar-logo" href="#home">
        {siteInfo.brand}
      </a>
      <nav className="scroll-navbar-links" aria-label="Primary">
        {navItems.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <a className="scroll-navbar-contact" href="#contact">
        Contact
      </a>
    </header>
  );
}
