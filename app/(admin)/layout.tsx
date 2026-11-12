import Sidebar, { type MenuItem } from "@/components/sidebar";
import { Bookmark1, DashboardSquare1, Shield1Check, UserMultiple1, UserMultiple4 } from "@tailgrids/icons";

// เมนูของผู้ดูแลระบบ (หน้าของคนอื่นจะขึ้น 404 จนกว่าจะรวมงาน)
const menu: MenuItem[] = [
    /* { href: "/dashboard", label: "Dashboard", icon: <DashboardSquare1 /> }, */
    { href: "/admin/users", label: "จัดการผู้ใช้", icon: <UserMultiple1 /> },
    /* { href: "/admin/categories", label: "หมวดคำขอ", icon: <Bookmark1 /> }, */
    { href: "/admin/permissions", label: "สิทธิ์โรล", icon: <Shield1Check /> },
    /* { href: "/teams", label: "ทีม", icon: <UserMultiple4 /> }, */
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-page">
            <Sidebar menu={menu} user={{ name: "นิด", position: "ผู้ดูแลระบบ", role: "admin" }} />
            <main className="min-w-0 flex-1 px-8 pt-6 pb-12">{children}</main>
        </div>
    )
}