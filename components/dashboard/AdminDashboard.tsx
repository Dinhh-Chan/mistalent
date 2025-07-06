"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Bot,
  LogOut,
  Users,
  Briefcase,
  Mail,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Download,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  FileText,
  Code,
  Video,
  Trophy,
} from "lucide-react"

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)
  const [showCandidateDetail, setShowCandidateDetail] = useState(false)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [showJobDialog, setShowJobDialog] = useState(false)
  const [editingJob, setEditingJob] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock data for candidates
  const candidates = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      position: "Senior Frontend Developer",
      appliedDate: "2024-01-10",
      status: "hired",
      avatar: "A",
      cv: "CV_NguyenVanA.pdf",
      stages: {
        cv: { status: "passed", score: 85, date: "2024-01-11", feedback: "CV phù hợp với yêu cầu công việc" },
        test: {
          status: "passed",
          date: "2024-01-13",
          scores: { code: 85, personality: 92 },
          feedback: "Kỹ năng lập trình tốt, tính cách phù hợp với team",
        },
        interview: {
          status: "passed",
          date: "2024-01-15",
          score: 88,
          feedback: "Giao tiếp tốt, kinh nghiệm phù hợp",
          transcript: "Transcript phỏng vấn chi tiết...",
        },
        final: { status: "hired", date: "2024-01-16" },
      },
      skills: ["React", "TypeScript", "Node.js", "MongoDB"],
      experience: "3 năm",
      education: "Đại học Bách Khoa Hà Nội",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0987654321",
      position: "Backend Developer",
      appliedDate: "2024-01-05",
      status: "rejected",
      avatar: "B",
      cv: "CV_TranThiB.pdf",
      stages: {
        cv: { status: "passed", score: 75, date: "2024-01-06", feedback: "CV đạt yêu cầu cơ bản" },
        test: {
          status: "failed",
          date: "2024-01-08",
          scores: { code: 65, personality: 78 },
          feedback: "Kỹ năng lập trình cần cải thiện thêm",
        },
        interview: { status: "not-reached", date: null },
        final: { status: "rejected", date: "2024-01-08" },
      },
      skills: ["Python", "Django", "PostgreSQL"],
      experience: "2 năm",
      education: "Đại học Công Nghệ",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0369852147",
      position: "Full Stack Developer",
      appliedDate: "2024-01-12",
      status: "in-progress",
      avatar: "C",
      cv: "CV_LeVanC.pdf",
      stages: {
        cv: { status: "passed", score: 90, date: "2024-01-13", feedback: "CV ấn tượng với nhiều dự án thực tế" },
        test: {
          status: "passed",
          date: "2024-01-15",
          scores: { code: 78, personality: 85 },
          feedback: "Kết quả test khá tốt",
        },
        interview: { status: "scheduled", date: "2024-01-20", feedback: "Phỏng vấn được lên lịch vào 14:00" },
        final: { status: "pending", date: null },
      },
      skills: ["React", "Node.js", "Python", "MySQL"],
      experience: "4 năm",
      education: "Đại học FPT",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0147258369",
      position: "Senior Frontend Developer",
      appliedDate: "2024-01-08",
      status: "in-progress",
      avatar: "D",
      cv: "CV_PhamThiD.pdf",
      stages: {
        cv: { status: "passed", score: 88, date: "2024-01-09", feedback: "Kinh nghiệm phong phú" },
        test: {
          status: "passed",
          date: "2024-01-11",
          scores: { code: 92, personality: 87 },
          feedback: "Xuất sắc ở cả hai phần test",
        },
        interview: { status: "completed", date: "2024-01-17", score: 91, feedback: "Phỏng vấn rất tốt" },
        final: { status: "pending", date: null },
      },
      skills: ["Vue.js", "React", "TypeScript", "GraphQL"],
      experience: "5 năm",
      education: "Đại học Quốc Gia",
    },
  ]

  // Mock data for jobs
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Hà Nội",
      salary: "25-35 triệu",
      type: "Full-time",
      status: "active",
      applicants: 15,
      hired: 1,
      posted: "2024-01-01",
      description: "Phát triển giao diện người dùng với React và TypeScript",
      requirements: ["3+ năm kinh nghiệm React", "Thành thạo TypeScript", "Kinh nghiệm với Redux"],
      benefits: ["Lương cạnh tranh", "Bảo hiểm cao cấp", "Làm việc hybrid"],
    },
    {
      id: 2,
      title: "Backend Developer",
      department: "Engineering",
      location: "TP.HCM",
      salary: "20-30 triệu",
      type: "Full-time",
      status: "active",
      applicants: 12,
      hired: 0,
      posted: "2024-01-03",
      description: "Phát triển API và hệ thống backend",
      requirements: ["2+ năm kinh nghiệm Backend", "Thành thạo Node.js hoặc Python", "Kinh nghiệm với database"],
      benefits: ["Lương cạnh tranh", "Thưởng dự án", "Remote-friendly"],
    },
    {
      id: 3,
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Đà Nẵng",
      salary: "18-28 triệu",
      type: "Full-time",
      status: "active",
      applicants: 8,
      hired: 0,
      posted: "2024-01-05",
      description: "Phát triển ứng dụng web full-stack",
      requirements: ["2+ năm kinh nghiệm Full Stack", "Frontend: React/Vue.js", "Backend: Node.js/Python"],
      benefits: ["Lương 18-28 triệu", "Flexible hours", "Team building"],
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "hired":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "passed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "scheduled":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "hired":
        return "Đã tuyển"
      case "rejected":
        return "Từ chối"
      case "in-progress":
        return "Đang xử lý"
      case "passed":
        return "Đạt"
      case "failed":
        return "Không đạt"
      case "scheduled":
        return "Đã lên lịch"
      case "pending":
        return "Chờ kết quả"
      case "active":
        return "Đang tuyển"
      case "inactive":
        return "Đã đóng"
      default:
        return status
    }
  }

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || candidate.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    totalCandidates: candidates.length,
    hired: candidates.filter((c) => c.status === "hired").length,
    inProgress: candidates.filter((c) => c.status === "in-progress").length,
    rejected: candidates.filter((c) => c.status === "rejected").length,
    totalJobs: jobs.length,
    activeJobs: jobs.filter((j) => j.status === "active").length,
  }

  const handleSendEmail = (candidate: any, type: string) => {
    // Simulate sending email
    alert(`Email đã được gửi đến ${candidate.name} (${candidate.email}) - Loại: ${type}`)
    setShowEmailDialog(false)
  }

  const handleSaveJob = (jobData: any) => {
    if (editingJob) {
      // Update existing job
      setJobs(jobs.map((job) => (job.id === editingJob.id ? { ...jobData, id: editingJob.id } : job)))
    } else {
      // Add new job
      const newJob = {
        ...jobData,
        id: Date.now(),
        applicants: 0,
        hired: 0,
        posted: new Date().toISOString().split("T")[0],
      }
      setJobs([...jobs, newJob])
    }
    setShowJobDialog(false)
    setEditingJob(null)
  }

  const handleDeleteJob = (jobId: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa vị trí này?")) {
      setJobs(jobs.filter((job) => job.id !== jobId))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Bot className="w-8 h-8 text-blue-500 mr-2" />
              <span className="text-xl font-bold text-gray-900">TechCorp AI - Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Xin chào, Admin</span>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="candidates">Ứng viên</TabsTrigger>
            <TabsTrigger value="jobs">Vị trí tuyển dụng</TabsTrigger>
            <TabsTrigger value="analytics">Phân tích</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Quản trị</h1>
              <p className="text-gray-600">Tổng quan về tình hình tuyển dụng</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-blue-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Tổng ứng viên</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalCandidates}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Đã tuyển dụng</p>
                      <p className="text-2xl font-bold text-green-600">{stats.hired}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="w-8 h-8 text-blue-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Đang xử lý</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Briefcase className="w-8 h-8 text-purple-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Vị trí đang tuyển</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.activeJobs}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Job Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Thống kê theo vị trí</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-gray-600">{job.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{job.applicants} ứng viên</p>
                          <p className="text-sm text-green-600">{job.hired} đã tuyển</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ứng viên gần đây</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidates.slice(0, 5).map((candidate) => (
                      <div key={candidate.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
                            {candidate.avatar}
                          </div>
                          <div>
                            <h4 className="font-medium">{candidate.name}</h4>
                            <p className="text-sm text-gray-600">{candidate.position}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(candidate.status)}>{getStatusText(candidate.status)}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Candidates Tab */}
          <TabsContent value="candidates" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Quản lý Ứng viên</h2>
              <div className="flex space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm ứng viên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="hired">Đã tuyển</SelectItem>
                    <SelectItem value="in-progress">Đang xử lý</SelectItem>
                    <SelectItem value="rejected">Từ chối</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ứng viên</TableHead>
                      <TableHead>Vị trí</TableHead>
                      <TableHead>Ngày ứng tuyển</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCandidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
                              {candidate.avatar}
                            </div>
                            <div>
                              <p className="font-medium">{candidate.name}</p>
                              <p className="text-sm text-gray-600">{candidate.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{candidate.position}</TableCell>
                        <TableCell>{candidate.appliedDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(candidate.status)}>{getStatusText(candidate.status)}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedCandidate(candidate)
                                setShowCandidateDetail(true)
                              }}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedCandidate(candidate)
                                setShowEmailDialog(true)
                              }}
                            >
                              <Mail className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Quản lý Vị trí Tuyển dụng</h2>
              <Button onClick={() => setShowJobDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Thêm vị trí mới
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <p className="text-sm text-gray-600">
                          {job.department} • {job.location}
                        </p>
                      </div>
                      <Badge className={getStatusColor(job.status)}>{getStatusText(job.status)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Mức lương:</span>
                        <span className="font-medium">{job.salary}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Ứng viên:</span>
                        <span className="font-medium">{job.applicants}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Đã tuyển:</span>
                        <span className="font-medium text-green-600">{job.hired}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Ngày đăng:</span>
                        <span>{job.posted}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingJob(job)
                          setShowJobDialog(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteJob(job.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Phân tích & Báo cáo</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Tỷ lệ thành công theo vòng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Vòng CV</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Vòng Test</span>
                        <span>70%</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Vòng Phỏng vấn</span>
                        <span>60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tuyển dụng cuối</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    Phân bố kỹ năng ứng viên
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["React", "Node.js", "Python", "TypeScript", "Vue.js"].map((skill, index) => (
                      <div key={skill} className="flex items-center justify-between">
                        <span className="text-sm">{skill}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={[80, 65, 45, 70, 30][index]} className="w-20 h-2" />
                          <span className="text-sm font-medium">{[80, 65, 45, 70, 30][index]}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Thời gian xử lý trung bình</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Lọc CV</span>
                      <span className="font-medium">1.2 ngày</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Làm bài test</span>
                      <span className="font-medium">2.5 ngày</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Phỏng vấn</span>
                      <span className="font-medium">3.8 ngày</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Quyết định cuối</span>
                      <span className="font-medium">1.5 ngày</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top nguồn ứng viên</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Website công ty</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">LinkedIn</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">JobStreet</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Referral</span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Candidate Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Phân tích chi tiết ứng viên</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ứng viên</TableHead>
                      <TableHead>Vị trí</TableHead>
                      <TableHead>Điểm CV</TableHead>
                      <TableHead>Điểm Test</TableHead>
                      <TableHead>Điểm PV</TableHead>
                      <TableHead>Kết quả</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {candidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                              {candidate.avatar}
                            </div>
                            <span>{candidate.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{candidate.position}</TableCell>
                        <TableCell>
                          <span className="font-medium">{candidate.stages.cv.score || "N/A"}</span>
                        </TableCell>
                        <TableCell>
                          {candidate.stages.test.scores ? (
                            <div className="text-sm">
                              <div>Code: {candidate.stages.test.scores.code}</div>
                              <div>Tính cách: {candidate.stages.test.scores.personality}</div>
                            </div>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{candidate.stages.interview.score || "N/A"}</span>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(candidate.status)}>{getStatusText(candidate.status)}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Candidate Detail Dialog */}
      <Dialog open={showCandidateDetail} onOpenChange={setShowCandidateDetail}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Chi tiết ứng viên</DialogTitle>
          </DialogHeader>
          {selectedCandidate && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Thông tin cá nhân</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                        {selectedCandidate.avatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{selectedCandidate.name}</h3>
                        <p className="text-gray-600">{selectedCandidate.position}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Email:</strong> {selectedCandidate.email}
                      </p>
                      <p>
                        <strong>Điện thoại:</strong> {selectedCandidate.phone}
                      </p>
                      <p>
                        <strong>Kinh nghiệm:</strong> {selectedCandidate.experience}
                      </p>
                      <p>
                        <strong>Học vấn:</strong> {selectedCandidate.education}
                      </p>
                      <p>
                        <strong>Ngày ứng tuyển:</strong> {selectedCandidate.appliedDate}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Kỹ năng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Stages Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tiến trình tuyển dụng</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(selectedCandidate.stages).map(([stage, data]: [string, any]) => (
                      <div key={stage} className="border-l-4 border-gray-200 pl-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {stage === "cv" && <FileText className="w-4 h-4" />}
                            {stage === "test" && <Code className="w-4 h-4" />}
                            {stage === "interview" && <Video className="w-4 h-4" />}
                            {stage === "final" && <Trophy className="w-4 h-4" />}
                            <h4 className="font-medium">
                              {stage === "cv" && "Lọc CV"}
                              {stage === "test" && "Bài test"}
                              {stage === "interview" && "Phỏng vấn"}
                              {stage === "final" && "Kết quả cuối"}
                            </h4>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(data.status)}>{getStatusText(data.status)}</Badge>
                            {data.date && <span className="text-sm text-gray-500">{data.date}</span>}
                          </div>
                        </div>

                        {/* Scores */}
                        {data.score && (
                          <div className="mb-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Điểm số</span>
                              <span>{data.score}/100</span>
                            </div>
                            <Progress value={data.score} className="h-2" />
                          </div>
                        )}

                        {data.scores && (
                          <div className="mb-2 grid grid-cols-2 gap-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Code</span>
                                <span>{data.scores.code}/100</span>
                              </div>
                              <Progress value={data.scores.code} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Tính cách</span>
                                <span>{data.scores.personality}/100</span>
                              </div>
                              <Progress value={data.scores.personality} className="h-2" />
                            </div>
                          </div>
                        )}

                        {/* Feedback */}
                        {data.feedback && (
                          <div className="bg-gray-50 rounded-lg p-3 text-sm">
                            <strong>Nhận xét:</strong> {data.feedback}
                          </div>
                        )}

                        {/* Transcript */}
                        {data.transcript && (
                          <div className="mt-2">
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Tải transcript
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gửi email thông báo</DialogTitle>
            <DialogDescription>Gửi email thông báo đến {selectedCandidate?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => handleSendEmail(selectedCandidate, "Vượt qua vòng CV")}>Vượt qua vòng CV</Button>
              <Button onClick={() => handleSendEmail(selectedCandidate, "Vượt qua vòng Test")}>
                Vượt qua vòng Test
              </Button>
              <Button onClick={() => handleSendEmail(selectedCandidate, "Mời phỏng vấn")}>Mời phỏng vấn</Button>
              <Button onClick={() => handleSendEmail(selectedCandidate, "Được tuyển dụng")}>Được tuyển dụng</Button>
              <Button variant="outline" onClick={() => handleSendEmail(selectedCandidate, "Từ chối")}>
                Từ chối
              </Button>
              <Button variant="outline" onClick={() => handleSendEmail(selectedCandidate, "Tùy chỉnh")}>
                Email tùy chỉnh
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Job Dialog */}
      <JobDialog
        open={showJobDialog}
        onOpenChange={setShowJobDialog}
        job={editingJob}
        onSave={handleSaveJob}
        onCancel={() => {
          setShowJobDialog(false)
          setEditingJob(null)
        }}
      />
    </div>
  )
}

// Job Dialog Component
function JobDialog({
  open,
  onOpenChange,
  job,
  onSave,
  onCancel,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  job: any
  onSave: (job: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    salary: "",
    type: "Full-time",
    status: "active",
    description: "",
    requirements: [""],
    benefits: [""],
  })

  React.useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        department: job.department || "",
        location: job.location || "",
        salary: job.salary || "",
        type: job.type || "Full-time",
        status: job.status || "active",
        description: job.description || "",
        requirements: job.requirements || [""],
        benefits: job.benefits || [""],
      })
    } else {
      setFormData({
        title: "",
        department: "",
        location: "",
        salary: "",
        type: "Full-time",
        status: "active",
        description: "",
        requirements: [""],
        benefits: [""],
      })
    }
  }, [job])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const addRequirement = () => {
    setFormData({ ...formData, requirements: [...formData.requirements, ""] })
  }

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...formData.requirements]
    newRequirements[index] = value
    setFormData({ ...formData, requirements: newRequirements })
  }

  const removeRequirement = (index: number) => {
    setFormData({ ...formData, requirements: formData.requirements.filter((_, i) => i !== index) })
  }

  const addBenefit = () => {
    setFormData({ ...formData, benefits: [...formData.benefits, ""] })
  }

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...formData.benefits]
    newBenefits[index] = value
    setFormData({ ...formData, benefits: newBenefits })
  }

  const removeBenefit = (index: number) => {
    setFormData({ ...formData, benefits: formData.benefits.filter((_, i) => i !== index) })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{job ? "Chỉnh sửa vị trí" : "Thêm vị trí mới"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Tên vị trí *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="department">Phòng ban</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Địa điểm</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="salary">Mức lương</Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Loại hình</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Trạng thái</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Đang tuyển</SelectItem>
                  <SelectItem value="inactive">Đã đóng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Mô tả công việc</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label>Yêu cầu công việc</Label>
            {formData.requirements.map((req, index) => (
              <div key={index} className="flex space-x-2 mt-2">
                <Input
                  value={req}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  placeholder="Nhập yêu cầu..."
                />
                <Button type="button" variant="outline" size="sm" onClick={() => removeRequirement(index)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addRequirement} className="mt-2 bg-transparent">
              <Plus className="w-4 h-4 mr-2" />
              Thêm yêu cầu
            </Button>
          </div>

          <div>
            <Label>Quyền lợi</Label>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex space-x-2 mt-2">
                <Input
                  value={benefit}
                  onChange={(e) => updateBenefit(index, e.target.value)}
                  placeholder="Nhập quyền lợi..."
                />
                <Button type="button" variant="outline" size="sm" onClick={() => removeBenefit(index)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addBenefit} className="mt-2 bg-transparent">
              <Plus className="w-4 h-4 mr-2" />
              Thêm quyền lợi
            </Button>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Hủy
            </Button>
            <Button type="submit">{job ? "Cập nhật" : "Thêm mới"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
