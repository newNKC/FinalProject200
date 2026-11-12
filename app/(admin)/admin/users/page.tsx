'use client'

import { useState } from "react";
import { Locked3, Pencil1, Reload, Search1 } from "@tailgrids/icons";
import { Button, buttonStyles } from "@/components/tailgrids/core/button";
import { Checkbox } from "@/components/tailgrids/core/checkbox";
import { Dialog, DialogBody, DialogClose, DialogFooter, DialogHeader, DialogTitle } from "@/components/tailgrids/core/dialog";
import { Input } from "@/components/tailgrids/core/input";
import { Backdrop } from "@/components/tailgrids/core/overlay";
import { TableBody, TableCell, TableHead, TableHeader, TableRoot, TableRow } from "@/components/tailgrids/core/table";
import RoleBadge from "@/components/role-badge";
import { allRoles, users as initialUsers, type Role, type User } from "@/data/users";
import { cn } from "@/utils/cn";

const depts = ["ทุกแผนก", "แผนก IT", "ฝ่ายขาย", "ฝ่ายบริหาร"]

export default function Page() {
    // states
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [search, setSearch] = useState("");
    const [dept, setDept] = useState("ทุกแผนก");
    const [editing, setEditing] = useState<User | null>(null);   // คนที่กำลังแก้โรล (null = ปิด dialog)
    const [draftRoles, setDraftRoles] = useState<Role[]>([]);    // โรลที่ติ๊กอยู่ใน dialog

    // กรองตามแผนก + คำค้นหา
    const shown = users.filter((u) =>
        (dept === "ทุกแผนก" || u.dept === dept) &&
        (u.name.includes(search) || u.email.includes(search.toLowerCase()))
    );

    // เปิด dialog
    const openEdit = (user: User) => {
        setEditing(user);
        setDraftRoles(user.roles);
    }

    // ติ๊ก / เอาติ๊กออก 1 โรล
    const toggleRole = (role: Role, checked: boolean) => {
        setDraftRoles((current) => checked ? [...current, role] : current.filter((r) => r !== role));
    }

    // บันทึก: แทนโรลของคนนั้นด้วยโรลที่ติ๊ก
    const saveRoles = () => {
        if (!editing) return;
        setUsers((current) => current.map((u) =>
            u.id === editing.id ? { ...u, roles: allRoles.filter((r) => draftRoles.includes(r)) } : u
        ));
    }

    return (
        <>
            {/* page header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-ink">จัดการผู้ใช้</h1>
                <p className="text-xs text-ink-2">นิด · ผู้ดูแลระบบ</p>
            </div>

            {/* toolbar */}
            <div className="mb-4 flex items-center gap-3">
                <div className="relative w-80">
                    <Search1 className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-3" />
                    <Input className="w-full py-2 pl-9 text-sm" placeholder="ค้นหาชื่อหรืออีเมล" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                {depts.map((d) => (
                    <button key={d} onClick={() => setDept(d)}
                        className={cn(
                            "rounded-full border px-3.5 py-1.5 text-xs",
                            dept === d ? "border-brand bg-brand-soft font-semibold text-brand-strong" : "border-line bg-white text-ink-2 hover:bg-page"
                        )}>
                        {d}
                    </button>
                ))}
                <div className="flex-1" />
                <Button size="sm" appearance="outline"><Reload />ซิงก์ข้อมูล HR</Button>
            </div>

            {/* warning banner */}
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#FEF3C7] px-4 py-3 text-sm font-medium text-[#B45309]">
                <Locked3 className="size-5 shrink-0" />
                ชื่อ แผนก และตำแหน่งดึงจากฐานข้อมูล HR (จำลอง) แก้ในระบบนี้ไม่ได้ · ผู้ดูแลระบบแก้ได้เฉพาะโรลในระบบ
            </div>

            {/* table */}
            <TableRoot className="w-full bg-white text-sm">
                <TableHeader>
                    <TableRow className="bg-page">
                        <TableHead>ผู้ใช้</TableHead>
                        <TableHead>แผนก (HR)</TableHead>
                        <TableHead>ตำแหน่ง (HR)</TableHead>
                        <TableHead>โรลในระบบ</TableHead>
                        <TableHead />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* no result */}
                    {shown.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="py-10 text-center text-ink-3">ไม่พบผู้ใช้ที่ตรงกับเงื่อนไข</TableCell>
                        </TableRow>
                    )}

                    {/* rows */}
                    {shown.map((u) => (
                        <TableRow key={u.id}>
                            <TableCell>
                                <div className="flex items-center gap-2.5">
                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand-strong">{u.name.slice(0, 1)}</span>
                                    <div>
                                        <p className="font-medium text-ink">{u.name}</p>
                                        <p className="text-xs font-normal text-ink-3">{u.email}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="font-normal text-ink-2">{u.dept}</TableCell>
                            <TableCell className="font-normal text-ink-2">
                                <span className="flex items-center gap-1.5"><Locked3 className="size-3.5 text-ink-3" />{u.position}</span>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {u.roles.map((r) => <RoleBadge key={r} role={r} />)}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <button className={cn(buttonStyles({ variant: "ghost", size: "xs" }), "text-brand hover:bg-brand-soft hover:text-brand-strong [&>svg]:size-4")}
                                    onClick={() => openEdit(u)}>
                                    <Pencil1 />แก้โรล
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableRoot>

            {/* edit roles dialog */}
            <Backdrop isOpen={editing !== null} onOpenChange={(open) => !open && setEditing(null)}>
                <Dialog>
                    <DialogHeader>
                        <DialogTitle>แก้ไขโรล: {editing?.name}</DialogTitle>
                    </DialogHeader>
                    <DialogBody className="flex flex-col gap-4">
                        {/* HR info (read only) */}
                        <div className="flex gap-6 rounded-lg bg-page p-3 text-sm">
                            <div><p className="text-xs text-ink-3">แผนก (HR)</p><p className="font-medium text-ink">{editing?.dept}</p></div>
                            <div><p className="text-xs text-ink-3">ตำแหน่ง (HR)</p><p className="font-medium text-ink">{editing?.position}</p></div>
                        </div>

                        {/* role checkboxes */}
                        <div className="flex flex-col gap-2.5">
                            {allRoles.map((r) => (
                                <div key={r} className="flex items-center gap-2.5">
                                    <Checkbox id={`role-${r}`} checked={draftRoles.includes(r)} onChange={(e) => toggleRole(r, e.target.checked)} />
                                    <label htmlFor={`role-${r}`} className="cursor-pointer"><RoleBadge role={r} /></label>
                                </div>
                            ))}
                        </div>

                        {draftRoles.length === 0 && <p className="text-sm text-red-600">ต้องมีอย่างน้อย 1 โรล</p>}
                    </DialogBody>
                    <DialogFooter>
                        <DialogClose appearance="outline">ยกเลิก</DialogClose>
                        <DialogClose disabled={draftRoles.length === 0} onClick={saveRoles}>บันทึก</DialogClose>
                    </DialogFooter>
                </Dialog>
            </Backdrop>
        </>
    )
}