# JMRH Secure Academic Platform (v2.0)

Welcome to the **Journal of Multidisciplinary Research Horizon (JMRH)**. This platform is designed with a "Security-First, Scholarly-Elite" architecture to ensure academic integrity and controlled access to research assets.

---

## 🔐 Administrative Access (Hidden)

Per PRD 2.0 requirements, the Administrative Portal is **hidden from the public eye**. There are no visible "Admin Login" buttons on the main website to prevent unauthorized reconnaissance.

### 1. Admin Login URL
Administrators must navigate directly to the secret gateway:
**URL:** `/#/system/control-panel/login`

### 2. Default Admin Credentials
*   **Admin ID:** `admin@jmrh.org`
*   **Secure Key:** `admin123`

### 3. Admin Capabilities
Once authenticated, the Admin Dashboard (`/#/system/control-panel/dashboard`) provides:
*   **Real-time Analytics:** Track visitor paths, IP addresses, and session durations.
*   **User Governance:** Verify, suspend, or delete researcher accounts.
*   **Download Logs:** Monitor which scholars are accessing which research assets.
*   **System Audit:** A non-editable trail of all platform activities.

---

## 🎓 Researcher/User Access

Regular users experience a friction-less "Trigger-Based" authentication model.

### 1. The Trigger Model
Users can browse the Home, About, Editorial Board, and Archive titles freely. The login system is only "triggered" when:
*   A user attempts to **download** a restricted PDF.
*   A user attempts to access their personal **Researcher Workspace**.

### 2. Mandatory Scholarly Profiling
During registration, JMRH collects deep academic metadata to maintain ISSN compliance:
*   **Personal Data:** Name, Age, City, Pincode.
*   **Academic Data:** PhD Status (Yes/No/Pursuing), Department, Institution Name.

### 3. Secure User URL
Each researcher is assigned a non-sequential, secure dashboard:
**Format:** `/#/user/{unique_id}`
*Example:* `/#/user/user-843`

---

## 🚀 Innovative Features in v2.0

### 🛡️ Zero-Trust Archive Access
Even logged-in users cannot download "Restricted" files until an **Admin manually verifies** their account status in the Control Panel.

### 📊 Scholarly Analytics
The platform simulates real-world tracking:
*   **Visitor Logging:** Every page hit is logged with a masked IP and timestamp.
*   **Download Fingerprinting:** Every file download is tied to a User ID and stored in the Admin Audit Trail.

### 🎨 "Light Elite" UX
The interface uses a high-contrast light theme with Navy & Gold accents, prioritizing readability and a premium academic "expensive" feel, moving away from common dark-mode trends to favor traditional scholarly aesthetics.

### 🤖 Gemini-Powered Assistant
A persistent AI assistant trained on JMRH guidelines is available at the bottom right to answer submission queries, fee structures, and ethical policy questions in real-time.

---

**Note:** *This platform is built for JMRH Publications. All activity within the Control Panel is monitored and logged.*