import type { Role } from "@/data/users";

// สิทธิ์ 1 ข้อ และโรลที่ได้สิทธิ์นี้
export type Permission = {
    id: string
    label: string
    roles: Role[]
}

// ค่าเริ่มต้นตาม Figma หน้า "สิทธิ์โรล"
export const defaultPermissions: Permission[] = [
    { id: "submit", label: "ส่งคำขอ", roles: ["requester", "approver", "head", "assignee"] },
    { id: "approve", label: "อนุมัติคำขอของคนในแผนก", roles: ["approver"] },
    { id: "decide", label: "รับงาน / ปฏิเสธ / ส่งต่อแผนก", roles: ["head"] },
    { id: "breakdown", label: "แตกงานและมอบหมาย", roles: ["head"] },
    { id: "progress", label: "อัปเดตความคืบหน้างาน", roles: ["head", "assignee"] },
    { id: "dashboard", label: "ดู Dashboard", roles: ["approver", "head", "executive", "admin"] },
    { id: "users", label: "จัดการผู้ใช้และโรล", roles: ["admin"] },
    { id: "categories", label: "จัดการหมวดคำขอ", roles: ["admin"] },
    { id: "teams", label: "จัดการทีม", roles: ["head", "admin"] },
]

// ช่องที่ห้ามติ๊กเด็ดขาด (requirement: ผู้ดูแลระบบอนุมัติคำขอไม่ได้)
export const isLocked = (permissionId: string, role: Role) =>
    permissionId === "approve" && role === "admin"
