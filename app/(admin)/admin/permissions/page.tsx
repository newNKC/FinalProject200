'use client'

import { useState } from "react";
import { Check, CheckCircle1, Locked3, Reload } from "@tailgrids/icons";
import { Button } from "@/components/tailgrids/core/button";
import { Checkbox } from "@/components/tailgrids/core/checkbox";
import { TableBody, TableCell, TableHead, TableHeader, TableRoot, TableRow } from "@/components/tailgrids/core/table";
import RoleBadge from "@/components/role-badge";
import { defaultPermissions, isLocked, type Permission } from "@/data/permissions";
import { allRoles, type Role } from "@/data/users";

export default function Page() {
    // states
    // fix when fusion: สิทธิ์อยู่ในหน้านี้หน้าเดียว รีเฟรชแล้วหาย และเมนู/หน้าอื่นยังไม่ได้อ่านค่านี้ → ย้ายไปเก็บในข้อมูลกลาง (localStorage) แล้วให้ sidebar ซ่อนเมนูตามสิทธิ์
    const [permissions, setPermissions] = useState<Permission[]>(defaultPermissions);   // ค่าที่กำลังแก้อยู่บนจอ
    const [saved, setSaved] = useState<Permission[]>(defaultPermissions);               // ค่าที่บันทึกล่าสุด
    const [justSaved, setJustSaved] = useState(false);                                   // โชว์ข้อความ "บันทึกแล้ว"

    // มีอะไรเปลี่ยนจากที่บันทึกไว้ไหม (เทียบเป็นข้อความ JSON)
    const changed = JSON.stringify(permissions) !== JSON.stringify(saved);

    // ติ๊ก / เอาติ๊กออก 1 ช่อง
    const toggle = (permissionId: string, role: Role, checked: boolean) => {
        setJustSaved(false);
        setPermissions((current) => current.map((p) =>
            p.id !== permissionId ? p : {
                ...p,
                roles: checked ? allRoles.filter((r) => p.roles.includes(r) || r === role)
                               : p.roles.filter((r) => r !== role),
            }
        ));
    }

    // ปุ่มบันทึก
    const save = () => {
        setSaved(permissions);
        setJustSaved(true);
    }

    // ปุ่มคืนค่าเริ่มต้น
    const reset = () => {
        setPermissions(defaultPermissions);
        setJustSaved(false);
    }

    return (
        <>
            {/* page header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-ink">ตั้งค่าสิทธิ์ของโรล</h1>
                {/* fix when fusion: ชื่อผู้ใช้เขียนตายตัว → ใช้ผู้ใช้ที่ล็อกอินจริง */}
                <p className="text-xs text-ink-2">นิด · ผู้ดูแลระบบ</p>
            </div>

            {/* warning banner */}
            {/* fix when fusion: สีเหลืองยังเป็น hex → เปลี่ยนเป็น token สีสถานะเมื่อตกลงชื่อกันแล้ว */}
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#FEF3C7] px-4 py-3 text-sm font-medium text-[#B45309]">
                <Locked3 className="size-5 shrink-0" />
                ฟีเจอร์เสริม (optional) · ผู้ดูแลระบบไม่มีสิทธิ์อนุมัติคำขอ (ล็อกตาม requirement)
            </div>

            {/* permission matrix */}
            <TableRoot className="w-full bg-white text-sm">
                <TableHeader>
                    <TableRow className="bg-page">
                        <TableHead>สิทธิ์</TableHead>
                        {allRoles.map((r) => (
                            <TableHead key={r} className="text-center">
                                <RoleBadge role={r} />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {permissions.map((p) => (
                        <TableRow key={p.id}>
                            <TableCell className="font-medium text-ink">{p.label}</TableCell>
                            {allRoles.map((r) => (
                                <TableCell key={r} className="text-center">
                                    {isLocked(p.id, r) ? (
                                        // ช่องที่ล็อก: โชว์แม่กุญแจแทน checkbox
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
                                            <Locked3 className="size-3.5" />ห้าม
                                        </span>
                                    ) : (
                                        <Checkbox
                                            id={`perm-${p.id}-${r}`}
                                            aria-label={`${p.label} · ${r}`}
                                            checked={p.roles.includes(r)}
                                            onChange={(e) => toggle(p.id, r, e.target.checked)}
                                        />
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </TableRoot>

            {/* footer: status + buttons */}
            <div className="mt-4 flex items-center justify-end gap-3">
                {changed && <span className="text-sm text-ink-2">มีการเปลี่ยนแปลงที่ยังไม่บันทึก</span>}
                {justSaved && (
                    <span className="flex items-center gap-1.5 text-sm font-medium text-[#15803D]">
                        <CheckCircle1 className="size-4" />บันทึกแล้ว
                    </span>
                )}
                <Button size="sm" appearance="outline" onPress={reset}><Reload />คืนค่าเริ่มต้น</Button>
                <Button size="sm" disabled={!changed} onPress={save}><Check />บันทึก</Button>
            </div>
        </>
    )
}
