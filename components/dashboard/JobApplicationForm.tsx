import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload } from "lucide-react"
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

interface JobApplicationFormProps {
  job: JobListing
  onBack: () => void
  onSubmit: () => void
  onLogout?: () => void
  onGoHome?: () => void
}

export function JobApplicationForm({ job, onBack, onSubmit, onLogout, onGoHome }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
    cvFile: null as File | null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData(prev => ({ ...prev, cvFile: file }))
    
    // Clear error when user selects a file
    if (errors.cvFile) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.cvFile
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ tên là bắt buộc"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại là bắt buộc"
    }
    
    if (!formData.cvFile) {
      newErrors.cvFile = "Vui lòng tải lên CV của bạn"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    onSubmit()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation 
        onLogout={onLogout || (() => {})}
        onGoHome={onGoHome}
        showBackButton={true}
        onBackToDashboard={onBack}
        title={`Ứng tuyển - ${job.title}`}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2" 
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại thông tin công việc
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ứng tuyển vị trí: {job.title}</h1>
          <p className="text-gray-600 mb-6">{job.company} - {job.location}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Họ và tên <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">
                  Số điện thoại <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="0123456789"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="experience" className="text-sm font-medium">
                  Số năm kinh nghiệm
                </Label>
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
              <Label htmlFor="cvFile" className="text-sm font-medium">
                Upload CV (PDF, DOC, DOCX) <span className="text-red-500">*</span>
              </Label>
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
                  className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-gray-400 transition-colors ${
                    errors.cvFile ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {formData.cvFile ? formData.cvFile.name : "Nhấn để chọn file CV"}
                    </p>
                    <p className="text-xs text-gray-400">PDF, DOC, DOCX (tối đa 10MB)</p>
                  </div>
                </label>
                {errors.cvFile && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvFile}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="coverLetter" className="text-sm font-medium">
                Thư xin việc
              </Label>
              <Textarea
                id="coverLetter"
                value={formData.coverLetter}
                onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                placeholder="Viết vài dòng giới thiệu về bản thân và lý do bạn muốn ứng tuyển vào vị trí này..."
                rows={4}
              />
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={isSubmitting}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang gửi..." : "Gửi đơn ứng tuyển"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 