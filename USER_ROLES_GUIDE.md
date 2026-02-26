# 🏛️ JMRH System Access Guide

This guide explains how to access and test the three primary roles in the **Journal of Multidisciplinary Research Horizon (JMRH)** platform.

---

## 🎭 1. Super Admin (Central Control)
The Admin manages the entire editorial board, scholarly registry, and manuscript repository.

*   **Access URL:** `/secure/admin/login`
*   **Security Level:** High (Consolidated Editorial Control)
*   **Default Credentials:**
    *   **Email:** `admin@jmrh.org`
    *   **Password:** `admin123` (Note: System accepts any password for mock verification)
*   **Key Capabilities:**
    *   Initialize/Deactivate Professor accounts.
    *   Monitor all submitted manuscripts.
    *   Assign Lead Reviewers to new papers.
    *   Ban/Unban researchers for policy violations.

---

## 🎓 2. Professor / Reviewer (Editorial Board)
Professors handle the academic vetting and peer-review process for assigned manuscripts.

*   **Access URL:** `/secure/professor/login`
*   **Security Level:** Mid (Scholarly Vetting Desk)
*   **Default Credentials:**
    *   **Email:** `sarah.w@jmrh.org` (or `james.c@jmrh.org`)
    *   **Password:** `prof123`
*   **Key Capabilities:**
    *   Download and review assigned manuscripts.
    *   Submit official decisions (Accept, Revision, Reject).
    *   Add detailed feedback for authors.
    *   Access historical review archives.

---

## ✍️ 3. Researcher / Author (Public Scholar)
Researchers can submit their original inquiry and track the progress of their academic journey.

*   **Access URL:** `/login` (Publicly linked as "Researcher Access")
*   **Security Level:** Low (Public Academic Access)
*   **How to Access:**
    *   Go to the login page and click **"Request Scholarly Account"** to register.
    *   Or use a registered email if you've already created one.
*   **Key Capabilities:**
    *   Submit new manuscripts via the institutional form.
    *   Track real-time status of submissions.
    *   View reviewer comments and institutional feedback.
    *   Manage personal academic profile.

---

## 📄 Manuscript Lifecycle Overview

1.  **Submission:** User registers and submits a paper via `/submit-paper`.
2.  **Assignment:** Admin logs into `/secure/admin/dashboard` and assigns the paper to a Professor.
3.  **Review:** Professor logs into `/secure/professor/dashboard`, reviews the paper, and submits a decision.
4.  **Feedback:** User logs into `/account` and views the status and reviewer comments.
5.  **Governance:** Admin can ban/unban users or deactivate board members at any time.

---

### 🚨 Security Note
In this current build, the system uses **LocalStorage Persistence**. Any data created (new users, assigned papers) will remain on your machine during the session. If you wish to reset to mock defaults, clear your browser's local storage for this site.
