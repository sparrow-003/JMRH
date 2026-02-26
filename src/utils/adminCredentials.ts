// HARDCODED ADMIN CREDENTIALS - DO NOT CHANGE
// These credentials are permanent and cannot be modified through the application
export const ADMIN_CREDENTIALS = {
    EMAIL: 'admin@jmrh.org',
    PASSWORD: 'JMRHAdmin@2025!Secure',
    ROLE: 'SUPER_ADMIN'
} as const

// Backup admin credentials (in case primary is forgotten)
export const BACKUP_ADMIN = {
    EMAIL: 'superadmin@jmrh.org',
    PASSWORD: 'SuperJMRH@Master2025',
    ROLE: 'SUPER_ADMIN'
} as const

// Validate admin credentials (hardcoded check)
export function validateAdminCredentials(email: string, password: string): boolean {
    return (
        (email === ADMIN_CREDENTIALS.EMAIL && password === ADMIN_CREDENTIALS.PASSWORD) ||
        (email === BACKUP_ADMIN.EMAIL && password === BACKUP_ADMIN.PASSWORD)
    )
}

// Get admin role
export function getAdminRole(email: string): string {
    if (email === ADMIN_CREDENTIALS.EMAIL || email === BACKUP_ADMIN.EMAIL) {
        return 'SUPER_ADMIN'
    }
    return 'NONE'
}
// Updated for git commit
