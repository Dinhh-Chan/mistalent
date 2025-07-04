import { useState } from "react"
import { DashboardNavigation } from "@/components/dashboard/DashboardNavigation"
import { StatsCards } from "@/components/dashboard/StatsCards"
import { ApplicationCard } from "@/components/dashboard/ApplicationCard"
import { TestInterface } from "@/components/dashboard/TestInterface"
import { InterviewInterface } from "@/components/dashboard/InterviewInterface"
import { ApplicationDetailModal } from "@/components/dashboard/ApplicationDetailModal"
import { JobDetailView } from "./JobDetailView"
import { JobApplicationForm } from "./JobApplicationForm"
import { JobMatchAnalysis } from "./JobMatchAnalysis"
import { applications, jobs } from "@/data/mockData"
import { calculateStats } from "@/utils/dashboardUtils"
import { Application } from "@/types/dashboard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { MapPin, DollarSign, Briefcase, Clock, Search } from "lucide-react"

interface MainDashboardProps {
  onLogout: () => void
  onGoHome?: () => void
}

type ViewType = "dashboard" | "test" | "interview" | "job-detail" | "job-application" | "job-match"

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

export function MainDashboard({ onLogout, onGoHome }: MainDashboardProps) {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard")
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [applicationsData, setApplicationsData] = useState<Application[]>(applications)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [detailApplication, setDetailApplication] = useState<Application | null>(null)
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null)
  const [activeTab, setActiveTab] = useState("applications")
  const [searchQuery, setSearchQuery] = useState("")

  const stats = calculateStats(applicationsData)

  const handleViewApplicationDetail = (application: Application) => {
    setDetailApplication(application)
    setDetailModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false)
    setDetailApplication(null)
  }

  const handleStartTest = (application: Application) => {
    setSelectedApplication(application)
    setCurrentView("test")
  }

  const handleStartInterview = (application: Application) => {
    setSelectedApplication(application)
    setCurrentView("interview")
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
    setSelectedApplication(null)
    setSelectedJob(null)
  }

  const handleViewJobDetail = (job: JobListing) => {
    setSelectedJob(job)
    setCurrentView("job-detail")
  }

  const handleApplyForJob = () => {
    setCurrentView("job-application")
  }

  const handleSubmitApplication = () => {
    setCurrentView("job-match")
  }

  const handleTestComplete = (score: number, totalQuestions: number) => {
    if (selectedApplication) {
      const isPassed = score >= (totalQuestions * 0.7) // 70% để pass
      
      // Cập nhật trạng thái ứng dụng
      const updatedApplications = applicationsData.map(app => {
        if (app.id === selectedApplication.id) {
          return {
            ...app,
            stages: {
              ...app.stages,
              test: {
                ...app.stages.test,
                status: isPassed ? "passed" : "failed"
              }
            },
            status: isPassed ? "in-progress" : "rejected"
          } as Application
        }
        return app
      })
      
      setApplicationsData(updatedApplications)
    }
  }

  const handleInterviewComplete = (result: "passed" | "failed") => {
    if (selectedApplication) {
      const updatedApplications = applicationsData.map(app => {
        if (app.id === selectedApplication.id) {
          return {
            ...app,
            stages: {
              ...app.stages,
              interview: {
                ...app.stages.interview,
                status: result
              },
              final: {
                ...app.stages.final,
                status: result === "passed" ? "hired" : "rejected"
              }
            },
            status: result === "passed" ? "hired" : "rejected"
          } as Application
        }
        return app
      })
      
      setApplicationsData(updatedApplications)
    }
  }

  // Render các view khác nhau
  if (currentView === "test" && selectedApplication) {
    return (
      <TestInterface
        application={selectedApplication}
        onBack={handleBackToDashboard}
        onComplete={handleTestComplete}
        onLogout={onLogout}
        onGoHome={onGoHome}
      />
    )
  }

  if (currentView === "interview" && selectedApplication) {
    return (
      <InterviewInterface
        application={selectedApplication}
        onBack={handleBackToDashboard}
        onComplete={handleInterviewComplete}
        onLogout={onLogout}
        onGoHome={onGoHome}
      />
    )
  }

  if (currentView === "job-detail" && selectedJob) {
    return (
      <JobDetailView
        job={selectedJob}
        onBack={handleBackToDashboard}
        onApply={handleApplyForJob}
        onLogout={onLogout}
        onGoHome={onGoHome}
      />
    )
  }

  if (currentView === "job-application" && selectedJob) {
    return (
      <JobApplicationForm
        job={selectedJob}
        onBack={() => setCurrentView("job-detail")}
        onSubmit={handleSubmitApplication}
        onLogout={onLogout}
        onGoHome={onGoHome}
      />
    )
  }

  if (currentView === "job-match" && selectedJob) {
    return (
      <JobMatchAnalysis
        job={selectedJob}
        onBack={handleBackToDashboard}
      />
    )
  }

  // Dashboard view
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation onLogout={onLogout} onGoHome={onGoHome} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Ứng tuyển</h1>
          <p className="text-gray-600">Theo dõi tiến trình các đơn ứng tuyển và tìm kiếm cơ hội mới</p>
        </div>
        
        <Tabs defaultValue="applications" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="applications">Đơn ứng tuyển</TabsTrigger>
            <TabsTrigger value="jobs">Việc làm mới</TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications">
            <StatsCards stats={stats} />
            <div className="space-y-6 mt-6">
              {applicationsData.map(app => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  onViewDetail={handleViewApplicationDetail}
                  onStartTest={handleStartTest}
                  onStartInterview={handleStartInterview}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="jobs">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm việc làm..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs
                .filter(job => 
                  searchQuery === "" || 
                  job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                .map((job) => (
                  <div key={job.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h3>
                        <p className="text-gray-600 font-medium">{job.company}</p>
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
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {job.salary}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {job.type} • {job.experience}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {job.posted}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full">
                          +{job.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{job.applications} ứng viên</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewJobDetail(job)}
                      >
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <ApplicationDetailModal
        open={detailModalOpen}
        onClose={handleCloseDetailModal}
        application={detailApplication}
      />
    </div>
  )
} 