type NavLink = {
  href: string;
  label: string;
};

type NavItem = NavLink & {
  submenu?: NavLink[];
};

export const navigation: NavItem[] = [
  { href: "#research", label: "Research" },
  { href: "#economic-futures", label: "Economic Futures" },
  {
    href: "#commitments",
    label: "Commitments",
    submenu: [
      { href: "#responsible-scaling", label: "Responsible Scaling" },
      { href: "#security", label: "Security" },
      { href: "#policy", label: "Policy" },
    ],
  },
  {
    href: "#learn",
    label: "Learn",
    submenu: [
      { href: "#docs", label: "Docs" },
      { href: "#guides", label: "Guides" },
      { href: "#company", label: "Company" },
    ],
  },
  { href: "#news", label: "News" },
];
