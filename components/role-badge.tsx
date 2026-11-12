// fix when fusion: ไฟล์กลาง ทุกคนต้องใช้ไฟล์นี้ตัวเดียวกันทุกตัวอักษร ตอนรวมเช็กว่าไม่มีใครแก้ต่างไปจากนี้
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

// ① แบบ: คลาสพื้นฐาน + variant แต่ละแบบ (เหมือนตั้ง component set ใน Figma)
const roleBadgeStyles = cva(
    "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold whitespace-nowrap",
    {
        variants: {
            role: {
                requester: "bg-role-requester-soft text-role-requester",
                approver: "bg-role-approver-soft text-role-approver",
                head: "bg-role-head-soft text-role-head",
                assignee: "bg-role-assignee-soft text-role-assignee",
                executive: "bg-role-executive-soft text-role-executive",
                admin: "bg-role-admin-soft text-role-admin",
            },
        },
        defaultVariants: { role: "requester" },
    }
);

// ② ข้อความภาษาไทยของแต่ละโรล
const ROLE_LABEL = {
    requester: "ผู้ขอ",
    approver: "หัวหน้าต้นสังกัด",
    head: "หัวหน้าแผนกปลายทาง",
    assignee: "ผู้รับงาน",
    executive: "ผู้บริหาร",
    admin: "ผู้ดูแลระบบ",
};

// ③ ตัว component: รับ role แล้วเลือก variant ให้เอง
type Props = VariantProps<typeof roleBadgeStyles> & { className?: string };

export default function RoleBadge({ role = "requester", className }: Props) {
    return (
        <span className={cn(roleBadgeStyles({ role }), className)}>
            <span className="size-1.5 rounded-full bg-current" />
            {ROLE_LABEL[role!]}
        </span>
    )
}
