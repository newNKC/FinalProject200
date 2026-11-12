import Sidebar, { type MenuItem } from "@/components/sidebar";
import { Bookmark1, DashboardSquare1, Shield1Check, UserMultiple1, UserMultiple4 } from "@tailgrids/icons";

// เมนูของผู้ดูแลระบบ (หน้าของคนอื่นจะขึ้น 404 จนกว่าจะรวมงาน)
// fix when fusion: /dashboard, /admin/categories, /teams เป็นหน้าของพิชญ์ เช็กว่ากดแล้วเปิดได้จริงหลังรวม
const menu: MenuItem[] = [
    { href: "/dashboard", label: "Dashboard", icon: <DashboardSquare1 /> },
    { href: "/admin/users", label: "จัดการผู้ใช้", icon: <UserMultiple1 /> },
    { href: "/admin/categories", label: "หมวดคำขอ", icon: <Bookmark1 /> },
    { href: "/admin/permissions", label: "สิทธิ์โรล", icon: <Shield1Check /> },
    { href: "/teams", label: "ทีม", icon: <UserMultiple4 /> },
];

// fix when fusion: ตอนนี้แต่ละคนมี layout ของตัวเอง ((admin), (requester), (heads), (work)) → รวมเป็น layout เดียวที่เลือกเมนูตามโรลของผู้ใช้ที่ล็อกอิน
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-page">
            {/* fix when fusion: user ตอนนี้ fix เป็น "นิด" → เปลี่ยนเป็นผู้ใช้ที่ล็อกอินจริง (จาก Context) */}
            <Sidebar menu={menu} user={{ name: "นิด", position: "ผู้ดูแลระบบ", role: "admin" }} />
            <main className="min-w-0 flex-1 px-8 pt-6 pb-12">{children}</main>
        </div>
    )
}