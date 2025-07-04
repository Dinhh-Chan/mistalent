"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, Bot, CheckCircle, FileText, Code, Video, Trophy, MapPin, Clock, DollarSign, Users } from "lucide-react"
import { LoginPage as LoginPageComponent } from "../components/login-page"
import { MainDashboard } from "@/components/dashboard/MainDashboard"

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  posted: string;
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
}

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [currentStep, setCurrentStep] = useState("home")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "Hà Nội",
      salary: "25-35 triệu",
      type: "Full-time",
      experience: "3-5 năm",
      posted: "2 ngày trước",
      description:
        "Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm với React và TypeScript để tham gia vào đội ngũ phát triển sản phẩm.",
      requirements: [
        "3+ năm kinh nghiệm với React/Vue.js",
        "Thành thạo TypeScript, HTML5, CSS3",
        "Kinh nghiệm với Redux/Vuex",
        "Hiểu biết về responsive design",
        "Kinh nghiệm với Git, CI/CD",
      ],
      benefits: [
        "Lương cạnh tranh 25-35 triệu",
        "Thưởng hiệu suất hàng quý",
        "Bảo hiểm sức khỏe cao cấp",
        "Làm việc hybrid",
        "Đào tạo và phát triển nghề nghiệp",
      ],
      skills: ["React", "TypeScript", "Redux", "CSS3", "Git"],
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "TechCorp",
      location: "TP.HCM",
      salary: "20-30 triệu",
      type: "Full-time",
      experience: "2-4 năm",
      posted: "1 ngày trước",
      description: "Tham gia phát triển hệ thống backend cho các ứng dụng web và mobile với quy mô lớn.",
      requirements: [
        "2+ năm kinh nghiệm Backend development",
        "Thành thạo Node.js hoặc Python",
        "Kinh nghiệm với database (MySQL, MongoDB)",
        "Hiểu biết về RESTful API, GraphQL",
        "Kinh nghiệm với Docker, AWS",
      ],
      benefits: [
        "Lương cạnh tranh 20-30 triệu",
        "Thưởng dự án",
        "Bảo hiểm đầy đủ",
        "Remote-friendly",
        "Cơ hội thăng tiến",
      ],
      skills: ["Node.js", "Python", "MongoDB", "Docker", "AWS"],
    },
    {
      id: 3,
      title: "Full Stack Developer",
      company: "TechCorp",
      location: "Đà Nẵng",
      salary: "18-28 triệu",
      type: "Full-time",
      experience: "2-5 năm",
      posted: "3 ngày trước",
      description: "Phát triển ứng dụng web full-stack từ frontend đến backend, làm việc với công nghệ hiện đại.",
      requirements: [
        "2+ năm kinh nghiệm Full Stack",
        "Frontend: React/Vue.js",
        "Backend: Node.js/Python/Java",
        "Database: SQL và NoSQL",
        "Kinh nghiệm với cloud services",
      ],
      benefits: [
        "Lương 18-28 triệu",
        "Bonus theo dự án",
        "Bảo hiểm cao cấp",
        "Flexible working hours",
        "Team building hàng quý",
      ],
      skills: ["React", "Node.js", "Python", "MySQL", "AWS"],
    },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
          setTimeout(() => setCurrentStep("dashboard"), 1000)
        }
      }, 200)
    }
  }

  const handleSubmitCV = () => {
    if (selectedFile) {
      setCurrentStep("uploading")
    }
  }

  const handleApplyJob = (job?: Job) => {
    if (!isLoggedIn) {
      setSelectedJob(job || null)
      setShowLogin(true)
      return
    }
    setSelectedJob(job || null)
    setCurrentStep("apply")
  }

  if (currentStep === "uploading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Bot className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold mb-2">AI đang phân tích CV của bạn...</h3>
            <Progress value={uploadProgress} className="mb-4" />
            <p className="text-sm text-gray-600">Đang quét từ khóa và đánh giá độ phù hợp... {uploadProgress}%</p>
            {uploadProgress > 50 && (
              <div className="mt-4 text-sm text-green-600">
                ✓ Phát hiện từ khóa: <span className="bg-blue-100 px-2 py-1 rounded">Python</span>,{" "}
                <span className="bg-blue-100 px-2 py-1 rounded">React</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (showLogin) {
    return <LoginPageComponent onLogin={(loggedIn) => {
      setIsLoggedIn(loggedIn)
      if (loggedIn) {
        setShowLogin(false)
        // Nếu có job được chọn, chuyển đến trang nộp CV
        if (selectedJob) {
          setCurrentStep("apply")
        } else {
          setCurrentStep("home")
        }
      }
    }} onBack={() => {
      setShowLogin(false)
      setSelectedJob(null)
    }} />
  }

  if (isLoggedIn) {
    return <MainDashboard onLogout={() => setIsLoggedIn(false)} onGoHome={() => setCurrentStep("home")} />
  }

  if (currentStep === "jobs") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Bot className="w-8 h-8 text-blue-500 mr-2" />
                <span className="text-xl font-bold text-gray-900">TechCorp AI</span>
              </div>
              <div className="flex space-x-4">
                <Button variant="ghost" onClick={() => setCurrentStep("home")}>
                  Trang chủ
                </Button>
                <Button variant="ghost" className="bg-blue-50 text-blue-600">
                  Vị trí tuyển dụng
                </Button>
                <Button variant="ghost" onClick={() => setShowLogin(true)}>
                  Đăng nhập
                </Button>
                <Button variant="outline">Hỗ trợ</Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Vị trí tuyển dụng</h1>
            <p className="text-gray-600">Khám phá các cơ hội nghề nghiệp tại TechCorp</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                        <p className="text-gray-600 mb-3">{job.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.salary}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {job.experience}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.posted}
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{job.type}</Badge>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Kỹ năng yêu cầu:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={() => {
                          setSelectedJob(job)
                          setCurrentStep("job-detail")
                        }}
                      >
                        Xem chi tiết
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleApplyJob(job)}
                      >
                        Ứng tuyển ngay
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tại sao chọn TechCorp?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Môi trường làm việc hiện đại</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Cơ hội phát triển nghề nghiệp</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Lương thưởng cạnh tranh</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>Work-life balance</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quy trình tuyển dụng AI</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">
                        1
                      </div>
                      <span>Nộp CV và AI lọc hồ sơ</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">
                        2
                      </div>
                      <span>Làm bài test kỹ năng + tính cách</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">
                        3
                      </div>
                      <span>Phỏng vấn với AI</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3">
                        4
                      </div>
                      <span>Nhận kết quả tuyển dụng</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === "job-detail" && selectedJob) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Bot className="w-8 h-8 text-blue-500 mr-2" />
                <span 
                  className="text-xl font-bold text-gray-900 cursor-pointer" 
                  onClick={() => setCurrentStep("home")}
                >
                  TechCorp AI
                </span>
              </div>
              <div className="flex space-x-4">
                <Button variant="ghost" onClick={() => setCurrentStep("jobs")}>
                  ← Quay lại
                </Button>
                <Button variant="outline">Hỗ trợ</Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedJob.title}</h1>
              <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {selectedJob.location}
                </span>
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {selectedJob.salary}
                </span>
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {selectedJob.experience}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedJob.posted}
                </span>
              </div>
              <Badge className="bg-green-100 text-green-800">{selectedJob.type}</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Mô tả công việc</h2>
                  <p className="text-gray-700">{selectedJob.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Yêu cầu công việc</h2>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Quyền lợi</h2>
                  <ul className="space-y-2">
                    {selectedJob.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Kỹ năng yêu cầu</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Bot className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Ứng tuyển với AI</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Hệ thống AI sẽ đánh giá hồ sơ của bạn và đưa ra phản hồi nhanh chóng
                    </p>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={() => handleApplyJob(selectedJob)}>
                      Ứng tuyển ngay
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Bot className="w-8 h-8 text-blue-500 mr-2" />
              <span 
                className="text-xl font-bold text-gray-900 cursor-pointer" 
                onClick={() => setCurrentStep("home")}
              >
                TechCorp AI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setCurrentStep("home")}>
                Trang chủ
              </Button>
              <Button variant="ghost" onClick={() => setCurrentStep("jobs")}>
                Vị trí tuyển dụng
              </Button>
              <span className="text-sm text-gray-600">Xin chào, {isLoggedIn ? 'User' : 'Guest'}</span>
              <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)}>
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Tìm việc dễ dàng với <span className="text-blue-500">AI</span> của TechCorp!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Hệ thống AI thông minh giúp bạn vượt qua mọi vòng tuyển dụng một cách hiệu quả nhất.
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg"
                  onClick={() => setCurrentStep("jobs")}
                >
                  Xem vị trí tuyển dụng
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg bg-transparent"
                  onClick={() => handleApplyJob()}
                >
                  Nộp CV ngay
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <Bot className="w-24 h-24 text-blue-500 mx-auto mb-4" />
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Lọc CV tự động</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Test kỹ năng thông minh</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Phỏng vấn AI</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Đánh giá độ phù hợp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CV Upload Form */}
      {currentStep === "apply" && (
        <div className="min-h-screen bg-gray-50">
          {/* Navigation */}
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Bot className="w-8 h-8 text-blue-500 mr-2" />
                  <span 
                    className="text-xl font-bold text-gray-900 cursor-pointer" 
                    onClick={() => setCurrentStep("home")}
                  >
                    TechCorp AI
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" onClick={() => setCurrentStep("home")}>
                    Trang chủ
                  </Button>
                  <Button variant="ghost" onClick={() => setCurrentStep("jobs")}>
                    Vị trí tuyển dụng
                  </Button>
                  <span className="text-sm text-gray-600">Xin chào, {isLoggedIn ? 'User' : 'Guest'}</span>
                  <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)}>
                    Đăng xuất
                  </Button>
                </div>
              </div>
            </div>
          </nav>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedJob ? `Ứng tuyển: ${selectedJob.title}` : "Nộp hồ sơ ứng tuyển"}
              </h1>
              <p className="text-gray-600">
                Hoàn thành form dưới đây để nộp hồ sơ ứng tuyển. AI sẽ phân tích CV của bạn ngay lập tức.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Thông tin ứng tuyển
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="cv-upload">Tải lên CV của bạn *</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <input
                        id="cv-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label htmlFor="cv-upload" className="cursor-pointer">
                        <span className="text-blue-500 hover:text-blue-600">Chọn file</span> hoặc kéo thả vào đây
                      </label>
                      <p className="text-sm text-gray-500 mt-2">Hỗ trợ PDF, Word (tối đa 10MB)</p>
                      {selectedFile && <p className="text-sm text-green-600 mt-2">✓ {selectedFile.name}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullname">Họ và tên *</Label>
                      <Input id="fullname" placeholder="Nguyễn Văn A" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="example@email.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input id="phone" placeholder="0123456789" />
                    </div>
                    <div>
                      <Label htmlFor="position">Vị trí ứng tuyển *</Label>
                      <Select defaultValue={selectedJob?.title}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn vị trí" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Senior Frontend Developer">Senior Frontend Developer</SelectItem>
                          <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                          <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="portfolio">Portfolio/LinkedIn (tùy chọn)</Label>
                    <Input id="portfolio" placeholder="https://linkedin.com/in/yourname" />
                  </div>

                  <div>
                    <Label htmlFor="cover-letter">Thư xin việc (tùy chọn)</Label>
                    <textarea
                      id="cover-letter"
                      className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Viết vài dòng về lý do bạn muốn ứng tuyển vào vị trí này..."
                    />
                  </div>

                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    size="lg"
                    onClick={handleSubmitCV}
                    disabled={!selectedFile}
                  >
                    Nộp hồ sơ ứng tuyển
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {selectedJob && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Thông tin vị trí</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Vị trí:</span> {selectedJob.title}
                        </p>
                        <p>
                          <span className="font-medium">Địa điểm:</span> {selectedJob.location}
                        </p>
                        <p>
                          <span className="font-medium">Mức lương:</span> {selectedJob.salary}
                        </p>
                        <p>
                          <span className="font-medium">Kinh nghiệm:</span> {selectedJob.experience}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardContent className="p-6">
                    <Bot className="w-12 h-12 text-blue-500 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Tôi sẽ phân tích CV của bạn và đưa ra đánh giá độ phù hợp với vị trí ứng tuyển!
                    </p>
                    <Button variant="outline" size="sm">
                      Nhận tư vấn AI
                    </Button>
                  </CardContent>
                </Card>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Quy trình tuyển dụng</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-blue-500 mr-3" />
                      <span className="text-sm">1. Nộp CV và AI lọc hồ sơ</span>
                    </div>
                    <div className="flex items-center">
                      <Code className="w-5 h-5 text-blue-500 mr-3" />
                      <span className="text-sm">2. Làm bài test kỹ năng + tính cách</span>
                    </div>
                    <div className="flex items-center">
                      <Video className="w-5 h-5 text-blue-500 mr-3" />
                      <span className="text-sm">3. Phỏng vấn với AI</span>
                    </div>
                    <div className="flex items-center">
                      <Trophy className="w-5 h-5 text-blue-500 mr-3" />
                      <span className="text-sm">4. Nhận kết quả tuyển dụng</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
