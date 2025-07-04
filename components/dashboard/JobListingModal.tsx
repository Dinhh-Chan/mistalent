import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, Users, Briefcase } from "lucide-react"
import { CVSubmissionModal, CVSubmissionData } from "./CVSubmissionModal"

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

interface JobListingModalProps {
  open: boolean
  onClose: () => void
  job: JobListing | null
}

export function JobListingModal({ open, onClose, job }: JobListingModalProps) {
  const [showCVModal, setShowCVModal] = useState(false)

  const handleCVSubmission = (data: CVSubmissionData) => {
    console.log("CV submitted:", data)
    // Here you would typically send the data to your backend
    setShowCVModal(false)
  }

  if (!job) return null

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{job.title}</DialogTitle>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="font-semibold">{job.company}</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {job.posted}
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Job Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Mức lương</p>
                  <p className="font-semibold">{job.salary}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Loại hình</p>
                  <p className="font-semibold">{job.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-600">Kinh nghiệm</p>
                  <p className="font-semibold">{job.experience}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Ứng viên</p>
                  <p className="font-semibold">{job.applications} người</p>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Job Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Mô tả công việc</h3>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Yêu cầu ứng viên</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Kỹ năng yêu cầu</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quyền lợi</h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Đóng
            </Button>
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => setShowCVModal(true)}
            >
              Ứng tuyển ngay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CVSubmissionModal
        open={showCVModal}
        onClose={() => setShowCVModal(false)}
        job={job}
        onSubmit={handleCVSubmission}
      />
    </>
  )
} 