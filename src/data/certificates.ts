export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  /** Display string, not ISO — rendered as-is on the card. */
  date?: string;
  credentialId?: string;
  image: string;
  url?: string;
}

/**
 * Listed oldest to newest, as supplied. `date` is a display string rather than
 * an ISO date, so it is not sortable — reorder this array to change the order
 * on the page.
 *
 * Cover images are still on-brand placeholders. Replace the files in
 * public/certificates/ with the real badge artwork, keeping the same names.
 */
export const certificates: Certificate[] = [
  {
    id: "html-essentials",
    name: "HTML Essentials",
    issuer: "Cisco",
    date: "Oct 5, 2025",
    image: "/certificates/html-essentials.png",
    url: "https://www.credly.com/badges/e7c4e8ea-9e85-4d3a-8a32-74d73ee00db2",
  },
  {
    id: "networking-basics",
    name: "Networking Basics",
    issuer: "Cisco",
    date: "Nov 20, 2025",
    image: "/certificates/networking-basics.png",
    url: "https://www.credly.com/badges/7d7c2d4f-9c2a-41cf-b82d-68854bfb1cbe",
  },
  {
    id: "network-support-security",
    name: "Network Support and Security",
    issuer: "Cisco",
    date: "Dec 3, 2025",
    image: "/certificates/network-support-security.png",
    url: "https://www.credly.com/badges/d712c40c-7124-433d-9f43-7ffeec986de6",
  },
  {
    id: "networking-devices-initial-config",
    name: "Networking Devices and Initial Configuration",
    issuer: "Cisco",
    date: "Dec 28, 2025",
    image: "/certificates/networking-devices-initial-config.png",
    url: "https://www.credly.com/badges/ac75a1e3-448c-4999-91e2-6f31c8708338",
  },
  {
    id: "security-connectivity-support",
    name: "Security and Connectivity Support",
    issuer: "Cisco",
    date: "Jan 11, 2026",
    image: "/certificates/security-connectivity-support.png",
    url: "https://www.credly.com/badges/c900f79b-8286-46cf-b6e7-35cf4f4b86dd",
  },
  {
    id: "network-addressing-basic-troubleshooting",
    name: "Network Addressing and Basic Troubleshooting",
    issuer: "Cisco",
    date: "Jan 12, 2026",
    image: "/certificates/network-addressing-basic-troubleshooting.png",
    url: "https://www.credly.com/badges/7180effa-54aa-47b8-94b3-c77fb1166053",
  },
];
