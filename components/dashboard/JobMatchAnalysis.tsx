import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Mail } from "lucide-react"
import { Progress } from "@/components/ui/progress"

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

interface JobMatchAnalysisProps {
  job: JobListing
  onBack: () => void
}

// Mock data cho phân tích CV
const mockAnalysisData = {
  overallMatch: 78,
  skillsMatch: 82,
  experienceMatch: 70,
  educationMatch: 85,
  matchedSkills: ["React", "TypeScript", "HTML/CSS", "Git"],
  missingSkills: ["Redux"],
  strengths: [
    "Kỹ năng frontend mạnh với React và TypeScript",
    "Có kinh nghiệm làm việc với REST API",
    "Kiến thức tốt về HTML/CSS và responsive design"
  ],
  improvements: [
    "Cần bổ sung kinh nghiệm với Redux",
    "Nên phát triển thêm kiến thức về testing"
  ]
}

export function JobMatchAnalysis({ job, onBack }: JobMatchAnalysisProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2" 
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại dashboard
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-center mb-8">
            <CheckCircle className="w-12 h-12 text-green-500 mr-4" />
            <div>
              <h1 className="text-2xl font-bold text-green-600">Đã nộp đơn ứng tuyển thành công!</h1>
              <p className="text-gray-600">
                CV của bạn đã được gửi cho vị trí <strong>{job.title}</strong> tại <strong>{job.company}</strong>
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-700">Thông báo</h3>
                <p className="text-blue-600">
                  Nhà tuyển dụng sẽ liên hệ với bạn qua email hoặc số điện thoại trong vòng 3-5 ngày làm việc.
                  Vui lòng kiểm tra email thường xuyên.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Phân tích độ phù hợp (AI Match Analysis)</h2>
            <p className="text-gray-600 mb-6">
              Dưới đây là phân tích độ phù hợp của CV của bạn với vị trí <strong>{job.title}</strong> dựa trên AI:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Độ phù hợp tổng thể</h3>
                <div className="flex items-center">
                  <Progress value={mockAnalysisData.overallMatch} className="h-4 flex-1 mr-3" />
                  <span className="font-bold text-lg">{mockAnalysisData.overallMatch}%</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Kỹ năng</h3>
                <div className="flex items-center">
                  <Progress value={mockAnalysisData.skillsMatch} className="h-4 flex-1 mr-3" />
                  <span className="font-bold text-lg">{mockAnalysisData.skillsMatch}%</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Kinh nghiệm</h3>
                <div className="flex items-center">
                  <Progress value={mockAnalysisData.experienceMatch} className="h-4 flex-1 mr-3" />
                  <span className="font-bold text-lg">{mockAnalysisData.experienceMatch}%</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Học vấn</h3>
                <div className="flex items-center">
                  <Progress value={mockAnalysisData.educationMatch} className="h-4 flex-1 mr-3" />
                  <span className="font-bold text-lg">{mockAnalysisData.educationMatch}%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Kỹ năng phù hợp
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mockAnalysisData.matchedSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <XCircle className="w-5 h-5 text-red-500 mr-2" />
                  Kỹ năng còn thiếu
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mockAnalysisData.missingSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Điểm mạnh của bạn
                </h3>
                <ul className="space-y-2">
                  {mockAnalysisData.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 text-amber-500 mr-2" />
                  Điểm cần cải thiện
                </h3>
                <ul className="space-y-2">
                  {mockAnalysisData.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={onBack}
            >
              Quay lại trang chủ
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 