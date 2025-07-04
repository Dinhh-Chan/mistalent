import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, Users, Briefcase, ArrowLeft } from "lucide-react"
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

interface JobDetailViewProps {
  job: JobListing
  onBack: () => void
  onApply: () => void
  onLogout?: () => void
  onGoHome?: () => void
}

export function JobDetailView({ job, onBack, onApply, onLogout, onGoHome }: JobDetailViewProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation 
        onLogout={onLogout || (() => {})}
        onGoHome={onGoHome}
        showBackButton={true}
        onBackToDashboard={onBack}
        title={`${job.title} - ${job.company}`}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2" 
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách việc làm
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
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
            </div>
            <Badge 
              className={
                job.urgency === "urgent" ? "bg-red-100 text-red-800" :
                job.urgency === "hot" ? "bg-orange-100 text-orange-800" :
                "bg-green-100 text-green-800"
              }
            >
              {job.urgency === "urgent" ? "🔥 Gấp" : 
               job.urgency === "hot" ? "⭐ Hot" : "✨ Mới"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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

          <hr className="border-gray-200 mb-6" />

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Mô tả công việc</h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Yêu cầu ứng viên</h2>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">Kỹ năng yêu cầu</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Quyền lợi</h2>
            <ul className="space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button 
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onApply}
          >
            Ứng tuyển ngay
          </Button>
        </div>
      </div>
    </div>
  )
} 