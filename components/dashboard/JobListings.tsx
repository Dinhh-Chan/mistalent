import { useState } from "react"
import { MapPin, DollarSign, Calendar, Users, Eye, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface JobListing {
  id: number
  title: string
  company: string
  location: string
  salary: string
  type: "Full-time" | "Part-time" | "Remote" | "Hybrid"
  experience: string
  posted: string
  description: string
  requirements: string[]
  benefits: string[]
  skills: string[]
  applications: number
  urgency: "low" | "medium" | "high"
}

const mockJobListings: JobListing[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Vietnam",
    location: "Ho Chi Minh City",
    salary: "$2000 - $3000",
    type: "Full-time",
    experience: "3+ years",
    posted: "2 ngày trước",
    description: "Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm với React, TypeScript để phát triển các ứng dụng web hiện đại.",
    requirements: [
      "3+ năm kinh nghiệm với React/Next.js",
      "Thành thạo TypeScript, JavaScript ES6+",
      "Kinh nghiệm với state management (Redux, Zustand)",
      "Biết sử dụng Git, CI/CD"
    ],
    benefits: [
      "Lương cạnh tranh + thưởng hiệu suất",
      "Bảo hiểm sức khỏe đầy đủ",
      "Làm việc hybrid 3 ngày/tuần",
      "Môi trường startup năng động"
    ],
    skills: ["React", "TypeScript", "Next.js", "TailwindCSS"],
    applications: 45,
    urgency: "high"
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "StartupXYZ",
    location: "Ha Noi",
    salary: "$1500 - $2500",
    type: "Full-time",
    experience: "2+ years",
    posted: "1 tuần trước",
    description: "Tham gia phát triển API và microservices cho hệ thống e-commerce lớn.",
    requirements: [
      "2+ năm kinh nghiệm Node.js hoặc Python",
      "Kinh nghiệm với database (PostgreSQL, MongoDB)",
      "Hiểu biết về Docker, Kubernetes",
      "Kỹ năng giải quyết vấn đề tốt"
    ],
    benefits: [
      "Lương thỏa thuận",
      "Thưởng dự án",
      "Remote 100%",
      "Đào tạo công nghệ mới"
    ],
    skills: ["Node.js", "PostgreSQL", "Docker", "AWS"],
    applications: 23,
    urgency: "medium"
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Digital Agency ABC",
    location: "Remote",
    salary: "$1800 - $2800",
    type: "Remote",
    experience: "2-5 years",
    posted: "3 ngày trước",
    description: "Phát triển ứng dụng web full-stack cho khách hàng quốc tế.",
    requirements: [
      "Kinh nghiệm React + Node.js",
      "Database design và optimization",
      "RESTful API development",
      "Agile/Scrum workflow"
    ],
    benefits: [
      "100% remote work",
      "Flexible working hours",
      "International clients",
      "Professional development budget"
    ],
    skills: ["React", "Node.js", "MongoDB", "Express"],
    applications: 31,
    urgency: "low"
  }
]

interface JobListingsProps {
  onApplyJob: (job: JobListing) => void
}

export function JobListings({ onApplyJob }: JobListingsProps) {
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)

  const handleViewDetail = (job: JobListing) => {
    setSelectedJob(job)
    setDetailModalOpen(true)
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-red-100 text-red-700"
      case "medium": return "bg-yellow-100 text-yellow-700"
      case "low": return "bg-green-100 text-green-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full-time": return "bg-blue-100 text-blue-700"
      case "Part-time": return "bg-purple-100 text-purple-700"
      case "Remote": return "bg-green-100 text-green-700"
      case "Hybrid": return "bg-orange-100 text-orange-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Các vị trí tuyển dụng hiện tại</h2>
        <p className="text-gray-600">Khám phá các cơ hội việc làm phù hợp với bạn</p>
      </div>

      <div className="grid gap-6">
        {mockJobListings.map(job => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl text-gray-900 mb-2">{job.title}</CardTitle>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.company} - {job.location}
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {job.salary}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {job.posted}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {job.applications} ứng viên
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getUrgencyColor(job.urgency)}>
                    {job.urgency === "high" ? "Urgent" : job.urgency === "medium" ? "Normal" : "Low Priority"}
                  </Badge>
                  <Badge className={getTypeColor(job.type)}>{job.type}</Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="mb-4">
                <p className="text-gray-700 mb-3">{job.description}</p>
                
                <div className="mb-3">
                  <h4 className="font-medium text-gray-900 mb-2">Kỹ năng yêu cầu:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <strong>Kinh nghiệm:</strong> {job.experience}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => handleViewDetail(job)}
                  className="flex items-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Xem chi tiết
                </Button>
                
                <Button
                  onClick={() => onApplyJob(job)}
                  className="bg-blue-500 hover:bg-blue-600 text-white flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Ứng tuyển ngay
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Job Detail Modal */}
      {selectedJob && detailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/40" onClick={() => setDetailModalOpen(false)} />
          <div className="relative z-10 bg-white rounded-lg shadow-xl p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
              <p className="text-gray-600 mb-4">{selectedJob.company} - {selectedJob.location}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Mô tả công việc:</h3>
                <p className="text-gray-700">{selectedJob.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Yêu cầu:</h3>
                <ul className="list-disc ml-5 text-gray-700">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Quyền lợi:</h3>
                <ul className="list-disc ml-5 text-gray-700">
                  {selectedJob.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-600">
                  <strong>Mức lương:</strong> {selectedJob.salary} <br />
                  <strong>Kinh nghiệm:</strong> {selectedJob.experience}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setDetailModalOpen(false)}>
                    Đóng
                  </Button>
                  <Button onClick={() => onApplyJob(selectedJob)} className="bg-blue-500 hover:bg-blue-600">
                    Ứng tuyển ngay
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 