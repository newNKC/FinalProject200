import type { SidebarUser } from "@/components/sidebar";

// บัญชีทดลอง 1 คน
export type DemoAccount = {
    name: string
    dept: string
    role: SidebarUser["role"]   // ใช้ชนิดเดียวกับ sidebar: "requester" | ... | "admin"
    home: string                // หน้าแรกของโรลนี้หลังเข้าสู่ระบบ
}

// 6 โรลตามแถวใน Figma
export const demoAccounts: DemoAccount[] = [
    { name: "แอน", dept: "ฝ่ายขาย", role: "requester", home: "/requests" },
    { name: "สมศักดิ์", dept: "ฝ่ายขาย", role: "approver", home: "/approvals" },
    { name: "วิชัย", dept: "แผนก IT", role: "head", home: "/incoming" },
    { name: "ต้น", dept: "แผนก IT", role: "assignee", home: "/tasks" },
    { name: "ประภาพร", dept: "ฝ่ายบริหาร", role: "executive", home: "/dashboard" },
    // fix when fusion: เปลี่ยน home ของนิดเป็น "/dashboard" (หน้าแรกของผู้ดูแลระบบตาม Figma) เมื่อหน้า Dashboard ของพิชญ์รวมเข้ามาแล้ว
    { name: "นิด", dept: "แผนก IT", role: "admin", home: "/admin/users" },
]