import { useRoute } from "wouter";
import { NetworkWifiLearn } from "./learns/NetworkWifiLearn";
import { SocialEngineeringLearn } from "./learns/SocialEngineeringLearn";
import { OsintIntelligenceLearn } from "./learns/OsintIntelligenceLearn";
import { WebVulnerabilitiesLearn } from "./learns/WebVulnerabilitiesLearn";
import { CredentialAuditingLearn } from "./learns/CredentialAuditingLearn";
import { ThreatSimulationLearn } from "./learns/ThreatSimulationLearn";
import { CryptographicAnalysisLearn } from "./learns/CryptographicAnalysisLearn";
import { ForensicsResponseLearn } from "./learns/ForensicsResponseLearn";
import { PrivacyAssuranceLearn } from "./learns/PrivacyAssuranceLearn";

const LEARN_COMPONENTS = {
  "network-wifi": NetworkWifiLearn,
  "social-engineering": SocialEngineeringLearn,
  "osint-intelligence": OsintIntelligenceLearn,
  "web-vulnerabilities": WebVulnerabilitiesLearn,
  "credential-auditing": CredentialAuditingLearn,
  "threat-simulation": ThreatSimulationLearn,
  "cryptographic-analysis": CryptographicAnalysisLearn,
  "forensics-response": ForensicsResponseLearn,
  "privacy-assurance": PrivacyAssuranceLearn,
};

export function ModuleInfo() {
  const [match, params] = useRoute("/info/:id");
  const LearnComponent = LEARN_COMPONENTS[params?.id];

  if (!LearnComponent) {
    return (
      <div className="min-h-screen bg-[#06090f] flex items-center justify-center text-slate-500 font-bold uppercase tracking-widest text-xs">
        [ERROR] Module Not Found
      </div>
    );
  }

  return <LearnComponent />;
}
