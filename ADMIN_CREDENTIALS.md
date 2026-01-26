# 🔐 JMRH Admin Credentials - Quick Reference

## HARDCODED ADMIN ACCESS

These credentials are **permanently coded** in the source code and **CANNOT be changed** through the application interface.

---

## PRIMARY ADMIN ACCOUNT

```
Email:    admin@jmrh.org
Password: JMRHAdmin@2025!Secure
Role:     SUPER_ADMIN
```

**Login URL**: `http://yourdomain.com/admin/login`

---

## BACKUP ADMIN ACCOUNT

```
Email:    superadmin@jmrh.org
Password: SuperJMRH@Master2025
Role:     SUPER_ADMIN
```

---

## ADMIN POWERS

With these credentials, you have **FULL CONTROL** over the system:

✅ View all submitted papers
✅ Change paper status (approve, reject, publish)
✅ View all registered users
✅ Delete papers
✅ Download all files
✅ Access real-time statistics
✅ System administration

---

## HOW TO CHANGE CREDENTIALS

⚠️ **IMPORTANT**: To change these credentials (for production):

1. Open file: `src/utils/adminCredentials.ts`
2. Modify the constants:
   ```typescript
   export const ADMIN_CREDENTIALS = {
     EMAIL: 'your-new-admin@email.com',
     PASSWORD: 'YourNewSecurePassword',
     ROLE: 'SUPER_ADMIN'
   }
   ```
3. Save the file
4. Rebuild and redeploy the application
5. The new credentials will be active

---

## SECURITY NOTES

🔒 **These credentials are NOT stored in the database**
🔒 **They are checked BEFORE any database query**
🔒 **They cannot be changed through the UI**
🔒 **They are version-controlled in your source code**

**For Production**:
- Change these to strong, unique passwords
- Never share them publicly
- Keep this file secure
- Consider environment variables for maximum security

---

## TEST USER ACCOUNT (Optional)

For testing the user flow:

```
Email:    testuser@example.com
Password: TestUser123
```

**Note**: Register this account through the normal user registration flow.

---

## QUICK ACCESS

- **Admin Login**: `/admin/login`
- **Admin Dashboard**: `/admin/dashboard`
- **User Login**: `/user/login`
- **User Registration**: `/user/register`
- **Submit Paper**: `/submit-paper`
- **Home**: `/`

---

**Keep this file secure and never commit it to a public repository in production!**
