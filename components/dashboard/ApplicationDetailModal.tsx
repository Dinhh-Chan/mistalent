import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Application } from "@/types/dashboard"

interface ApplicationDetailModalProps {
  open: boolean
  onClose: () => void
  application: Application | null
}

export function ApplicationDetailModal({ open, onClose, application }: ApplicationDetailModalProps) {
  if (!application) return null

  // Dữ liệu mock chi tiết
  const mockDetail = {
    description: "Vị trí này yêu cầu kinh nghiệm ReactJS, TypeScript, làm việc nhóm tốt và có khả năng tự học hỏi công nghệ mới.",
    requirements: [
      "Thành thạo JavaScript/TypeScript",
      "Kinh nghiệm với React hoặc Next.js",
      "Biết sử dụng Git, Figma",
      "Có tư duy giải quyết vấn đề tốt"
    ],
    benefits: [
      "Lương cạnh tranh",
      "Làm việc hybrid, linh hoạt thời gian",
      "Thưởng dự án, thưởng hiệu suất",
      "Được đào tạo nâng cao kỹ năng"
    ],
    contact: "hr@congtyabc.com"
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Chi tiết vị trí: {application.position}</DialogTitle>
          <DialogDescription>
            Công ty: <b>{application.company}</b> <br />
            Địa điểm: {application.location} <br />
            Lương: {application.salary} <br />
            Ngày ứng tuyển: {application.appliedDate}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          <div>
            <b>Mô tả công việc:</b>
            <p className="text-gray-700 mt-1">{mockDetail.description}</p>
          </div>
          <div>
            <b>Yêu cầu:</b>
            <ul className="list-disc ml-5 text-gray-700">
              {mockDetail.requirements.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          <div>
            <b>Quyền lợi:</b>
            <ul className="list-disc ml-5 text-gray-700">
              {mockDetail.benefits.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
          <div>
            <b>Liên hệ:</b> <span className="text-blue-600">{mockDetail.contact}</span>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 