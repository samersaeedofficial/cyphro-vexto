# 🛡️ CyproVexto
### Advanced Cyber Security Command Center & Penetration Testing Framework

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.io/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

CyproVexto is a state-of-the-art, modular security operations dashboard designed for modern penetration testers and security researchers. It combines a premium, high-fidelity user interface with a powerful backend to create an all-in-one ethical hacking and penetration testing platform.

---

## 🎯 About This Project

CyproVexto is built for **security professionals, ethical hackers, and penetration testers** who need a comprehensive, user-friendly suite of tools. Whether you're conducting network security assessments, web application testing, social engineering audits, or digital forensics investigations, CyproVexto provides an integrated platform with 30+ specialized modules to streamline your workflow.

**Key Philosophy**: Security should be accessible, professional, and beautiful. CyproVexto combines enterprise-grade functionality with a modern, dark-themed cyber aesthetic.

---

## 🚀 Key Features

- **💎 Premium UI/UX**: Built with a "Cyber-Dark" aesthetic, featuring glassmorphism, fluid animations (Framer Motion), and responsive layouts.
- **🛠️ Modular Arsenal**: Over 30+ specialized modules for every phase of a security audit.
- **🤖 AI-Powered Analysis**: Integrated with Google Gemini for intelligent threat detection and automated reporting.
- **📊 Real-time Dashboard**: Live system logs, activity feeds, and statistical visualizations using Recharts.
- **📄 Professional Reporting**: Generate comprehensive PDF reports for stakeholders using the built-in Report Generator.
- **🔓 Completely Open Source**: Free to use, modify, and contribute to by the entire community.

---

## 🖼️ Screenshots & Demo

### Dashboard Overview
![CyproVexto Dashboard - Add your main dashboard screenshot here](./docs/screenshots/dashboard.png)

### Security Modules Interface
![Security Modules - Add your modules interface screenshot here](./docs/screenshots/modules.png)

### Real-time Analysis
![Real-time Analysis & Reporting - Add your analysis dashboard screenshot here](./docs/screenshots/analysis.png)

### Network Visualization
![Network Tools - Add your network visualization screenshot here](./docs/screenshots/network.png)

---

## 🧰 The Arsenal (Modules)

CyproVexto is organized into strategic categories for rapid deployment:

| Category | Modules |
| :--- | :--- |
| **🌐 Network** | WiFi Analyzer, Port Scanner, Packet Sniffer, MitM Attacks, DNS Tools |
| **🎭 Social Eng.** | Phishing Manager, SE Toolkit, Email Spoofing |
| **🔍 OSINT** | OSINT Framework, Reconnaissance, Metadata Extractor |
| **🌐 Web Vuln.** | Web Scanner, SQL Injection, XSS Suite, Dir Bruteforcer |
| **🔑 Password** | Password Cracker, Wordlist Generator, Credential Stuffing |
| **💥 Exploit** | Exploit Database, Payload Generator, Privilege Escalation |
| **🔐 Crypto** | Cryptography Suite, Steganography Tools |
| **🔬 Forensics** | Digital Forensics, Malware Analysis, Reverse Engineering, Log Analyzer |
| **🕶️ Privacy** | Anonymizer, Dark Web Monitor |

---

## 💻 Tech Stack

### Frontend
- **Framework**: [React 19](https://reactjs.org/) & [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [Wouter](https://github.com/molecula-ai/wouter) & [React Router](https://reactrouter.com/)
- **Visualization**: [Recharts](https://recharts.org/) & [Lucide Icons](https://lucide.dev/)

### Backend & Services
- **Database/Backend**: [Supabase](https://supabase.com/)
- **AI Intelligence**: [Google Generative AI (Gemini)](https://ai.google.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/samersaeedofficial/cyphro-vexto.git
cd cyphro-vexto

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and Google Gemini API keys

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file with the following:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_GOOGLE_GEMINI_KEY=your_google_gemini_api_key
```

---

## 📖 Documentation

- [Installation Guide](./docs/INSTALLATION.md) - Detailed setup instructions
- [Module Reference](./docs/MODULES.md) - Complete module documentation
- [API Documentation](./docs/API.md) - Backend API reference
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute to the project

---

## 🤝 Contributing

We welcome contributions from the security community! Whether it's bug fixes, new modules, documentation improvements, or feature requests:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

## 📋 Roadmap

- [ ] **Python Backend Integration**: Connect the UI to active Python security scripts for tool execution
- [ ] **Mobile Operations**: Optimized interface for mobile security auditing
- [ ] **Collaborative Mode**: Real-time multi-user security operations and shared workspaces
- [ ] **Advanced Graphing**: Enhanced network topology visualization using `@xyflow/react`
- [ ] **Custom Module Builder**: UI for users to create custom security modules
- [ ] **Plugin System**: Extensible architecture for community-contributed tools

---

## ⚠️ Legal & Ethical Notice

**CyproVexto is designed for authorized security testing and educational purposes only.**

- Always obtain written permission before testing any systems or networks
- Unauthorized access to computer systems is illegal
- Use this tool responsibly and ethically
- The developers are not responsible for misuse or damage caused by this software

For more information, see our [ETHICS.md](./ETHICS.md)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🎓 Community & Support

- **GitHub Issues**: Report bugs and request features
- **GitHub Discussions**: Ask questions and discuss security topics
- **Documentation**: Check the `/docs` folder for detailed guides

---

## 🙌 Credits & Acknowledgments

- Built with ❤️ for the security community
- Thanks to all contributors and supporters
- Inspired by industry-leading security tools and ethical hacking frameworks

---

<p align="center">
  <strong>CyproVexto - Empowering Security Professionals Worldwide</strong>
  <br>
  <em>By hackers, for hackers. Open source, always free.</em>
</p>
