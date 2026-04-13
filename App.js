import { useState, useEffect } from "react";

const DOMAINS = [
  { id: "all", label: "All Domains" },
  { id: "1", label: "1.0 General Security Concepts" },
  { id: "2", label: "2.0 Threats, Vulnerabilities & Mitigations" },
  { id: "3", label: "3.0 Security Architecture" },
  { id: "4", label: "4.0 Security Operations" },
  { id: "5", label: "5.0 Security Program Management" },
];

const QUESTIONS = [
  // ───────────── DOMAIN 1 ─────────────
  { id: 1, domain: "1", question: "Which of the following BEST describes the concept of least privilege?", options: ["Users are given the maximum permissions needed to do their job", "Users are given only the permissions necessary to perform their job functions", "Administrators have unrestricted access to all systems", "All users share the same access level"], answer: 1, explanation: "Least privilege means granting users only the minimum permissions required to perform their specific job duties — nothing more." },
  { id: 2, domain: "1", question: "What is the PRIMARY purpose of multi-factor authentication (MFA)?", options: ["To eliminate the need for passwords", "To add additional layers of verification beyond just a password", "To speed up the login process", "To encrypt user credentials"], answer: 1, explanation: "MFA requires two or more verification factors (something you know, have, or are), making unauthorized access significantly harder even if one factor is compromised." },
  { id: 3, domain: "1", question: "Which cryptographic concept ensures a sender cannot deny sending a message?", options: ["Confidentiality", "Integrity", "Non-repudiation", "Availability"], answer: 2, explanation: "Non-repudiation ensures that a party cannot deny the authenticity of their signature or the sending of a message, typically achieved through digital signatures." },
  { id: 4, domain: "1", question: "A security professional is implementing controls to protect data. Which of the following is a preventive control?", options: ["Security camera", "Audit log", "Firewall", "Incident report"], answer: 2, explanation: "A firewall is a preventive control — it actively blocks unauthorized traffic before it can reach systems. Cameras and logs are detective controls." },
  { id: 5, domain: "1", question: "What does PKI stand for in cybersecurity?", options: ["Private Key Infrastructure", "Public Key Infrastructure", "Protected Knowledge Interface", "Primary Key Integration"], answer: 1, explanation: "PKI (Public Key Infrastructure) is a framework for managing digital certificates and public-key encryption to secure communications." },
  { id: 6, domain: "1", question: "Which of the following BEST describes a zero-day vulnerability?", options: ["A vulnerability that has been patched", "A vulnerability known only to the vendor", "A vulnerability exploited before a patch is available", "A vulnerability that only affects zero users"], answer: 2, explanation: "A zero-day vulnerability is one that is unknown to the software vendor or for which no patch exists, meaning attackers can exploit it with no defense available." },
  { id: 7, domain: "1", question: "Which type of access control uses predefined rules set by the system rather than the owner?", options: ["DAC (Discretionary Access Control)", "MAC (Mandatory Access Control)", "RBAC (Role-Based Access Control)", "ABAC (Attribute-Based Access Control)"], answer: 1, explanation: "MAC enforces access based on classification labels set by the system/administrator. Users cannot change these permissions, unlike DAC where the owner sets permissions." },
  { id: 8, domain: "1", question: "What is the purpose of a digital certificate?", options: ["To encrypt hard drives", "To bind a public key to an identity", "To store passwords securely", "To generate random encryption keys"], answer: 1, explanation: "A digital certificate binds a public key to an entity's identity, verified by a Certificate Authority (CA), enabling trusted encrypted communications." },
  { id: 101, domain: "1", question: "Which hashing algorithm produces a 256-bit digest and is considered cryptographically strong?", options: ["MD5", "SHA-1", "SHA-256", "CRC32"], answer: 2, explanation: "SHA-256 (part of SHA-2 family) produces a 256-bit hash and is considered secure. MD5 and SHA-1 are deprecated due to collision vulnerabilities." },
  { id: 102, domain: "1", question: "A company requires employees to use a token-generating app for login. This is which MFA factor type?", options: ["Something you know", "Something you have", "Something you are", "Something you do"], answer: 1, explanation: "A token-generating app (like Google Authenticator) is 'something you have' — a physical or software possession factor." },
  { id: 103, domain: "1", question: "Which BEST describes the difference between symmetric and asymmetric encryption?", options: ["Symmetric uses two keys; asymmetric uses one", "Symmetric uses one shared key; asymmetric uses a public/private key pair", "Symmetric is slower; asymmetric is faster", "Symmetric is used only for hashing"], answer: 1, explanation: "Symmetric encryption uses the same key to encrypt and decrypt. Asymmetric uses a mathematically linked key pair — public key encrypts, private key decrypts." },
  { id: 104, domain: "1", question: "What is the role of a Certificate Authority (CA)?", options: ["To generate symmetric encryption keys", "To issue and sign digital certificates verifying identities", "To block malicious websites", "To manage firewall rules"], answer: 1, explanation: "A CA is a trusted third party that issues, signs, and revokes digital certificates, forming the backbone of PKI trust hierarchies." },
  { id: 105, domain: "1", question: "Which of the following is an example of a compensating control?", options: ["A firewall blocking port 80", "A manual review process when automated MFA is unavailable", "Encrypting a hard drive", "Installing antivirus software"], answer: 1, explanation: "A compensating control substitutes for a primary control that cannot be implemented. A manual review process compensates when MFA deployment is not feasible." },
  { id: 106, domain: "1", question: "An admin grants a user temporary elevated access for a task then removes it immediately. This is called:", options: ["Separation of duties", "Just-in-time (JIT) access", "Mandatory vacation", "Role-based access control"], answer: 1, explanation: "Just-in-time access grants elevated permissions only when needed and revokes them immediately after, minimizing the window of exposure from over-privileged accounts." },
  { id: 107, domain: "1", question: "Which BEST describes the concept of defense in depth?", options: ["Using the strongest single security control available", "Layering multiple security controls so that if one fails, others remain", "Encrypting all data at rest and in transit", "Blocking all external network access"], answer: 1, explanation: "Defense in depth uses multiple overlapping security layers — network, endpoint, application, data — so a failure in one layer does not compromise the entire system." },
  { id: 108, domain: "1", question: "A user's biometric fingerprint scan is used to authenticate. This represents which factor?", options: ["Something you know", "Something you have", "Something you are", "Somewhere you are"], answer: 2, explanation: "Biometrics (fingerprint, retina, voice) fall under 'something you are' — inherence factors unique to the individual's physical characteristics." },
  { id: 109, domain: "1", question: "Which describes the purpose of key escrow?", options: ["To speed up asymmetric encryption", "To store a copy of encryption keys with a trusted third party for recovery", "To distribute public keys across the network", "To prevent brute force attacks on encrypted data"], answer: 1, explanation: "Key escrow stores encryption keys with a trusted third party so authorized entities can access encrypted data if the original key is lost." },
  { id: 110, domain: "1", question: "Which type of control is a security guard at a building entrance?", options: ["Technical", "Physical", "Administrative", "Corrective"], answer: 1, explanation: "A security guard is a physical control — a tangible, human-based measure that physically restricts or monitors access to facilities." },
  { id: 111, domain: "1", question: "What does 'salting' refer to in password security?", options: ["Encrypting passwords with AES-256", "Adding random data to a password before hashing to prevent rainbow table attacks", "Storing passwords in plaintext with obfuscation", "Using a longer password policy"], answer: 1, explanation: "A salt is random data appended to a password before hashing. This ensures identical passwords produce different hashes, defeating precomputed rainbow table attacks." },
  { id: 112, domain: "1", question: "Which is the PRIMARY goal of the CIA Triad?", options: ["To define incident response steps", "To provide a framework ensuring Confidentiality, Integrity, and Availability of data", "To classify threat actors by capability", "To standardize encryption algorithms"], answer: 1, explanation: "The CIA Triad is the foundational model of information security: Confidentiality (prevent unauthorized access), Integrity (prevent unauthorized modification), Availability (ensure access when needed)." },
  { id: 113, domain: "1", question: "What does the term 'salting' refer to in password security?", options: ["Encrypting passwords with AES-256", "Adding random data to a password before hashing to prevent rainbow table attacks", "Storing passwords in plaintext with obfuscation", "Using a longer password policy"], answer: 1, explanation: "A salt is random data appended to a password before hashing, ensuring identical passwords produce different hashes and defeating rainbow table attacks." },
  { id: 114, domain: "1", question: "Which BEST describes the purpose of a hardware security module (HSM)?", options: ["To monitor network traffic for intrusions", "To provide tamper-resistant storage and processing of cryptographic keys", "To manage user access permissions", "To encrypt email communications"], answer: 1, explanation: "An HSM is a dedicated hardware device designed to securely generate, store, and manage cryptographic keys, resistant to physical and logical tampering." },
  { id: 115, domain: "1", question: "Separation of duties is identified as a key control. What does this mean?", options: ["Each employee works separately with no collaboration", "Critical tasks require more than one person to complete, preventing fraud", "Employees rotate jobs every 90 days", "Administrators cannot access user files"], answer: 1, explanation: "Separation of duties divides critical tasks among multiple people so no single person can execute a complete sensitive process alone, reducing insider threat and fraud risk." },
  { id: 116, domain: "1", question: "Which BEST describes a federated identity system?", options: ["A single company managing all user accounts internally", "Multiple organizations trusting a shared identity provider for authentication", "Biometric data replaces all passwords", "Each application maintains its own separate user database"], answer: 1, explanation: "Federation allows users to authenticate with a trusted identity provider (like SSO) accepted across multiple organizations or services, reducing credential sprawl." },
  { id: 117, domain: "1", question: "What is the PRIMARY difference between authentication and authorization?", options: ["Authentication grants access; authorization verifies identity", "Authentication verifies who you are; authorization determines what you can do", "They are the same concept", "Authorization happens before authentication"], answer: 1, explanation: "Authentication answers 'who are you?' (verifying identity). Authorization answers 'what are you allowed to do?' (determining permissions). Authentication always precedes authorization." },
  { id: 118, domain: "1", question: "A security team implements a honeypot. What is its PRIMARY purpose?", options: ["To block malicious traffic at the perimeter", "To lure attackers into a decoy system to observe and analyze their tactics", "To encrypt sensitive data in transit", "To perform automated vulnerability scanning"], answer: 1, explanation: "A honeypot is a decoy system designed to attract attackers, giving defenders visibility into attack methods, tools, and behaviors without risking production systems." },
  { id: 119, domain: "1", question: "Which of the following is an example of a corrective control?", options: ["Firewall rules blocking traffic", "Security awareness training", "Restoring a system from backup after a ransomware attack", "CCTV cameras monitoring server rooms"], answer: 2, explanation: "Corrective controls restore systems to normal after an incident. Restoring from backup after ransomware is a classic corrective action — it fixes the damage done." },
  { id: 120, domain: "1", question: "An organization uses ABAC for access decisions. What does ABAC evaluate?", options: ["Only the user's role in the organization", "Attributes of the user, resource, and environment to make access decisions", "Physical location of the user only", "Time of day restrictions only"], answer: 1, explanation: "Attribute-Based Access Control (ABAC) evaluates multiple attributes — user department, clearance level, resource sensitivity, time, location — for fine-grained, contextual access decisions." },
  { id: 121, domain: "1", question: "Which certificate type secures multiple subdomains under a single domain?", options: ["DV certificate", "EV certificate", "Wildcard certificate", "Self-signed certificate"], answer: 2, explanation: "A wildcard certificate (*.domain.com) secures a domain and all its first-level subdomains with a single certificate, simplifying management." },
  { id: 122, domain: "1", question: "What is the purpose of OCSP (Online Certificate Status Protocol)?", options: ["To issue new digital certificates", "To check in real time whether a certificate has been revoked", "To encrypt certificate data during transmission", "To renew expiring certificates automatically"], answer: 1, explanation: "OCSP allows clients to check the revocation status of a certificate in real time without downloading a full Certificate Revocation List (CRL), improving efficiency." },
  { id: 123, domain: "1", question: "Which BEST describes stream cipher vs. block cipher?", options: ["Stream ciphers process fixed-size chunks; block ciphers process one bit at a time", "Stream ciphers encrypt one bit/byte at a time; block ciphers encrypt fixed-size data chunks", "They are functionally identical", "Block ciphers are always stronger than stream ciphers"], answer: 1, explanation: "Stream ciphers encrypt data continuously one bit or byte at a time (good for real-time data). Block ciphers process fixed chunks (like 128-bit blocks in AES), commonly used for stored data." },
  { id: 124, domain: "1", question: "Which scenario BEST represents an integrity violation?", options: ["An unauthorized user views a confidential document", "A database record is modified without authorization", "A web server becomes unreachable due to a DDoS attack", "A user is unable to log in after forgetting their password"], answer: 1, explanation: "Integrity ensures data is not altered without authorization. An unauthorized database modification is a direct integrity violation — the data can no longer be trusted as accurate." },
  { id: 125, domain: "1", question: "What does 'implicit deny' mean in access control?", options: ["Users are denied access based on their role", "Any access not explicitly permitted is automatically denied", "All users are denied access until an administrator approves", "Deny rules override all permit rules regardless of order"], answer: 1, explanation: "Implicit deny is a foundational security principle — if there is no rule explicitly granting access, it is denied by default. This ensures unknown traffic/requests are blocked rather than permitted." },

  // ───────────── DOMAIN 2 ─────────────
  { id: 9, domain: "2", question: "An attacker sends emails pretending to be a bank to steal login credentials. This is:", options: ["Vishing", "Phishing", "Smishing", "Whaling"], answer: 1, explanation: "Phishing uses fraudulent emails impersonating trusted entities to steal sensitive information. Vishing is phone-based, smishing is SMS-based." },
  { id: 10, domain: "2", question: "Which attack involves overwhelming a system with traffic to make it unavailable?", options: ["SQL injection", "Man-in-the-middle", "DDoS", "Privilege escalation"], answer: 2, explanation: "A Distributed Denial of Service (DDoS) attack floods a target with massive traffic from multiple sources, exhausting resources and making the service unavailable." },
  { id: 11, domain: "2", question: "An attacker intercepts communication between two parties without their knowledge. This is called:", options: ["Replay attack", "Man-in-the-middle (MITM)", "Brute force", "Social engineering"], answer: 1, explanation: "MITM attacks involve an attacker secretly intercepting and potentially altering communications between two parties who believe they are communicating directly." },
  { id: 12, domain: "2", question: "Which type of malware encrypts files and demands payment for decryption?", options: ["Spyware", "Adware", "Ransomware", "Rootkit"], answer: 2, explanation: "Ransomware encrypts victim files and demands payment (ransom) for the decryption key, causing major disruptions to individuals and organizations." },
  { id: 13, domain: "2", question: "SQL injection attacks target which component of an application?", options: ["Web server configuration", "Database queries", "SSL certificates", "Firewall rules"], answer: 1, explanation: "SQL injection inserts malicious SQL code into input fields to manipulate database queries, potentially exposing, modifying, or deleting data." },
  { id: 14, domain: "2", question: "A vulnerability scanner found an issue but it turned out to not be a real problem. This is called a:", options: ["True positive", "False positive", "True negative", "False negative"], answer: 1, explanation: "A false positive occurs when a security tool reports a vulnerability or threat that does not actually exist, requiring time to investigate and dismiss." },
  { id: 15, domain: "2", question: "Which BEST describes a rootkit?", options: ["Software that displays ads", "Malware that gains privileged access and hides its presence", "A type of ransomware", "A network scanning tool"], answer: 1, explanation: "A rootkit gains administrative (root) access to a system and conceals its presence and other malware, making detection and removal extremely difficult." },
  { id: 16, domain: "2", question: "An attacker tricks a user into running malicious code disguised as legitimate software. This is:", options: ["Worm", "Trojan horse", "Virus", "Spyware"], answer: 1, explanation: "A Trojan horse disguises itself as legitimate or desirable software to trick users into installing it, then executes malicious actions without the user's knowledge." },
  { id: 201, domain: "2", question: "An attacker captures authentication tokens and reuses them later. This is called a:", options: ["Pass-the-hash attack", "Replay attack", "Session hijacking", "Credential stuffing"], answer: 1, explanation: "A replay attack captures a valid transmission (like auth tokens or session data) and retransmits it later to authenticate as the legitimate user." },
  { id: 202, domain: "2", question: "Which attack specifically targets high-profile executives with personalized phishing emails?", options: ["Spear phishing", "Whaling", "Vishing", "Smishing"], answer: 1, explanation: "Whaling is a spear phishing attack targeting senior executives (the 'big fish') with highly personalized content referencing their specific role, company, or responsibilities." },
  { id: 203, domain: "2", question: "A malicious actor gains access to a facility by following an authorized employee through a secured door. This is:", options: ["Piggybacking / Tailgating", "Shoulder surfing", "Dumpster diving", "Pretexting"], answer: 0, explanation: "Tailgating/piggybacking occurs when an unauthorized person physically follows an authorized employee through a secured entry point without using their own credentials." },
  { id: 204, domain: "2", question: "An attacker uses previously exposed username/password pairs to attempt login on multiple sites. This is:", options: ["Brute force", "Password spraying", "Credential stuffing", "Dictionary attack"], answer: 2, explanation: "Credential stuffing uses leaked credential pairs from one breach to attempt authentication on other services, exploiting password reuse across sites." },
  { id: 205, domain: "2", question: "Which vulnerability allows an attacker to inject malicious scripts into web pages viewed by other users?", options: ["SQL injection", "Cross-site scripting (XSS)", "Directory traversal", "Buffer overflow"], answer: 1, explanation: "XSS injects malicious client-side scripts into web pages. When victims view the page, the script executes in their browser, potentially stealing cookies or credentials." },
  { id: 206, domain: "2", question: "A buffer overflow attack is most dangerous because it can allow an attacker to:", options: ["Steal files from a web server", "Execute arbitrary code with elevated privileges", "Intercept encrypted traffic", "Perform DNS poisoning"], answer: 1, explanation: "Buffer overflows overwrite memory adjacent to a buffer. Attackers craft payloads that redirect execution flow to arbitrary malicious code, often gaining elevated privileges." },
  { id: 207, domain: "2", question: "Which technique do attackers use to enumerate valid usernames by observing different error messages?", options: ["Credential stuffing", "User enumeration", "Privilege escalation", "Session fixation"], answer: 1, explanation: "User enumeration exploits applications that return different responses for valid vs. invalid usernames, allowing attackers to build a list of real accounts to target." },
  { id: 208, domain: "2", question: "A scanner reports a critical vuln, but compensating controls make it unexploitable. This is BEST described as:", options: ["False positive", "True positive with accepted risk", "False negative", "True negative"], answer: 1, explanation: "This is a true positive (the vulnerability is real) but with accepted risk — the compensating controls reduce exploitability such that the organization accepts the residual risk." },
  { id: 209, domain: "2", question: "Which type of malware spreads across networks without user interaction by exploiting vulnerabilities?", options: ["Virus", "Trojan", "Worm", "Adware"], answer: 2, explanation: "Worms self-replicate and spread autonomously across networks by exploiting vulnerabilities — unlike viruses, they require no user action and no host file." },
  { id: 210, domain: "2", question: "An attacker manipulates DNS records to redirect users from a legitimate site to a malicious one. This is:", options: ["DNS poisoning / DNS spoofing", "ARP spoofing", "IP spoofing", "BGP hijacking"], answer: 0, explanation: "DNS poisoning corrupts DNS cache records so that domain lookups return attacker-controlled IP addresses, silently redirecting users to malicious sites." },
  { id: 211, domain: "2", question: "Which CVSS metric describes how complex the conditions are for an attacker to exploit a vulnerability?", options: ["Attack Vector", "Attack Complexity", "Privileges Required", "Scope"], answer: 1, explanation: "Attack Complexity in CVSS measures conditions beyond attacker control required for exploitation — Low means straightforward; High means specific, hard-to-recreate conditions are needed." },
  { id: 212, domain: "2", question: "A threat actor compromises a vendor's software update mechanism to distribute malware. This is a:", options: ["Zero-day attack", "Supply chain attack", "Watering hole attack", "Insider threat"], answer: 1, explanation: "A supply chain attack targets the distribution pipeline of trusted software or hardware — compromising updates, libraries, or third-party components to reach downstream victims." },
  { id: 213, domain: "2", question: "Which social engineering technique involves creating a fabricated scenario to extract sensitive information?", options: ["Phishing", "Pretexting", "Baiting", "Quid pro quo"], answer: 1, explanation: "Pretexting involves creating a fabricated but plausible scenario — like impersonating IT support — to manipulate targets into revealing information." },
  { id: 214, domain: "2", question: "An attacker floods a switch's MAC address table until it fails open and broadcasts all traffic. This is:", options: ["ARP poisoning", "MAC flooding", "VLAN hopping", "Port scanning"], answer: 1, explanation: "MAC flooding overwhelms a switch's CAM table with fake MAC addresses, causing it to fail open and broadcast frames to all ports, enabling traffic sniffing." },
  { id: 215, domain: "2", question: "A CSRF attack tricks a victim into:", options: ["Downloading malware from a malicious website", "Executing unwanted actions on a site where they are authenticated", "Revealing their password through a fake login page", "Installing a keylogger"], answer: 1, explanation: "CSRF exploits the trust a web app has in the user's browser — tricking authenticated users into unknowingly submitting requests (fund transfers, setting changes) to a target site." },
  { id: 216, domain: "2", question: "Which BEST describes an on-path (MITM) attack against HTTPS?", options: ["Brute-forcing the SSL private key", "Presenting a fraudulent certificate to intercept encrypted traffic", "Flooding the web server with requests", "Injecting code into HTTP headers"], answer: 1, explanation: "An on-path attacker intercepts HTTPS by presenting a fraudulent certificate to the client. If the client accepts it, the attacker decrypts traffic." },
  { id: 217, domain: "2", question: "Which attack technique attempts every possible password combination systematically?", options: ["Dictionary attack", "Brute force", "Password spraying", "Credential stuffing"], answer: 1, explanation: "Brute force tries every possible combination of characters. It guarantees eventual success but is time-intensive — defenders counter it with lockout policies and rate limiting." },
  { id: 218, domain: "2", question: "An attacker leaves infected USB drives in a company parking lot hoping employees will plug them in. This is:", options: ["Pretexting", "Baiting", "Tailgating", "Whaling"], answer: 1, explanation: "Baiting exploits curiosity or greed — leaving physical media (USB drives, CDs) in places where targets will find and use them, inadvertently installing malware." },
  { id: 219, domain: "2", question: "Which BEST describes a fileless malware attack?", options: ["Malware stored in an encrypted file on disk", "Malware that runs entirely in memory using legitimate tools like PowerShell", "Malware that deletes itself after execution", "Malware hidden inside image files"], answer: 1, explanation: "Fileless malware never writes to disk — it executes in memory using legitimate system tools (PowerShell, WMI), making it nearly invisible to traditional file-based antivirus." },
  { id: 220, domain: "2", question: "A threat actor exploits a vulnerability for which a patch has been available for months. This is exploiting a:", options: ["Zero-day vulnerability", "Known/unpatched vulnerability", "Logic flaw", "Configuration weakness"], answer: 1, explanation: "An unpatched known vulnerability has a public CVE and available fix. Attackers routinely exploit these because many organizations lag on patching despite the risk being known." },
  { id: 221, domain: "2", question: "Which attack attempts to gain higher privileges than originally granted on a compromised system?", options: ["Lateral movement", "Privilege escalation", "Persistence establishment", "Defense evasion"], answer: 1, explanation: "Privilege escalation elevates an attacker from a low-privileged account to admin/root, expanding their ability to damage, exfiltrate, or persist on the system." },
  { id: 222, domain: "2", question: "Which BEST describes a watering hole attack?", options: ["Flooding a network with authentication requests", "Compromising a website frequently visited by the intended targets", "Poisoning the DNS of a target organization", "Installing malware via physical USB access"], answer: 1, explanation: "A watering hole attack compromises websites that the target group is known to visit, infecting them to attack visitors — named after predators waiting at watering holes." },
  { id: 223, domain: "2", question: "An attacker tries one common password against thousands of accounts to avoid lockouts. This is:", options: ["Brute force", "Credential stuffing", "Password spraying", "Dictionary attack"], answer: 2, explanation: "Password spraying tries one or a few common passwords against many accounts simultaneously — it stays below lockout thresholds while still testing many accounts." },
  { id: 224, domain: "2", question: "Which of the following describes a logic bomb?", options: ["Malware that replicates across networks automatically", "Malicious code that executes when a specific condition or trigger is met", "A hardware device planted to intercept keystrokes", "Ransomware that detonates immediately upon execution"], answer: 1, explanation: "A logic bomb is dormant code that activates when a specific condition is met — like a certain date, a user login, or a file deletion — often planted by disgruntled insiders." },
  { id: 225, domain: "2", question: "An IDS alert fires on normal traffic. A real attack simultaneously generates no alert. These are respectively:", options: ["True positive and true negative", "False positive and false negative", "True negative and false positive", "False negative and true positive"], answer: 1, explanation: "The normal traffic triggering an alert is a false positive. The real attack generating no alert is a false negative — the most dangerous IDS failure mode." },

  // ───────────── DOMAIN 3 ─────────────
  { id: 17, domain: "3", question: "Which network zone typically hosts public-facing servers like web and email?", options: ["Intranet", "DMZ (Demilitarized Zone)", "LAN", "VLAN"], answer: 1, explanation: "A DMZ is a network segment that sits between the internet and internal network, hosting public-facing servers while protecting the internal network from direct exposure." },
  { id: 18, domain: "3", question: "What is the PRIMARY benefit of network segmentation?", options: ["Faster internet speeds", "Limiting the spread of attacks between network zones", "Reducing hardware costs", "Simplifying network management"], answer: 1, explanation: "Network segmentation divides a network into zones, containing breaches and limiting lateral movement — if one segment is compromised, others remain protected." },
  { id: 19, domain: "3", question: "Which cloud model provides the most control to the customer?", options: ["SaaS", "PaaS", "IaaS", "FaaS"], answer: 2, explanation: "IaaS (Infrastructure as a Service) gives customers the most control, managing OS, applications, and data, while the provider manages physical hardware and virtualization." },
  { id: 20, domain: "3", question: "A company wants to ensure data remains available even if one data center fails. Which concept addresses this?", options: ["Encryption", "Redundancy", "Obfuscation", "Tokenization"], answer: 1, explanation: "Redundancy involves duplicating critical components or systems so that if one fails, operations continue uninterrupted — key to high availability." },
  { id: 21, domain: "3", question: "Which BEST describes a VPN?", options: ["A firewall that blocks all incoming traffic", "An encrypted tunnel over a public network for secure communication", "A type of antivirus software", "A network protocol for routing"], answer: 1, explanation: "A VPN creates an encrypted tunnel over public infrastructure (like the internet), allowing secure remote access as if connected directly to a private network." },
  { id: 22, domain: "3", question: "What does 'air gap' mean in security?", options: ["A vulnerability in wireless networks", "Physical isolation of a system from unsecured networks", "The space between firewall rules", "A type of network encryption"], answer: 1, explanation: "An air gap physically isolates a secure computer system from unsecured networks including the internet, preventing remote attacks entirely." },
  { id: 301, domain: "3", question: "Which firewall type inspects the state of active connections and makes decisions based on context, not just rules?", options: ["Packet filtering firewall", "Stateful inspection firewall", "Application-layer firewall", "Circuit-level gateway"], answer: 1, explanation: "Stateful inspection firewalls track the state of network connections and make decisions based on the full context of the session, not just individual packets." },
  { id: 302, domain: "3", question: "A company is deploying a zero trust architecture. What is the core principle?", options: ["Trust all internal traffic but verify external traffic", "Never trust, always verify — every access request must be authenticated regardless of location", "Block all external network access by default", "Only encrypt data leaving the network perimeter"], answer: 1, explanation: "Zero trust operates on 'never trust, always verify' — no user or device is trusted by default regardless of whether they are inside or outside the network perimeter." },
  { id: 303, domain: "3", question: "Which BEST describes a software-defined network (SDN)?", options: ["A network using only wireless infrastructure", "A network architecture that separates the control plane from the data plane", "A network with no physical hardware", "A network managed entirely by AI"], answer: 1, explanation: "SDN decouples the control plane (routing decisions) from the data plane (packet forwarding), enabling centralized programmable network management." },
  { id: 304, domain: "3", question: "An organization uses microsegmentation in their data center. What does this achieve?", options: ["Faster packet routing between servers", "Granular isolation of individual workloads reducing lateral movement risk", "Replacing physical firewalls with virtual ones", "Encrypting all east-west traffic automatically"], answer: 1, explanation: "Microsegmentation creates fine-grained security perimeters around individual workloads, so even if an attacker breaches one segment, lateral movement to other workloads is blocked." },
  { id: 305, domain: "3", question: "What is the PRIMARY security concern with public cloud infrastructure?", options: ["Slower performance than on-premises", "Misunderstanding the shared responsibility model — who is responsible for which security controls", "Higher hardware costs", "Inability to scale resources dynamically"], answer: 1, explanation: "The shared responsibility model is a critical cloud security concept — the provider secures the infrastructure, but the customer is responsible for securing their data, applications, and configurations." },
  { id: 306, domain: "3", question: "Which wireless security protocol is currently considered the strongest for enterprise Wi-Fi?", options: ["WEP", "WPA", "WPA2-Personal", "WPA3-Enterprise"], answer: 3, explanation: "WPA3-Enterprise is the current strongest standard, using 192-bit encryption and SAE (Simultaneous Authentication of Equals), replacing WPA2 which has known vulnerabilities like KRACK." },
  { id: 307, domain: "3", question: "A load balancer distributes traffic across multiple servers. What security benefit does this provide?", options: ["Encrypts traffic between clients and servers", "Protects against DDoS by distributing load and preventing single point of failure", "Authenticates users before forwarding requests", "Scans traffic for malware before delivery"], answer: 1, explanation: "Load balancers distribute traffic across multiple servers, providing resilience against DDoS attacks and eliminating single points of failure." },
  { id: 308, domain: "3", question: "Which BEST describes a proxy server's security function?", options: ["It encrypts all data stored on endpoints", "It acts as an intermediary, hiding client identity and filtering outbound traffic", "It replaces a firewall for perimeter security", "It scans files for viruses before storage"], answer: 1, explanation: "A proxy server sits between clients and external servers — it masks client IP addresses, filters content, caches responses, and can block access to prohibited destinations." },
  { id: 309, domain: "3", question: "What is the purpose of Network Access Control (NAC)?", options: ["To encrypt all network traffic", "To enforce security policy compliance before granting network access to devices", "To monitor bandwidth usage", "To assign IP addresses to devices"], answer: 1, explanation: "NAC verifies that devices meet security requirements (patched, running AV, compliant OS) before allowing network access, preventing non-compliant or rogue devices from connecting." },
  { id: 310, domain: "3", question: "Which cloud deployment model gives an organization the MOST privacy and control?", options: ["Public cloud", "Community cloud", "Hybrid cloud", "Private cloud"], answer: 3, explanation: "A private cloud is dedicated exclusively to one organization, providing maximum control over data, security policies, and compliance — at higher cost than public cloud." },
  { id: 311, domain: "3", question: "An IDS detects suspicious traffic but does not block it. An IPS detects and blocks it. Which is PASSIVE?", options: ["IPS", "IDS", "Both are passive", "Neither is passive"], answer: 1, explanation: "An IDS (Intrusion Detection System) is passive — it monitors and alerts but takes no action. An IPS (Intrusion Prevention System) is inline and actively blocks malicious traffic." },
  { id: 312, domain: "3", question: "Which protocol is used to securely manage network devices, replacing Telnet?", options: ["FTP", "SSH", "SNMP", "RDP"], answer: 1, explanation: "SSH (Secure Shell) encrypts remote management sessions, replacing insecure protocols like Telnet which transmit credentials and data in plaintext." },
  { id: 313, domain: "3", question: "A company implements DNSSEC. What does this protect against?", options: ["Encrypting DNS queries from eavesdropping", "DNS cache poisoning by cryptographically signing DNS records", "Blocking access to malicious domains", "Hiding the company's internal DNS structure"], answer: 1, explanation: "DNSSEC adds cryptographic signatures to DNS records, allowing resolvers to verify record authenticity and preventing DNS cache poisoning attacks." },
  { id: 314, domain: "3", question: "Which cloud service model provides developers a platform to build and deploy apps without managing infrastructure?", options: ["IaaS", "SaaS", "PaaS", "DaaS"], answer: 2, explanation: "PaaS (Platform as a Service) provides a managed development and deployment environment — developers focus on code while the provider manages OS, middleware, and runtime." },
  { id: 315, domain: "3", question: "An organization implements east-west traffic inspection. What threat does this primarily address?", options: ["External perimeter attacks", "Lateral movement by attackers who have already gained internal access", "DDoS attacks against public services", "Malware delivered via email attachments"], answer: 1, explanation: "East-west traffic is internal server-to-server communication. Inspecting it detects lateral movement by attackers who have already breached the perimeter." },
  { id: 316, domain: "3", question: "Which BEST describes a CDN from a security perspective?", options: ["To encrypt content before delivery", "To absorb DDoS traffic and cache content closer to users reducing origin server exposure", "To authenticate users before serving content", "To monitor traffic for SQL injection attacks"], answer: 1, explanation: "CDNs distribute content across global edge nodes, absorbing DDoS traffic far from the origin server and masking the origin IP address, significantly reducing attack surface." },
  { id: 317, domain: "3", question: "A company needs to connect two offices securely over the internet at low cost. Which is MOST appropriate?", options: ["Dedicated MPLS line", "Site-to-site VPN", "Direct peering agreement", "Leased line"], answer: 1, explanation: "A site-to-site VPN creates an encrypted tunnel between two network gateways over the existing internet, providing secure connectivity at a fraction of the cost of dedicated circuits." },
  { id: 318, domain: "3", question: "What is the primary security risk of using default credentials on network devices?", options: ["Performance degradation", "Immediate unauthorized access since defaults are publicly known", "Incompatibility with security tools", "Certificate validation failures"], answer: 1, explanation: "Default credentials (admin/admin, etc.) are publicly documented for every device. Attackers routinely scan for devices using defaults — changing them is a foundational hardening step." },
  { id: 319, domain: "3", question: "Which BEST describes containerization from a security perspective?", options: ["Containers provide stronger isolation than virtual machines", "Containers share the host OS kernel, creating a larger shared attack surface than VMs", "Containers are immune to privilege escalation attacks", "Containers automatically encrypt all stored data"], answer: 1, explanation: "Containers share the host OS kernel, so a container escape or kernel vulnerability can affect all containers on the host — VMs have stronger isolation via hypervisor separation." },
  { id: 320, domain: "3", question: "A CASB is deployed between users and cloud services. What is its PRIMARY function?", options: ["To replace the organization's firewall", "To enforce security policies for cloud service usage and provide visibility", "To encrypt all cloud-stored data", "To authenticate users to cloud services using biometrics"], answer: 1, explanation: "A Cloud Access Security Broker (CASB) sits between users and cloud services, enforcing security policies, providing visibility into cloud usage (shadow IT), and controlling data movement." },
  { id: 321, domain: "3", question: "Which BEST describes a jump server (jump box)?", options: ["A server that automatically patches other servers", "A hardened, monitored intermediary host used to access systems in a protected network zone", "A server that load-balances admin traffic", "A honeypot designed to attract attackers"], answer: 1, explanation: "A jump server is a secured, audited intermediary host through which administrators connect to manage systems in sensitive zones — creating a single monitored access point." },
  { id: 322, domain: "3", question: "An organization uses 802.1X on their network switches. What does this enforce?", options: ["Encryption of all switch traffic", "Port-based authentication — devices must authenticate before network access is granted", "VLAN assignment based on MAC address only", "Automatic firmware updates for connected devices"], answer: 1, explanation: "802.1X is a port-based Network Access Control standard requiring devices to authenticate (via RADIUS) before the switch port is opened — preventing unauthorized devices from connecting." },
  { id: 323, domain: "3", question: "Which BEST describes a next-generation firewall (NGFW) compared to a traditional stateful firewall?", options: ["NGFWs only inspect layer 3 and 4 headers", "NGFWs add deep packet inspection, application awareness, and integrated IPS capabilities", "NGFWs are faster but less secure than stateful firewalls", "NGFWs replace the need for network segmentation"], answer: 1, explanation: "NGFWs extend stateful inspection with deep packet inspection (DPI), application-layer visibility, user identity awareness, and integrated IPS — enabling much more granular policy control." },
  { id: 324, domain: "3", question: "A company uses SASE architecture. What does SASE combine?", options: ["Server virtualization and storage area networks", "Networking (SD-WAN) and security services (CASB, SWG, ZTNA) delivered from the cloud", "Satellite connectivity and endpoint security", "Software-defined storage and access control"], answer: 1, explanation: "SASE (Secure Access Service Edge) converges SD-WAN networking with cloud-delivered security services (CASB, SWG, ZTNA, FWaaS) into a single cloud-native platform for distributed organizations." },
  { id: 325, domain: "3", question: "What is a PRIMARY concern when using a community cloud?", options: ["Higher cost than private cloud", "Shared infrastructure between organizations may expose data to other tenants", "Inability to customize security controls", "Lower availability than public cloud"], answer: 1, explanation: "Community clouds share infrastructure among organizations with common interests. While more controlled than public cloud, data may still be exposed to other community members." },

  // ───────────── DOMAIN 4 ─────────────
  { id: 23, domain: "4", question: "Which is the FIRST step in the incident response process?", options: ["Containment", "Eradication", "Identification/Preparation", "Recovery"], answer: 2, explanation: "Preparation (and identification) is the first phase — having plans, tools, and trained staff ready before an incident occurs is critical to effective response." },
  { id: 24, domain: "4", question: "What is the purpose of a SIEM system?", options: ["To encrypt network traffic", "To aggregate and analyze security logs from multiple sources", "To manage user passwords", "To perform vulnerability scans"], answer: 1, explanation: "SIEM (Security Information and Event Management) collects and correlates logs from across an environment to detect threats, generate alerts, and support investigations." },
  { id: 25, domain: "4", question: "Which concept ensures only approved software can run on a system?", options: ["Blacklisting", "Whitelisting/Allowlisting", "Sandboxing", "Patching"], answer: 1, explanation: "Allowlisting (whitelisting) permits only pre-approved applications to execute, blocking anything not explicitly trusted — much stronger than blacklisting known bad software." },
  { id: 26, domain: "4", question: "A forensic investigator must ensure evidence is not tampered with. Which concept protects this?", options: ["Data encryption", "Chain of custody", "Access control", "Digital signatures"], answer: 1, explanation: "Chain of custody documents who has handled evidence, when, and how — maintaining integrity and admissibility in legal proceedings." },
  { id: 27, domain: "4", question: "Which tool is used to capture and analyze network packets?", options: ["Nmap", "Wireshark", "Metasploit", "Nessus"], answer: 1, explanation: "Wireshark is a packet analyzer that captures and displays network traffic in real time, essential for troubleshooting and security analysis." },
  { id: 28, domain: "4", question: "What is the purpose of patch management?", options: ["To monitor user activity", "To keep software updated and fix known vulnerabilities", "To configure firewalls", "To encrypt data at rest"], answer: 1, explanation: "Patch management systematically applies updates to software to fix vulnerabilities, reducing the attack surface before exploits can take advantage." },
  { id: 401, domain: "4", question: "During incident response, which phase involves isolating affected systems to prevent further spread?", options: ["Identification", "Containment", "Eradication", "Recovery"], answer: 1, explanation: "Containment stops the incident from spreading while preserving evidence. It may involve isolating hosts, blocking network segments, or disabling compromised accounts." },
  { id: 402, domain: "4", question: "A host is communicating with a known C2 (command and control) server. What MOST likely occurred?", options: ["The host is performing a port scan", "The host is infected with malware beaconing to an attacker-controlled server", "The host is running a VPN connection", "The host is performing a software update"], answer: 1, explanation: "C2 communication indicates malware on the compromised host is receiving commands from an attacker's server — a key indicator of a successful intrusion." },
  { id: 403, domain: "4", question: "What is the key difference between a vulnerability assessment and a penetration test?", options: ["They are identical processes", "A vulnerability assessment identifies weaknesses; a penetration test actively exploits them to measure real-world impact", "A penetration test only scans for vulnerabilities", "A vulnerability assessment requires more expertise"], answer: 1, explanation: "Vulnerability assessments identify and prioritize weaknesses without exploitation. Penetration tests go further — actively exploiting vulnerabilities to demonstrate actual impact and measure true risk." },
  { id: 404, domain: "4", question: "Which BEST describes threat hunting?", options: ["Running automated vulnerability scans", "Proactively searching for threats that have evaded existing security controls", "Responding to SIEM alerts", "Performing penetration testing on external systems"], answer: 1, explanation: "Threat hunting is a proactive, hypothesis-driven search for hidden threats that have not triggered alerts — analysts manually hunt for IOCs, TTPs, and anomalies that automated tools missed." },
  { id: 405, domain: "4", question: "Repeated failed login attempts followed by a successful login from the same IP MOST likely indicates:", options: ["A misconfigured authentication system", "A successful brute force or password spray attack", "A legitimate forgotten password reset", "Normal user behavior"], answer: 1, explanation: "Multiple failures followed by success from the same source is a classic indicator of a brute force or password spray attack — the attacker eventually guessed or found valid credentials." },
  { id: 406, domain: "4", question: "What does EDR provide that traditional antivirus cannot?", options: ["Faster virus signature updates", "Behavioral monitoring, threat hunting capabilities, and response actions on endpoints", "Network traffic encryption on endpoints", "Patch management for endpoints"], answer: 1, explanation: "EDR continuously monitors endpoint behavior, detects anomalous activity (not just known signatures), enables threat hunting, and provides response capabilities like remote isolation." },
  { id: 407, domain: "4", question: "Which is the PRIMARY goal of digital forensics?", options: ["To prevent future attacks", "To collect, preserve, and analyze digital evidence to understand what happened", "To restore systems as quickly as possible", "To identify and patch vulnerabilities"], answer: 1, explanation: "Digital forensics focuses on properly collecting and analyzing evidence to reconstruct events, identify attackers, and support legal proceedings — preservation and integrity are paramount." },
  { id: 408, domain: "4", question: "A system administrator enables audit logging on all servers. Which security function does this PRIMARILY support?", options: ["Prevention", "Detection and accountability", "Encryption", "Availability"], answer: 1, explanation: "Audit logging records user actions and system events, supporting detection of malicious activity and establishing accountability — critical for forensic investigations and compliance." },
  { id: 409, domain: "4", question: "Which tool would BEST help identify all open ports and services running on a target host?", options: ["Wireshark", "Nmap", "Metasploit", "Burp Suite"], answer: 1, explanation: "Nmap (Network Mapper) is the industry-standard tool for network discovery, port scanning, and service/version detection — used in both reconnaissance and vulnerability assessments." },
  { id: 410, domain: "4", question: "During a forensic investigation, an analyst creates a bit-for-bit copy of a hard drive. This is called:", options: ["A backup", "A forensic image", "A snapshot", "A clone"], answer: 1, explanation: "A forensic image is an exact bit-for-bit copy of storage media including deleted files, unallocated space, and file slack — essential for analysis without altering original evidence." },
  { id: 411, domain: "4", question: "What is the purpose of the eradication phase in incident response?", options: ["Stop the attack from spreading to other systems", "Remove the root cause, malware, and attacker persistence mechanisms from affected systems", "Document lessons learned from the incident", "Restore systems to normal operations"], answer: 1, explanation: "Eradication removes everything the attacker installed or modified — malware, backdoors, persistence mechanisms, unauthorized accounts — ensuring the threat is fully eliminated before recovery." },
  { id: 412, domain: "4", question: "Which BEST describes the purpose of SOAR?", options: ["To replace human security analysts entirely", "To automate repetitive security tasks and coordinate response across tools, reducing response time", "To provide real-time network traffic analysis", "To manage vulnerability scan scheduling"], answer: 1, explanation: "SOAR platforms automate repetitive SOC tasks (alert triage, enrichment, response playbooks) and integrate security tools, dramatically reducing mean time to respond (MTTR)." },
  { id: 413, domain: "4", question: "A penetration tester has no prior knowledge of the target environment. This is called:", options: ["Gray box testing", "White box testing", "Black box testing", "Crystal box testing"], answer: 2, explanation: "Black box testing simulates an external attacker with zero prior knowledge — the tester must discover everything through reconnaissance, mimicking real-world attack conditions." },
  { id: 414, domain: "4", question: "Which log source would MOST likely contain evidence of a successful SQL injection attack?", options: ["Windows Event Logs", "Web server access logs and application logs", "Firewall logs", "DNS query logs"], answer: 1, explanation: "Web server access logs and application error logs capture HTTP requests including injected SQL syntax in URL parameters or POST bodies — key forensic sources for web application attacks." },
  { id: 415, domain: "4", question: "What is the MITRE ATT&CK framework used for?", options: ["Defining encryption standards for government agencies", "Documenting real-world adversary tactics, techniques, and procedures (TTPs) for threat intelligence", "Certifying security professionals", "Prescribing incident response procedures"], answer: 1, explanation: "MITRE ATT&CK is a comprehensive knowledge base of adversary behaviors based on real-world observations, used for threat intelligence, detection engineering, red teaming, and gap analysis." },
  { id: 416, domain: "4", question: "An analyst blocks known malicious IPs using threat intelligence feeds. Which concept does this represent?", options: ["Vulnerability management", "IOC-based defense using threat intelligence", "Zero trust", "Security awareness"], answer: 1, explanation: "IOC-based defense uses known threat indicators (malicious IPs, domains, file hashes) from threat intelligence to proactively block or detect threats — part of a threat-informed defense strategy." },
  { id: 417, domain: "4", question: "After an incident, a team meets to discuss what worked and what failed. This meeting is called:", options: ["Threat modeling session", "Lessons learned / post-mortem", "Risk assessment", "Tabletop exercise"], answer: 1, explanation: "A lessons learned (post-mortem) review after an incident identifies what worked, what failed, and what needs improvement — essential for maturing the incident response capability." },
  { id: 418, domain: "4", question: "Which BEST describes the order of volatility in digital forensics?", options: ["Disk storage should always be collected first", "Evidence should be collected from most volatile (RAM) to least volatile (archived backups)", "All evidence has equal volatility", "Network traffic should always be captured last"], answer: 1, explanation: "Order of volatility guides forensic collection from most ephemeral to most persistent: CPU registers → RAM → swap/temp → disk → remote logs → archived backups. Volatile evidence disappears when power is lost." },
  { id: 419, domain: "4", question: "A company conducts tabletop exercises for incident response. What is the PRIMARY benefit?", options: ["It tests technical controls under real attack conditions", "It allows teams to walk through response procedures verbally, identifying gaps without real impact", "It replaces the need for an incident response plan", "It measures system performance under stress"], answer: 1, explanation: "Tabletop exercises simulate incident scenarios in discussion format, letting teams test decision-making and identify procedure gaps, coordination issues, and training needs without real-world impact." },
  { id: 420, domain: "4", question: "Which is the BEST indicator that data exfiltration may be occurring?", options: ["High CPU usage on a workstation", "Unusual large outbound data transfers to unknown external IPs at odd hours", "A user resetting their password", "Increased inbound web traffic"], answer: 1, explanation: "Anomalous outbound transfers — especially large volumes to unfamiliar external destinations at unusual times — are classic indicators of data exfiltration. DLP and SIEM rules should flag this." },
  { id: 421, domain: "4", question: "A vulnerability scanner finds a system running an unsupported OS. This is BEST classified as:", options: ["A misconfiguration", "A legacy/end-of-life vulnerability", "A zero-day vulnerability", "A false positive"], answer: 1, explanation: "End-of-life or legacy systems no longer receive security patches, making them permanently vulnerable. This is one of the highest-risk vulnerability categories in enterprise environments." },
  { id: 422, domain: "4", question: "Which BEST describes the function of a web application firewall (WAF)?", options: ["Encrypts all web traffic between client and server", "Inspects and filters HTTP/HTTPS traffic to protect web applications from attacks like XSS and SQLi", "Replaces TLS certificates on web servers", "Performs deep packet inspection at layers 3 and 4"], answer: 1, explanation: "A WAF operates at layer 7, inspecting HTTP/HTTPS traffic specifically for web application attacks (SQLi, XSS, CSRF, etc.) — protecting applications that a traditional network firewall cannot." },
  { id: 423, domain: "4", question: "An attacker creates a scheduled task that re-installs malware on reboot. This technique is called:", options: ["Lateral movement", "Privilege escalation", "Persistence", "Defense evasion"], answer: 2, explanation: "Persistence mechanisms ensure an attacker maintains access even after reboots or remediation attempts — scheduled tasks, registry keys, and startup entries are common persistence techniques." },

  // ───────────── DOMAIN 5 ─────────────
  { id: 29, domain: "5", question: "Which regulation primarily governs the protection of healthcare information in the US?", options: ["PCI DSS", "GDPR", "HIPAA", "SOX"], answer: 2, explanation: "HIPAA (Health Insurance Portability and Accountability Act) sets standards for protecting sensitive patient health information in the United States." },
  { id: 30, domain: "5", question: "A risk assessment determines a threat is likely but impact is low. What is the appropriate response?", options: ["Accept the risk", "Transfer the risk", "Avoid the risk", "Implement maximum controls regardless of cost"], answer: 0, explanation: "Risk acceptance is appropriate when the cost of mitigation exceeds the potential impact, or when the risk level is within the organization's tolerance." },
  { id: 31, domain: "5", question: "What is the purpose of a Business Continuity Plan (BCP)?", options: ["To prevent all cyberattacks", "To ensure critical business functions continue during and after a disaster", "To manage employee schedules", "To document security policies"], answer: 1, explanation: "A BCP outlines how an organization will maintain essential operations during a disruption and recover to normal operations as quickly as possible." },
  { id: 32, domain: "5", question: "Which metric measures how long a system can be down before causing unacceptable business impact?", options: ["RTO (Recovery Time Objective)", "RPO (Recovery Point Objective)", "MTTR (Mean Time to Repair)", "MTTF (Mean Time to Failure)"], answer: 0, explanation: "RTO defines the maximum acceptable downtime — how quickly a system must be restored. RPO defines how much data loss is acceptable (time since last backup)." },
  { id: 33, domain: "5", question: "A security awareness training program is an example of which type of control?", options: ["Technical control", "Physical control", "Administrative control", "Compensating control"], answer: 2, explanation: "Administrative controls are policies, procedures, and training programs that govern how people behave — security awareness training is a classic example." },
  { id: 34, domain: "5", question: "Which BEST describes data classification?", options: ["Encrypting all sensitive data", "Organizing data by sensitivity level to apply appropriate protections", "Backing up data to multiple locations", "Deleting outdated data"], answer: 1, explanation: "Data classification assigns sensitivity labels (public, internal, confidential, top secret) to data so appropriate security controls can be applied proportionally." },
  { id: 501, domain: "5", question: "Which regulation requires organizations processing EU citizens' data to comply with strict privacy requirements regardless of location?", options: ["HIPAA", "PCI DSS", "GDPR", "FISMA"], answer: 2, explanation: "GDPR (General Data Protection Regulation) has extraterritorial scope — any organization processing EU residents' personal data must comply, regardless of the organization's location." },
  { id: 502, domain: "5", question: "A company purchases cyber insurance to offset financial losses from a breach. This is an example of:", options: ["Risk avoidance", "Risk acceptance", "Risk transference", "Risk mitigation"], answer: 2, explanation: "Risk transference shifts financial consequences of a risk to a third party — cyber insurance is the most common form, transferring breach-related costs to the insurer." },
  { id: 503, domain: "5", question: "What is the difference between a Disaster Recovery Plan (DRP) and a Business Continuity Plan (BCP)?", options: ["They are identical documents", "DRP focuses on restoring IT systems; BCP focuses on maintaining all critical business operations", "BCP is only for natural disasters; DRP covers cyberattacks", "DRP is strategic; BCP is tactical"], answer: 1, explanation: "A DRP focuses specifically on restoring IT infrastructure and systems after a disruption. A BCP is broader, covering all critical business processes including IT, staffing, facilities, and communications." },
  { id: 504, domain: "5", question: "Which BEST describes a quantitative risk assessment?", options: ["Uses descriptive ratings like High, Medium, Low", "Assigns numerical values (dollar amounts, probabilities) to calculate ALE", "Relies entirely on expert opinion", "Ranks risks by likelihood only"], answer: 1, explanation: "Quantitative risk assessment uses numbers — ALE = SLE × ARO. This enables direct cost-benefit analysis for controls." },
  { id: 505, domain: "5", question: "An organization must comply with PCI DSS. What type of data does this regulation protect?", options: ["Patient health records", "Cardholder data and payment card information", "Government classified information", "EU citizens' personal data"], answer: 1, explanation: "PCI DSS (Payment Card Industry Data Security Standard) protects cardholder data — credit/debit card numbers, CVVs, PINs — for any organization that stores, processes, or transmits payment card data." },
  { id: 506, domain: "5", question: "A control costs $50,000 but the risk's ALE is $10,000. What should be recommended?", options: ["Implement the control immediately", "Accept the risk — control cost exceeds potential annual loss", "Transfer the risk through insurance", "Avoid the risk by discontinuing the activity"], answer: 1, explanation: "When control cost ($50K) exceeds the Annual Loss Expectancy ($10K), implementing the control is not cost-effective. Accepting or transferring the risk is more prudent." },
  { id: 507, domain: "5", question: "Which framework is commonly used by US federal agencies as a cybersecurity risk management framework?", options: ["ISO 27001", "NIST RMF", "CIS Controls", "COBIT"], answer: 1, explanation: "The NIST Risk Management Framework (RMF) provides a structured process for managing cybersecurity risk in US federal agencies, integrating security into the system development lifecycle." },
  { id: 508, domain: "5", question: "What does 'data sovereignty' mean?", options: ["The right to delete personal data", "Data is subject to the laws of the country where it is physically stored", "Organizations own all data their users generate", "Encrypted data cannot be accessed by any government"], answer: 1, explanation: "Data sovereignty means data is subject to the laws and governance of the nation where it physically resides — critical for multi-national cloud deployments where data location affects legal obligations." },
  { id: 509, domain: "5", question: "An organization conducts a BIA (Business Impact Analysis). What is its PRIMARY output?", options: ["A list of all vulnerabilities in the network", "Identification of critical business functions and the impact of their disruption over time", "An updated incident response playbook", "A list of regulatory requirements to comply with"], answer: 1, explanation: "A BIA identifies critical business processes, quantifies the impact of their disruption, and establishes MTD, RTO, and RPO values that drive recovery planning." },
  { id: 510, domain: "5", question: "Which BEST describes the principle of data minimization?", options: ["Encrypting all collected data", "Collecting only the minimum data necessary for the specified purpose", "Deleting all data after 30 days", "Anonymizing all personal data before storage"], answer: 1, explanation: "Data minimization (a core GDPR principle) limits collection to only what is strictly necessary for the stated purpose, reducing privacy risk and breach exposure." },
  { id: 511, domain: "5", question: "A third-party vendor has access to your company's sensitive data. What document governs their security obligations?", options: ["NDA only", "BAA or data processing agreement specifying security and privacy requirements", "An SLA focused on uptime guarantees", "An acceptable use policy"], answer: 1, explanation: "A Business Associate Agreement (BAA) or Data Processing Agreement legally obligates third parties to protect sensitive data with specified security controls and breach notification requirements." },
  { id: 512, domain: "5", question: "Which BEST describes the purpose of a security policy?", options: ["To provide step-by-step technical configuration instructions", "To define high-level management intent, direction, and required behavior for information security", "To document specific vulnerability remediation steps", "To create technical standards for system hardening"], answer: 1, explanation: "A security policy is a high-level document expressing management's intent and direction. It sets the 'what and why' — standards, procedures, and guidelines provide the 'how.'" },
  { id: 513, domain: "5", question: "What is the PRIMARY purpose of a privacy impact assessment (PIA)?", options: ["To test technical controls protecting personal data", "To identify and address privacy risks before deploying new systems or processes involving personal data", "To document all personal data stored by the organization", "To comply specifically with HIPAA requirements"], answer: 1, explanation: "A PIA evaluates how new projects, systems, or processes will affect individual privacy — identifying risks before deployment and determining controls needed to mitigate them." },
  { id: 514, domain: "5", question: "An organization's RPO is 4 hours. What does this mean?", options: ["Systems must be restored within 4 hours of an outage", "No more than 4 hours of data loss is acceptable — backups must occur at least every 4 hours", "The organization can survive 4 hours without any business operations", "Critical systems must have 4 hours of redundancy"], answer: 1, explanation: "RPO (Recovery Point Objective) defines acceptable data loss measured in time — an RPO of 4 hours means backups must be frequent enough that no more than 4 hours of data can be lost." },
  { id: 515, domain: "5", question: "Which BEST describes the purpose of a security audit vs. a security assessment?", options: ["They are the same thing", "An audit measures compliance against a specific standard; an assessment evaluates overall security posture", "An assessment is always performed by external parties; audits are internal", "Audits evaluate technical controls; assessments evaluate policies only"], answer: 1, explanation: "An audit is a formal, structured review against defined criteria (compliance standards). An assessment is broader — evaluating overall security posture, identifying gaps, and recommending improvements." },
  { id: 516, domain: "5", question: "What is the Maximum Tolerable Downtime (MTD)?", options: ["The time required to restore a system from backup", "The longest period a business function can be unavailable before causing irreparable damage", "The frequency at which backups must be performed", "The average time to detect and respond to an incident"], answer: 1, explanation: "MTD is the upper limit of downtime a business can sustain before suffering irreversible damage — RTO must always be less than MTD." },
  { id: 517, domain: "5", question: "An employee receives a suspicious email asking them to verify credentials. Security awareness training teaches them to:", options: ["Respond with credentials to stay compliant", "Verify the sender, check the URL carefully, and report it to the security team", "Forward it to all colleagues as a warning", "Delete the email and take no further action"], answer: 1, explanation: "Effective security awareness training teaches employees to scrutinize sender addresses and URLs, avoid clicking suspicious links, and report potential phishing to the security team." },
  { id: 518, domain: "5", question: "Which BEST describes 'privacy by design'?", options: ["Adding privacy controls to systems after they are built", "Integrating privacy protections into systems from the ground up during design phase", "Encrypting all data stored in the system", "Allowing users to opt out of data collection"], answer: 1, explanation: "Privacy by design embeds data protection into system architecture from the earliest design stages — proactively building in privacy controls rather than retrofitting them after deployment." },
  { id: 519, domain: "5", question: "A critical server has a 30% annual failure probability causing $200,000 in losses. What is the ALE?", options: ["$200,000", "$60,000", "$666,667", "$30,000"], answer: 1, explanation: "ALE = SLE × ARO. SLE = $200,000. ARO = 0.30. ALE = $200,000 × 0.30 = $60,000 per year." },
  { id: 520, domain: "5", question: "Which compliance framework is MOST relevant for a company that handles credit card transactions?", options: ["HIPAA", "GDPR", "SOX", "PCI DSS"], answer: 3, explanation: "PCI DSS applies to any entity that stores, processes, or transmits cardholder data regardless of size — companies processing credit card payments must comply with PCI DSS requirements." },
  { id: 521, domain: "5", question: "Which BEST describes the concept of due diligence vs. due care?", options: ["They are the same concept", "Due diligence is investigating risk before acting; due care is taking reasonable action to reduce known risk", "Due care is performed before a decision; due diligence is the ongoing response", "Due diligence applies only to vendors; due care applies only to employees"], answer: 1, explanation: "Due diligence is the research and investigation to understand risk. Due care is the ongoing reasonable action taken to protect against known risks. Both are essential to avoid negligence claims." },
  { id: 522, domain: "5", question: "A regulation requires notifying affected customers within 72 hours of discovering a breach. This is an example of:", options: ["Data minimization", "Breach notification requirement", "Data sovereignty", "Right to erasure"], answer: 1, explanation: "Breach notification requirements (like those in GDPR and many US state laws) mandate timely disclosure to affected parties and regulators after a data breach — 72 hours is the GDPR standard." },
  { id: 523, domain: "5", question: "Which BEST describes the role of a Data Protection Officer (DPO)?", options: ["To manage firewall configurations and security tools", "To oversee data protection strategy and ensure compliance with privacy regulations like GDPR", "To respond to security incidents and manage forensic investigations", "To conduct penetration tests on behalf of the organization"], answer: 1, explanation: "A DPO is a mandatory role under GDPR for certain organizations — responsible for overseeing data protection policies, advising on compliance obligations, and serving as a contact for regulators." },
  { id: 524, domain: "5", question: "An organization wants to test their BCP without disrupting operations. Which test type should they use first?", options: ["Full interruption test", "Parallel test", "Tabletop exercise", "Simulation test"], answer: 2, explanation: "A tabletop exercise is the safest starting point — it walks through scenarios in discussion format without activating actual recovery procedures, identifying gaps with zero operational impact." },
  { id: 525, domain: "5", question: "Which BEST describes the concept of vendor risk management?", options: ["Ensuring vendors are paid on time", "Assessing and managing security risks posed by third-party vendors with access to your systems or data", "Selecting vendors based solely on price", "Requiring vendors to use the same security tools as your organization"], answer: 1, explanation: "Vendor risk management evaluates the security posture of third parties, establishes contractual security requirements, and continuously monitors vendor access — critical since breaches frequently originate through third parties." },
];

const RANKS = [
  { name: "Recruit", min: 0, icon: "🔰", color: "#64748b" },
  { name: "Analyst I", min: 200, icon: "🛡️", color: "#3b82f6" },
  { name: "Analyst II", min: 500, icon: "⚔️", color: "#8b5cf6" },
  { name: "Senior Analyst", min: 1000, icon: "🔥", color: "#f59e0b" },
  { name: "Security Engineer", min: 1800, icon: "💎", color: "#10b981" },
  { name: "Security Architect", min: 2800, icon: "🏆", color: "#ef4444" },
];

function getRank(xp) {
  let rank = RANKS[0];
  for (const r of RANKS) { if (xp >= r.min) rank = r; }
  return rank;
}
function getNextRank(xp) {
  for (const r of RANKS) { if (xp < r.min) return r; }
  return null;
}

const S = {
  app: { minHeight: "100vh", minHeight: "-webkit-fill-available", background: "linear-gradient(135deg,#0a0e1a 0%,#0d1628 50%,#0a1020 100%)", fontFamily: "'Courier New',monospace", color: "#e2e8f0", padding: "16px", paddingBottom: "32px" },
  card: { background: "rgba(15,23,42,0.95)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: "12px", padding: "20px", maxWidth: "520px", margin: "0 auto", boxShadow: "0 0 40px rgba(59,130,246,0.1)" },
  btnPrimary: { width: "100%", padding: "14px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase", boxShadow: "0 4px 20px rgba(59,130,246,0.3)", WebkitTapHighlightColor: "transparent" },
  btnSecondary: { width: "100%", padding: "14px", borderRadius: "10px", border: "1px solid rgba(59,130,246,0.3)", background: "transparent", color: "#3b82f6", fontSize: "14px", fontWeight: "700", cursor: "pointer", letterSpacing: "1px", textTransform: "uppercase", WebkitTapHighlightColor: "transparent" },
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(() => { try { return parseInt(localStorage.getItem("sq_xp") || "0"); } catch { return 0; } });
  const [timeLeft, setTimeLeft] = useState(90);
  const [timerActive, setTimerActive] = useState(false);
  const [results, setResults] = useState([]);
  const [streak, setStreak] = useState(0);
  const [xpPop, setXpPop] = useState(null);

  const rank = getRank(xp);
  const nextRank = getNextRank(xp);
  const xpPct = nextRank ? Math.min(100, ((xp - rank.min) / (nextRank.min - rank.min)) * 100) : 100;

  useEffect(() => { try { localStorage.setItem("sq_xp", xp.toString()); } catch {} }, [xp]);

  useEffect(() => {
    if (!timerActive || answered) return;
    if (timeLeft <= 0) { handleTimeout(); return; }
    const t = setTimeout(() => setTimeLeft(v => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, timerActive, answered]);

  const startQuiz = () => {
    const pool = selectedDomain === "all" ? [...QUESTIONS] : QUESTIONS.filter(q => q.domain === selectedDomain);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 30);
    setQuestions(shuffled); setCurrent(0); setSelected(null); setAnswered(false);
    setScore(0); setResults([]); setStreak(0); setTimeLeft(90); setTimerActive(true);
    setScreen("quiz");
  };

  const handleTimeout = () => {
    setAnswered(true); setTimerActive(false); setStreak(0);
    setResults(r => [...r, { question: questions[current], selected: -1, correct: false }]);
  };

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx); setAnswered(true); setTimerActive(false);
    const correct = idx === questions[current].answer;
    if (correct) {
      const earned = 10 + Math.floor(timeLeft / 10) + (streak >= 2 ? 5 : 0);
      setScore(s => s + 1); setStreak(s => s + 1); setXp(x => x + earned);
      setXpPop(`+${earned} XP${streak >= 2 ? " 🔥" : ""}`);
      setTimeout(() => setXpPop(null), 1600);
    } else { setStreak(0); }
    setResults(r => [...r, { question: questions[current], selected: idx, correct }]);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) { setScreen("results"); setTimerActive(false); }
    else { setCurrent(c => c + 1); setSelected(null); setAnswered(false); setTimeLeft(90); setTimerActive(true); }
  };

  const timerColor = timeLeft > 60 ? "#10b981" : timeLeft > 30 ? "#f59e0b" : "#ef4444";

  if (screen === "home") return (
    <div style={S.app}>
      <div style={S.card}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#3b82f6", marginBottom: "8px" }}>COMPTIA</div>
          <h1 style={{ fontSize: "24px", fontWeight: "900", margin: "0 0 4px", letterSpacing: "-1px" }}>Security+ SY0-701</h1>
          <div style={{ fontSize: "10px", color: "#475569", letterSpacing: "2px" }}>EXAM PREP · 30 QUESTIONS · HARD MODE</div>
        </div>

        <div style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "10px", padding: "14px", marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "22px" }}>{rank.icon}</span>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: rank.color }}>{rank.name}</div>
                <div style={{ fontSize: "11px", color: "#475569" }}>{xp.toLocaleString()} XP</div>
              </div>
            </div>
            {nextRank && <div style={{ textAlign: "right", fontSize: "11px", color: "#475569" }}>
              <div style={{ color: "#3b82f6" }}>{(nextRank.min - xp).toLocaleString()} XP</div>
              <div>to {nextRank.name}</div>
            </div>}
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "4px", height: "5px" }}>
            <div style={{ height: "100%", width: `${xpPct}%`, background: `linear-gradient(90deg,#3b82f6,${rank.color})`, borderRadius: "4px", transition: "width 0.5s" }} />
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#475569", marginBottom: "10px" }}>SELECT DOMAIN</div>
          {DOMAINS.map(d => {
            const count = d.id === "all" ? QUESTIONS.length : QUESTIONS.filter(q => q.domain === d.id).length;
            return (
              <button key={d.id} onClick={() => setSelectedDomain(d.id)} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                width: "100%", textAlign: "left", padding: "11px 14px", marginBottom: "6px",
                borderRadius: "8px", border: `1px solid ${selectedDomain === d.id ? "#3b82f6" : "rgba(255,255,255,0.06)"}`,
                background: selectedDomain === d.id ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.02)",
                color: selectedDomain === d.id ? "#93c5fd" : "#64748b", fontSize: "12px", cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
              }}>
                <span>{d.label}</span>
                <span style={{ fontSize: "10px", color: selectedDomain === d.id ? "#3b82f6" : "#334155" }}>{count}q</span>
              </button>
            );
          })}
        </div>

        <button onClick={startQuiz} style={{ ...S.btnPrimary, marginBottom: "8px" }}>START QUIZ →</button>
        <div style={{ textAlign: "center", fontSize: "10px", color: "#334155" }}>30 questions · 90 sec each · XP + streak bonuses</div>
      </div>
    </div>
  );

  if (screen === "quiz") {
    const q = questions[current];
    return (
      <div style={S.app}>
        <div style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div style={{ fontSize: "12px", color: "#475569" }}>
              <span style={{ color: "#3b82f6", fontWeight: "700" }}>{current + 1}</span><span style={{ color: "#334155" }}>/{questions.length}</span>
            </div>
            <div style={{ fontSize: "12px" }}>
              {streak >= 2 && <span style={{ color: "#f59e0b", marginRight: "10px" }}>🔥 {streak}</span>}
              <span style={{ color: rank.color }}>{rank.icon} {xp.toLocaleString()}</span>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "3px", height: "3px", marginBottom: "14px" }}>
            <div style={{ height: "100%", width: `${(current / questions.length) * 100}%`, background: "#3b82f6", borderRadius: "3px", transition: "width 0.3s" }} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontSize: "10px", color: "#334155", letterSpacing: "1px" }}>TIME</span>
              <span style={{ fontSize: "13px", fontWeight: "700", color: timerColor }}>{timeLeft}s</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "4px", height: "5px" }}>
              <div style={{ height: "100%", width: `${(timeLeft / 90) * 100}%`, background: timerColor, borderRadius: "4px", transition: "width 1s linear" }} />
            </div>
          </div>

          <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#3b82f6", marginBottom: "6px" }}>DOMAIN {q.domain}</div>
          <div style={{ fontSize: "15px", lineHeight: "1.65", color: "#e2e8f0", marginBottom: "18px", fontFamily: "Georgia,serif" }}>{q.question}</div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
            {q.options.map((opt, idx) => {
              let bg = "rgba(255,255,255,0.03)", bc = "rgba(255,255,255,0.07)", color = "#94a3b8";
              if (answered) {
                if (idx === q.answer) { bg = "rgba(16,185,129,0.15)"; bc = "#10b981"; color = "#6ee7b7"; }
                else if (idx === selected) { bg = "rgba(239,68,68,0.15)"; bc = "#ef4444"; color = "#fca5a5"; }
              }
              return (
                <button key={idx} onClick={() => handleAnswer(idx)} disabled={answered} style={{
                  padding: "12px 14px", borderRadius: "8px", border: `1px solid ${bc}`,
                  background: bg, color, fontSize: "13px", textAlign: "left",
                  cursor: answered ? "default" : "pointer", lineHeight: "1.45",
                  WebkitTapHighlightColor: "transparent", transition: "border-color 0.15s",
                }}>
                  <span style={{ opacity: 0.4, marginRight: "8px" }}>{String.fromCharCode(65 + idx)}.</span>{opt}
                </button>
              );
            })}
          </div>

          {xpPop && <div style={{ textAlign: "center", fontSize: "20px", fontWeight: "800", color: "#10b981", marginBottom: "10px" }}>{xpPop}</div>}
          {answered && selected === -1 && <div style={{ textAlign: "center", color: "#ef4444", fontSize: "13px", marginBottom: "10px" }}>⏱ Time expired!</div>}

          {answered && (
            <div style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "8px", padding: "12px", marginBottom: "12px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#3b82f6", marginBottom: "6px" }}>EXPLANATION</div>
              <div style={{ fontSize: "13px", color: "#94a3b8", lineHeight: "1.6" }}>{q.explanation}</div>
            </div>
          )}

          {answered && <button onClick={handleNext} style={S.btnPrimary}>{current + 1 >= questions.length ? "VIEW RESULTS →" : "NEXT →"}</button>}
        </div>
      </div>
    );
  }

  if (screen === "results") {
    const pct = Math.round((score / questions.length) * 100);
    const passed = pct >= 75;
    const byDomain = {};
    results.forEach(r => {
      const d = r.question.domain;
      if (!byDomain[d]) byDomain[d] = { correct: 0, total: 0 };
      byDomain[d].total++;
      if (r.correct) byDomain[d].correct++;
    });

    return (
      <div style={S.app}>
        <div style={S.card}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div style={{ fontSize: "52px", fontWeight: "900", color: passed ? "#10b981" : "#ef4444", lineHeight: 1 }}>{pct}%</div>
            <div style={{ fontSize: "12px", letterSpacing: "3px", color: passed ? "#10b981" : "#ef4444", margin: "6px 0 4px" }}>{passed ? "✓ PASSING SCORE" : "✗ KEEP GRINDING"}</div>
            <div style={{ fontSize: "12px", color: "#475569" }}>{score} / {questions.length} correct</div>
          </div>

          <div style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "10px", padding: "14px", marginBottom: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "20px" }}>{rank.icon}</span>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "700", color: rank.color }}>{rank.name}</div>
                  <div style={{ fontSize: "11px", color: "#475569" }}>{xp.toLocaleString()} XP</div>
                </div>
              </div>
              {nextRank
                ? <div style={{ fontSize: "11px", color: "#475569", textAlign: "right" }}><div style={{ color: "#3b82f6" }}>{(nextRank.min - xp).toLocaleString()} XP</div><div>to {nextRank.name}</div></div>
                : <div style={{ fontSize: "12px", color: "#f59e0b" }}>MAX RANK 🏆</div>}
            </div>
          </div>

          <div style={{ marginBottom: "18px" }}>
            <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#475569", marginBottom: "10px" }}>DOMAIN BREAKDOWN</div>
            {Object.entries(byDomain).sort().map(([id, d]) => {
              const dpct = Math.round((d.correct / d.total) * 100);
              const dc = dpct >= 75 ? "#10b981" : dpct >= 50 ? "#f59e0b" : "#ef4444";
              return (
                <div key={id} style={{ marginBottom: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "3px" }}>
                    <span style={{ color: "#64748b" }}>Domain {id}</span>
                    <span style={{ color: dc, fontWeight: "700" }}>{d.correct}/{d.total} ({dpct}%)</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "3px", height: "4px" }}>
                    <div style={{ height: "100%", width: `${dpct}%`, background: dc, borderRadius: "3px" }} />
                  </div>
                </div>
              );
            })}
          </div>

          {results.filter(r => !r.correct).length > 0 && (
            <div style={{ marginBottom: "18px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#475569", marginBottom: "10px" }}>MISSED QUESTIONS</div>
              {results.filter(r => !r.correct).map((r, i) => (
                <div key={i} style={{ padding: "10px 12px", marginBottom: "6px", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.05)" }}>
                  <div style={{ fontSize: "12px", color: "#fca5a5", marginBottom: "4px", lineHeight: "1.4" }}>{r.question.question.substring(0, 80)}…</div>
                  <div style={{ fontSize: "11px", color: "#6ee7b7" }}>✓ {r.question.options[r.question.answer]}</div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setScreen("home")} style={{ ...S.btnSecondary, flex: 1 }}>← HOME</button>
            <button onClick={startQuiz} style={{ ...S.btnPrimary, flex: 2 }}>TRY AGAIN →</button>
          </div>
        </div>
      </div>
    );
  }
}
