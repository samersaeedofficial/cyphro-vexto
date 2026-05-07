import { useParams, Link } from "wouter";
import {
  Wifi,
  ScanLine,
  Globe,
  ShieldAlert,
  Mail,
  Users,
  Search,
  Eye,
  FileText,
  Key,
  Lock,
  Code2,
  Brain,
  Bug,
  Cpu,
  Server,
  VenetianMask,
  FileSearch,
  BarChart3,
  Network,
  Zap,
  Database,
  AlertTriangle,
  Terminal,
  Radio,
  Shield,
  ArrowLeft,
  Clock,
  ChevronRight,
  Layers,
  GitBranch,
} from "lucide-react";
import { DashboardLayout } from "@/Apps/Dashboard/layout/DashboardLayout";

const MODULE_META = {
  "port-scanner": {
    label: "Port Scanner & Network Mapper",
    icon: ScanLine,
    color: "#00d4ff",
    category: "Network & WiFi",
    description:
      "Comprehensive port scanning and network mapping tool. Identify open ports, running services, OS fingerprinting, and network topology — similar to nmap but with a visual interface.",
    capabilities: [
      "TCP/UDP port scanning across IP ranges",
      "Service and version detection",
      "OS fingerprinting",
      "Host discovery and network mapping",
      "Stealth scan options (SYN, FIN, NULL)",
      "Export results to JSON/PDF",
    ],
    tags: ["Network", "Recon", "Mapping"],
    backendLang: "Python (python-nmap / Scapy)",
  },
  "packet-sniffer": {
    label: "Packet Sniffer & Traffic Analyzer",
    icon: Radio,
    color: "#00d4ff",
    category: "Network & WiFi",
    description:
      "Capture and analyze network packets in real-time. Filter traffic by protocol, IP, port, or payload content. Ideal for debugging and authorized network traffic analysis.",
    capabilities: [
      "Real-time packet capture on selected interface",
      "Protocol dissection (TCP, UDP, HTTP, DNS, ARP)",
      "Traffic filtering with BPF syntax",
      "HTTP/HTTPS session reconstruction",
      "Credential extraction from plaintext protocols",
      "PCAP file export and import",
    ],
    tags: ["Network", "Traffic", "Analysis"],
    backendLang: "Python (Scapy / PyShark)",
  },
  mitm: {
    label: "Man-in-the-Middle Attack Suite",
    icon: Network,
    color: "#00d4ff",
    category: "Network & WiFi",
    description:
      "Perform authorized MitM attacks for security testing. Includes ARP spoofing, SSL stripping, DNS spoofing, and traffic interception with live decryption where possible.",
    capabilities: [
      "ARP poisoning / ARP spoofing",
      "SSL stripping for HTTPS downgrade",
      "DNS spoofing and redirect",
      "Live traffic interception and modification",
      "Credential harvesting from intercepted sessions",
      "Targeted attack against specific hosts",
    ],
    tags: ["Network", "Attack", "Interception"],
    backendLang: "Python (Scapy + mitmproxy)",
  },
  "dns-tools": {
    label: "DNS Tools & Analysis",
    icon: Globe,
    color: "#00d4ff",
    category: "Network & WiFi",
    description:
      "Complete DNS analysis toolkit including lookup, zone transfers, DNS cache poisoning testing, and DNS reconnaissance for authorized security assessments.",
    capabilities: [
      "DNS lookup (A, AAAA, MX, TXT, NS, SOA records)",
      "Zone transfer attempts (AXFR)",
      "Reverse DNS lookup",
      "DNS brute force subdomain enumeration",
      "DNS cache poisoning test",
      "DNSSEC validation checking",
    ],
    tags: ["Network", "DNS", "Recon"],
    backendLang: "Python (dnspython)",
  },
  phishing: {
    label: "Phishing Campaign Manager",
    icon: Mail,
    color: "#c084fc",
    category: "Social Engineering",
    description:
      "Build and manage authorized phishing campaigns for security awareness training. Create convincing email templates, clone login pages, and track who clicks — for legitimate red team engagements.",
    capabilities: [
      "Email template builder with HTML editor",
      "Login page cloner for target sites",
      "Campaign tracking (opens, clicks, submissions)",
      "SMTP relay configuration",
      "Target list management",
      "Detailed campaign analytics and reporting",
    ],
    tags: ["Social Engineering", "Email", "Phishing"],
    backendLang: "Python (Flask + smtplib)",
  },
  "social-engineering": {
    label: "Social Engineering Toolkit",
    icon: Users,
    color: "#c084fc",
    category: "Social Engineering",
    description:
      "A comprehensive toolkit for social engineering simulations. Generate pretexting scripts, manage vishing (voice phishing) campaigns, and create smishing (SMS phishing) scenarios.",
    capabilities: [
      "Pretexting script generator by scenario type",
      "Vishing call script builder",
      "Smishing SMS template creator",
      "Social media recon integration",
      "Scenario simulation mode",
      "Training report generator",
    ],
    tags: ["Social Engineering", "Human Factor"],
    backendLang: "Python (Twilio API + custom)",
  },
  "email-spoofing": {
    label: "Email Spoofing & Validation",
    icon: AlertTriangle,
    color: "#c084fc",
    category: "Social Engineering",
    description:
      "Test email server configurations by sending spoofed emails to check SPF, DKIM, and DMARC protections. Identify organizations susceptible to email-based social engineering.",
    capabilities: [
      "Send spoofed emails for authorized testing",
      "SPF record validation",
      "DKIM signature checking",
      "DMARC policy analysis",
      "Mail server MX record analysis",
      "Email header forging for tests",
    ],
    tags: ["Email", "Spoofing", "Validation"],
    backendLang: "Python (smtplib + DNS)",
  },
  osint: {
    label: "OSINT Framework",
    icon: Eye,
    color: "#facc15",
    category: "OSINT",
    description:
      "Open-source intelligence gathering framework. Aggregate data from public sources to build comprehensive profiles on targets — people, organizations, domains, and infrastructure.",
    capabilities: [
      "People search across public records",
      "Domain and IP intelligence gathering",
      "Social media profile correlation",
      "Email address OSINT (breach databases)",
      "Company structure and employee mapping",
      "Automated report generation",
    ],
    tags: ["OSINT", "Recon", "Intelligence"],
    backendLang: "Python (theHarvester + Maltego APIs)",
  },
  recon: {
    label: "Reconnaissance Suite",
    icon: Search,
    color: "#facc15",
    category: "OSINT",
    description:
      "Automated reconnaissance toolkit for gathering target information before an authorized engagement. Includes subdomain enumeration, Google dorking, and Shodan integration.",
    capabilities: [
      "Subdomain enumeration (brute force + cert transparency)",
      "Google dorking with built-in dork library",
      "Shodan API integration",
      "Directory and file discovery",
      "Technology stack fingerprinting",
      "Visual recon with screenshots",
    ],
    tags: ["Recon", "Subdomain", "OSINT"],
    backendLang: "Python (Sublist3r + Shodan API)",
  },
  metadata: {
    label: "Metadata Extractor",
    icon: FileSearch,
    color: "#facc15",
    category: "OSINT",
    description:
      "Extract and analyze metadata from files — images, PDFs, Office documents, and more. Metadata often contains sensitive information like author names, GPS coordinates, and software versions.",
    capabilities: [
      "EXIF data extraction from images",
      "PDF metadata analysis",
      "Office document property extraction",
      "GPS coordinate mapping from photos",
      "Metadata scrubbing / sanitization",
      "Bulk file metadata processing",
    ],
    tags: ["Metadata", "OSINT", "Files"],
    backendLang: "Python (ExifTool + PyPDF2)",
  },
  "web-scanner": {
    label: "Web Vulnerability Scanner",
    icon: ShieldAlert,
    color: "#fb923c",
    category: "Web Vulnerabilities",
    description:
      "Automated web application vulnerability scanner. Detects OWASP Top 10 vulnerabilities, misconfigurations, and security weaknesses across web applications.",
    capabilities: [
      "OWASP Top 10 vulnerability detection",
      "SQL injection, XSS, CSRF scanning",
      "SSRF and XXE detection",
      "Security header analysis",
      "Cookie security checking",
      "Detailed vulnerability report with severity ratings",
    ],
    tags: ["Web", "Scanner", "OWASP"],
    backendLang: "Python (requests + BeautifulSoup)",
  },
  "sql-injection": {
    label: "SQL Injection Tool",
    icon: Database,
    color: "#fb923c",
    category: "Web Vulnerabilities",
    description:
      "Advanced SQL injection testing suite for authorized web application assessments. Detect and exploit SQL injection vulnerabilities to extract data and assess impact.",
    capabilities: [
      "Automatic SQLi vulnerability detection",
      "Error-based, blind, and time-based injection",
      "Database schema extraction",
      "Data dump from vulnerable tables",
      "Authentication bypass testing",
      "WAF evasion techniques",
    ],
    tags: ["SQLi", "Web", "Database"],
    backendLang: "Python (sqlmap integration)",
  },
  xss: {
    label: "XSS Testing Suite",
    icon: Code2,
    color: "#fb923c",
    category: "Web Vulnerabilities",
    description:
      "Cross-Site Scripting vulnerability testing framework. Test for reflected, stored, and DOM-based XSS vulnerabilities with a built-in payload library.",
    capabilities: [
      "Reflected XSS detection",
      "Stored XSS identification",
      "DOM-based XSS analysis",
      "500+ payload library",
      "CSP bypass techniques",
      "Cookie theft PoC generator",
    ],
    tags: ["XSS", "Web", "JavaScript"],
    backendLang: "Python + JavaScript",
  },
  "dir-bruteforce": {
    label: "Directory & File Bruteforcer",
    icon: Server,
    color: "#fb923c",
    category: "Web Vulnerabilities",
    description:
      "Discover hidden files and directories on web servers through intelligent bruteforcing. Includes common wordlists, recursive scanning, and response analysis.",
    capabilities: [
      "Directory and file brute forcing",
      "Multiple wordlist support",
      "Recursive directory discovery",
      "Response code filtering",
      "File extension fuzzing",
      "Virtual host discovery",
    ],
    tags: ["Web", "Brute Force", "Discovery"],
    backendLang: "Python (aiohttp for async)",
  },
  "password-cracker": {
    label: "Password Cracker",
    icon: Key,
    color: "#f87171",
    category: "Password & Auth",
    description:
      "Password cracking tool supporting multiple hash types. Performs dictionary attacks, brute force, and rule-based attacks. For authorized recovery and security testing only.",
    capabilities: [
      "MD5, SHA1, SHA256, bcrypt, NTLM support",
      "Dictionary attack with custom wordlists",
      "Rule-based mutations (Hashcat-style)",
      "Rainbow table lookups",
      "Distributed cracking support",
      "Progress save and resume",
    ],
    tags: ["Password", "Cracking", "Hash"],
    backendLang: "Python (hashcat wrapper)",
  },
  "password-generator": {
    label: "Password & Wordlist Generator",
    icon: FileText,
    color: "#f87171",
    category: "Password & Auth",
    description:
      "Generate targeted wordlists and secure passwords. Use OSINT data about a target to build personalized wordlists for authorized dictionary attacks.",
    capabilities: [
      "Custom wordlist generation from target info",
      "Password policy-compliant generation",
      "Mangling rules (leet speak, suffixes, dates)",
      "CUPP-style personal wordlist builder",
      "Entropy analysis",
      "Export in various formats",
    ],
    tags: ["Password", "Wordlist", "Generator"],
    backendLang: "Python (CUPP / custom)",
  },
  "credential-stuffing": {
    label: "Credential Stuffing Tool",
    icon: Lock,
    color: "#f87171",
    category: "Password & Auth",
    description:
      "Test authentication systems against credential stuffing attacks using breach data for authorized security assessments. Measures resilience of login systems.",
    capabilities: [
      "Multi-threaded credential testing",
      "Proxy rotation support",
      "Rate limiting bypass testing",
      "MFA bypass detection",
      "Account lockout policy testing",
      "Detailed success/failure logging",
    ],
    tags: ["Auth", "Credential", "Testing"],
    backendLang: "Python (aiohttp)",
  },
  "exploit-db": {
    label: "Exploit Database Browser",
    icon: Database,
    color: "#f43f5e",
    category: "Exploitation",
    description:
      "Browse, search, and manage exploits from the Exploit-DB database. Filter by CVE, platform, type, and date. Download and prepare exploits for authorized testing.",
    capabilities: [
      "Search Exploit-DB by CVE, product, platform",
      "Local exploit cache and management",
      "CVE details integration",
      "Exploit metadata and reliability info",
      "Direct download and preparation",
      "Custom exploit notes",
    ],
    tags: ["Exploit", "CVE", "Database"],
    backendLang: "Python (ExploitDB API)",
  },
  "payload-generator": {
    label: "Payload Generator",
    icon: Terminal,
    color: "#f43f5e",
    category: "Exploitation",
    description:
      "Generate reverse shells, bind shells, web shells, and encoded payloads for various platforms. Essential for authorized post-exploitation testing.",
    capabilities: [
      "Reverse shell one-liners (Bash, Python, PHP, Perl, Ruby)",
      "MSFvenom payload generation",
      "Payload encoding and obfuscation",
      "Web shell templates",
      "Listener setup (netcat, metasploit)",
      "AV evasion techniques",
    ],
    tags: ["Payload", "Shell", "Exploit"],
    backendLang: "Python (MSFvenom wrapper)",
  },
  "privilege-escalation": {
    label: "Privilege Escalation Checker",
    icon: Shield,
    color: "#f43f5e",
    category: "Exploitation",
    description:
      "Automated privilege escalation enumeration for Linux and Windows. Identifies misconfigurations, weak permissions, and escalation vectors post-compromise.",
    capabilities: [
      "Linux: SUID, sudo, cron, writable paths",
      "Windows: Unquoted paths, DLL hijacking, token impersonation",
      "Kernel exploit suggestions based on version",
      "Automated enumeration scripts",
      "GTFOBins integration",
      "Report with prioritized findings",
    ],
    tags: ["Privilege Escalation", "Post-Exploit", "Linux", "Windows"],
    backendLang: "Python (LinPEAS/WinPEAS wrapper)",
  },
  crypto: {
    label: "Cryptography Tools",
    icon: Lock,
    color: "#4ade80",
    category: "Cryptography & Steganography",
    description:
      "Comprehensive cryptography toolkit for encoding, decoding, encrypting, decrypting, and analyzing cryptographic systems used in security assessments.",
    capabilities: [
      "Encode/decode Base64, hex, URL, binary",
      "Symmetric encryption (AES, DES, 3DES)",
      "Hash generation (MD5, SHA family, bcrypt)",
      "Classic cipher analysis (Caesar, Vigenere, ROT13)",
      "JWT token analysis and modification",
      "RSA key operations",
    ],
    tags: ["Crypto", "Encoding", "Cipher"],
    backendLang: "Python (PyCryptodome)",
  },
  steganography: {
    label: "Steganography Suite",
    icon: FileText,
    color: "#4ade80",
    category: "Cryptography & Steganography",
    description:
      "Hide and extract data within images, audio files, and documents using steganographic techniques. Useful for CTF challenges and covert communication research.",
    capabilities: [
      "Hide data inside PNG/JPG images",
      "Extract hidden data from carrier files",
      "LSB (Least Significant Bit) steganography",
      "Audio steganography (WAV files)",
      "Stego detection and analysis",
      "Passphrase-protected data hiding",
    ],
    tags: ["Steganography", "Hidden Data", "CTF"],
    backendLang: "Python (Stegano + PIL)",
  },
  forensics: {
    label: "Digital Forensics",
    icon: FileSearch,
    color: "#60a5fa",
    category: "Forensics & Analysis",
    description:
      "Digital forensics investigation tools for evidence collection, file carving, timeline analysis, and artifact recovery from disk images and live systems.",
    capabilities: [
      "File carving from disk images",
      "Deleted file recovery",
      "Timeline analysis and correlation",
      "Browser history and artifact extraction",
      "Registry analysis (Windows)",
      "Evidence chain-of-custody logging",
    ],
    tags: ["Forensics", "Evidence", "Investigation"],
    backendLang: "Python (Sleuth Kit + Autopsy)",
  },
  "malware-analysis": {
    label: "Malware Analysis Sandbox",
    icon: Bug,
    color: "#60a5fa",
    category: "Forensics & Analysis",
    description:
      "Static and dynamic malware analysis environment. Analyze suspicious files, extract IOCs, identify malware families, and generate threat intelligence reports.",
    capabilities: [
      "Static analysis (strings, imports, PE headers)",
      "Dynamic analysis in isolated sandbox",
      "IOC extraction (IPs, domains, hashes, registry keys)",
      "Malware family identification",
      "YARA rule creation and matching",
      "VirusTotal API integration",
    ],
    tags: ["Malware", "Analysis", "Sandbox"],
    backendLang: "Python (Cuckoo + YARA)",
  },
  "reverse-engineering": {
    label: "Reverse Engineering Tools",
    icon: Cpu,
    color: "#60a5fa",
    category: "Forensics & Analysis",
    description:
      "Reverse engineering suite for analyzing binaries, understanding code logic, and identifying vulnerabilities in compiled applications.",
    capabilities: [
      "Disassembly view (x86, x64, ARM)",
      "Decompiled pseudocode view",
      "String extraction and analysis",
      "Import/export table analysis",
      "Control flow graph visualization",
      "Binary diff for patch analysis",
    ],
    tags: ["Reverse Engineering", "Binary", "Assembly"],
    backendLang: "Python (Radare2 / Ghidra integration)",
  },
  "log-analyzer": {
    label: "Log Analyzer & SIEM",
    icon: BarChart3,
    color: "#60a5fa",
    category: "Forensics & Analysis",
    description:
      "Parse, search, and correlate logs from multiple sources. Identify attack patterns, anomalies, and security events across system, application, and network logs.",
    capabilities: [
      "Multi-format log parsing (Syslog, JSON, Apache, IIS)",
      "Pattern matching with Sigma rules",
      "Attack timeline reconstruction",
      "Anomaly detection",
      "Log correlation across sources",
      "Export findings as incident report",
    ],
    tags: ["Logs", "SIEM", "Analysis"],
    backendLang: "Python (ELK stack integration)",
  },
  anonymizer: {
    label: "Anonymizer & Proxy Tools",
    icon: VenetianMask,
    color: "#2dd4bf",
    category: "Anonymous & Privacy",
    description:
      "Maintain operational security during authorized engagements. Route traffic through Tor, configure proxy chains, and validate anonymization effectiveness.",
    capabilities: [
      "Tor circuit management and renewal",
      "Proxy chain configuration (HTTP, SOCKS4, SOCKS5)",
      "IP leak detection and prevention",
      "DNS leak testing",
      "MAC address spoofing",
      "Operational security checklist",
    ],
    tags: ["Anonymity", "Tor", "Proxy", "OPSEC"],
    backendLang: "Python (stem library + Tor)",
  },
  darkweb: {
    label: "Dark Web Monitor",
    icon: Globe,
    color: "#2dd4bf",
    category: "Anonymous & Privacy",
    description:
      "Monitor dark web sources for mentions of your organization, credentials, or assets. Track data breaches and threat actor discussions relevant to your targets.",
    capabilities: [
      "Tor-based .onion site crawling",
      "Keyword monitoring and alerts",
      "Breach database monitoring",
      "Paste site monitoring",
      "Credential exposure detection",
      "Threat intelligence aggregation",
    ],
    tags: ["Dark Web", "Monitoring", "Threat Intel"],
    backendLang: "Python (stem + requests + Tor)",
  },
  reporting: {
    label: "Report Generator",
    icon: FileText,
    color: "#818cf8",
    category: "Reporting",
    description:
      "Generate professional penetration testing reports. Compile findings from all modules, add severity ratings, screenshots, and remediation recommendations.",
    capabilities: [
      "Executive summary generation",
      "Technical findings compilation",
      "CVSS severity scoring",
      "PDF and HTML export",
      "Screenshots and evidence management",
      "Remediation recommendation templates",
    ],
    tags: ["Reporting", "PDF", "Documentation"],
    backendLang: "Python (ReportLab + Jinja2)",
  },
};

const DEFAULT_MODULE = {
  label: "Unknown Module",
  icon: Terminal,
  color: "#00d4ff",
  category: "Unknown",
  description: "This module does not exist.",
  capabilities: [],
  tags: [],
  backendLang: "Unknown",
};

export function ModulePage() {
  const { id } = useParams();
  const meta = MODULE_META[id] || DEFAULT_MODULE;
  const Icon = meta.icon;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
        <Link
          href="/dashboard"
          className="hover:text-cyan-400 transition-colors cursor-pointer"
          data-testid="link-breadcrumb-dashboard"
        >
          Dashboard
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-500">{meta.category}</span>
        <ChevronRight className="w-3 h-3" />
        <span style={{ color: meta.color }}>{meta.label}</span>
      </div>

      {/* Module Header */}
      <div
        className="rounded-2xl p-8"
        style={{
          background: "rgba(10, 15, 30, 0.8)",
          border: `1px solid ${meta.color}22`,
          backdropFilter: "blur(12px)",
          boxShadow: `0 0 40px ${meta.color}08`,
        }}
      >
        <div className="flex items-start gap-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${meta.color}12`,
              border: `1px solid ${meta.color}35`,
              boxShadow: `0 0 20px ${meta.color}20`,
            }}
          >
            <Icon className="w-8 h-8" style={{ color: meta.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h1 className="text-2xl font-bold font-mono text-white">
                {meta.label}
              </h1>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded-full"
                style={{
                  background: `${meta.color}12`,
                  border: `1px solid ${meta.color}30`,
                  color: meta.color,
                }}
              >
                {meta.category}
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm mb-4">
              {meta.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 rounded text-slate-500"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coming Soon Panel */}
        <div className="lg:col-span-2">
          <div
            className="rounded-2xl p-8 h-full"
            style={{
              background: "rgba(10, 15, 30, 0.7)",
              border: "1px solid rgba(250,204,21,0.15)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex flex-col items-center justify-center text-center py-8">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 scan-line"
                style={{
                  background: `${meta.color}08`,
                  border: `1px solid ${meta.color}25`,
                }}
              >
                <Icon
                  className="w-10 h-10 opacity-60"
                  style={{ color: meta.color }}
                />
              </div>

              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono mb-4"
                style={{
                  background: "rgba(250,204,21,0.08)",
                  border: "1px solid rgba(250,204,21,0.25)",
                  color: "#facc15",
                }}
              >
                <Clock className="w-3.5 h-3.5" />
                Backend Integration Pending
              </div>

              <h2 className="text-xl font-bold font-mono text-white mb-3">
                {meta.label} is Ready
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-6">
                The UI shell for this module is complete. Connect your Python
                backend to bring this tool to life. The interface will
                automatically populate once the API endpoint is live.
              </p>

              <div
                className="w-full max-w-md rounded-xl p-4 font-mono text-sm text-left"
                style={{
                  background: "rgba(5, 8, 18, 0.9)",
                  border: "1px solid rgba(0,212,255,0.15)",
                }}
              >
                <div className="text-slate-600 text-xs mb-2">
                  # Expected Python backend endpoint:
                </div>
                <div className="text-cyan-400">
                  @app.route('/api/{id}', methods=['POST'])
                </div>
                <div className="text-slate-400">
                  def {id?.replace(/-/g, "_")}():
                </div>
                <div className="text-slate-50 pl-4">
                  {"# Your Python logic here"}
                </div>
                <div className="text-slate-50 pl-4">
                  {"return jsonify({...})"}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Link href="/dashboard" data-testid="link-back-dashboard">
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm transition-all hover:bg-white/5 cursor-pointer"
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#64748b",
                    }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <div className="space-y-4">
          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(10, 15, 30, 0.7)",
              border: "1px solid rgba(0,212,255,0.1)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="font-mono font-semibold text-white text-sm">
                Capabilities
              </span>
            </div>
            <div className="space-y-2">
              {meta.capabilities.map((cap, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs font-mono text-slate-400"
                  data-testid={`capability-${i}`}
                >
                  <ChevronRight
                    className="w-3 h-3 flex-shrink-0 mt-0.5"
                    style={{ color: meta.color }}
                  />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl p-5"
            style={{
              background: "rgba(10, 15, 30, 0.7)",
              border: "1px solid rgba(0,212,255,0.1)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <GitBranch className="w-4 h-4 text-cyan-400" />
              <span className="font-mono font-semibold text-white text-sm">
                Environment
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-500">Language</span>
                <span className="text-xs font-mono text-slate-300">{meta.backendLang}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-500">Status</span>
                <span className="text-xs font-mono text-yellow-500">Ready for Connect</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
