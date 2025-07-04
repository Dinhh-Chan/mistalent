import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, CheckCircle } from "lucide-react"
import { DashboardNavigation } from "./DashboardNavigation"

interface JobListing {
  id: number
  title: string
  company: string
  location: string
  salary: string
  type: string
  experience: string
  posted: string
  description: string
  requirements: string[]
  benefits: string[]
  skills: string[]
  applications: number
  urgency: string
}

export interface CVSubmissionData {
  job: JobListing | null
  applicant: {
    fullName: string
    email: string
    phone: string
    experience: string
    coverLetter: string
    cvFile: File | null
  }
}

interface CVSubmissionModalProps {
  open: boolean
  onClose: () => void
  job: JobListing | null
  onSubmit: (data: CVSubmissionData) => void
  onLogout?: () => void
  onGoHome?: () => void
}

export function CVSubmissionModal({ open, onClose, job, onSubmit, onLogout, onGoHome }: CVSubmissionModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
    cvFile: null as File | null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, cvFile: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc")
      return
    }

    setIsSubmitting(true)
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitted(true)
    onSubmit({
      job,
      applicant: formData
    })
    
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(false)
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        experience: "",
        coverLetter: "",
        cvFile: null
      })
      onClose()
    }, 2000)
  }

  if (!job) return null

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNavigation 
          onLogout={onLogout || (() => {})}
          onGoHome={onGoHome}
          showBackButton={true}
          onBackToDashboard={onClose}
          title={job ? `Ứng tuyển - ${job.title}` : "Ứng tuyển"}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md text-center">
              <div className="py-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-600 mb-2">Ứng tuyển thành công!</h2>
                <p className="text-gray-600">
                  CV của bạn đã được gửi cho vị trí <strong>{job.title}</strong> tại <strong>{job.company}</strong>.
                  Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation 
        onLogout={onLogout || (() => {})}
        onGoHome={onGoHome}
        showBackButton={true}
        onBackToDashboard={onClose}
        title={job ? `Ứng tuyển - ${job.title}` : "Ứng tuyển"}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ứng tuyển vị trí: {job.title}</DialogTitle>
              <p className="text-gray-600">{job.company} - {job.location}</p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Họ và tên *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Nguyễn Văn A"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="0123456789"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Số năm kinh nghiệm</Label>
                  <Input
                    id="experience"
                    type="text"
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    placeholder="Ví dụ: 3 năm"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cvFile">Upload CV (PDF, DOC, DOCX)</Label>
                <div className="mt-1">
                  <input
                    id="cvFile"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="cvFile"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {formData.cvFile ? formData.cvFile.name : "Nhấn để chọn file CV"}
                      </p>
                      <p className="text-xs text-gray-400">PDF, DOC, DOCX (tối đa 10MB)</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="coverLetter">Thư xin việc</Label>
                <Textarea
                  id="coverLetter"
                  value={formData.coverLetter}
                  onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                  placeholder="Viết vài dòng giới thiệu về bản thân và lý do bạn muốn ứng tuyển vào vị trí này..."
                  rows={4}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                  Hủy
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-600">
                  {isSubmitting ? "Đang gửi..." : "Gửi đơn ứng tuyển"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 