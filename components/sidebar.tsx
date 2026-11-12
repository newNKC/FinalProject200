'use client'

// fix when fusion: ไฟล์กลาง ทุกคนต้องใช้ไฟล์นี้ตัวเดียวกันทุกตัวอักษร ตอนรวมเช็กว่าไม่มีใครแก้ต่างไปจากนี้

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Exit } from "@tailgrids/icons";
import { buttonStyles } from "@/components/tailgrids/core/button";
import { Badge } from "@/components/tailgrids/core/badge";
import RoleBadge from "@/components/role-badge";
import { cn } from "@/utils/cn";

// ชนิดข้อมูลของเมนู 1 อัน
export type MenuItem = {
    href: string
    label: string
    icon: ReactNode
    count?: number
}

// ชนิดข้อมูลของผู้ใช้ที่แสดงด้านล่าง
export type SidebarUser = {
    name: string
    position: string
    role: "requester" | "approver" | "head" | "assignee" | "executive" | "admin"
}

// คลาสที่เมนูทุกอันใช้ร่วมกัน (รวมวงแสงที่โผล่เฉพาะตอนกด Tab)
const itemBase = "w-full justify-start gap-3 px-3 [&>svg]:size-[18px] focus:ring-0 focus-visible:ring-2 focus-visible:ring-brand/60"

export default function Sidebar({ menu, user }: { menu: MenuItem[], user: SidebarUser }) {
    const pathname = usePathname();

    return (
        // sidebar container
        <aside className="sticky top-0 flex h-screen w-62 shrink-0 flex-col gap-1 bg-sidebar px-4 py-6">
            {/* logo */}
            <div className="mb-5 flex items-center gap-2.5 px-2">
                <span className="flex size-9 items-center justify-center rounded-lg bg-brand text-xs font-semibold text-white">RQ</span>
                <div className="leading-tight">
                    <p className="text-sm font-semibold text-white">ระบบจัดการคำขอ</p>
                    <p className="text-xs text-sidebar-ink">Software Request</p>
                </div>
            </div>

            <p className="px-2 pb-1 text-xs font-semibold text-sidebar-ink">เมนู</p>

            {/* menu */}
            <nav className="flex flex-col gap-1">
                {menu.map((item) => {
                    const active = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                        <Link key={item.href} href={item.href}
                            className={cn(
                                buttonStyles({ variant: active ? "primary" : "ghost", appearance: "fill", size: "sm" }),
                                itemBase,
                                active ? "bg-sidebar-active text-white hover:bg-sidebar-active" : "text-sidebar-ink hover:bg-sidebar-active/60 hover:text-white",
                            )}
                        >
                            {item.icon}
                            <span className="flex-1">{item.label}</span>
                            {/* fix when fusion: ยังไม่มีใครส่ง count มา → ใส่จำนวนงานที่รออยู่ (รออนุมัติ, คำขอเข้าแผนก, งานของฉัน) เมื่อมีข้อมูลกลาง */}
                            {item.count ? <Badge size="sm" className="bg-brand text-white">{item.count}</Badge> : null}
                        </Link>
                    );
                })}
            </nav>

            {/* push bottom part down */}
            <div className="flex-1" />

            {/* logout */}
            {/* fix when fusion: ตอนกดออกจากระบบ ต้องล้างผู้ใช้ที่ล็อกอิน (Context / localStorage) ก่อนกลับไป /login */}
            <Link href="/login"
                className={cn(buttonStyles({ variant: "ghost", size: "sm" }), itemBase, "text-sidebar-ink hover:bg-sidebar-active/60 hover:text-white")}
            >
                <Exit />
                ออกจากระบบ
            </Link>

            {/* user box */}
            <div className="mt-1 flex items-center gap-2.5 rounded-xl bg-sidebar-active p-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand-strong">{user.name.slice(0, 1)}</span>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{user.name} · {user.position}</p>
                    <RoleBadge role={user.role} className="mt-1" />
                </div>
            </div>
        </aside>
    )
}
