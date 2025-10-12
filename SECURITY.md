# 🔒 Security Policy

## Supported Versions

Below are the versions of this Chat Application currently supported with security updates:

| Version | Supported          |
| -------- | ------------------ |
| 2.x.x    | ✅ Active Support  |
| 1.x.x    | ⚠️ Limited Support |
| < 1.0    | ❌ Unsupported     |

We focus security patches and improvements on the latest major version.  
Older versions may not receive regular updates.

---

## Reporting a Vulnerability

If you discover a **security vulnerability** (e.g., data leak, unauthorized access, XSS, etc.), **please do not create a public GitHub issue**.

Instead, report it privately through one of the following channels:

📧 **rajendrabehera8116@gmail.com**  
🔗 or message the maintainer via [LinkedIn](https://www.linkedin.com/in/behera-rajendra/)

We will:
- Acknowledge your report within **48 hours**  
- Review and confirm the issue within **5–7 business days**  
- Release a patch or update as soon as possible

---

## Guidelines for Responsible Disclosure

To keep users’ data and privacy safe, please:

1. Avoid publicly disclosing the vulnerability until a fix has been released.  
2. Do not test exploits on live data or real user accounts.  
3. When reporting, include:
   - Steps to reproduce the issue  
   - Affected version or URL  
   - Potential security impact  
   - Any suggested fix or mitigation

---

## Security Measures in Place

This project follows several best practices to ensure user safety:
- 🔐 Authentication and authorization handled via **Firebase Auth**  
- 🔄 Real-time data protected through **Firebase Security Rules**  
- 🧩 Frontend built with **React + Tailwind CSS**, ensuring no direct data exposure  
- 🚫 No sensitive keys or credentials are stored client-side in production  

Thank you for helping make this chat application secure and reliable for everyone.
