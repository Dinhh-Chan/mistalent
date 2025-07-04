import { FileText, Code, Video, Trophy, Clock } from "lucide-react";
import React from "react";

export const getStatusColor = (status: string) => {
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
      return "bg-orange-100 text-orange-800"
    case "not-reached":
      return "bg-gray-100 text-gray-600"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getStatusText = (status: string) => {
  switch (status) {
    case "hired":
      return "Đã tuyển dụng"
    case "rejected":
      return "Không đạt"
    case "in-progress":
      return "Đang xử lý"
    case "passed":
      return "Đạt"
    case "failed":
      return "Không đạt"
    case "scheduled":
      return "Đã lên lịch"
    case "pending":
      return "Chờ thực hiện"
    case "not-reached":
      return "Chưa thực hiện"
    default:
      return status
  }
}

export const getStageIcon = (stage: string): React.ReactElement => {
  switch (stage) {
    case "cv":
      return React.createElement(FileText, { className: "w-4 h-4" })
    case "test":
      return React.createElement(Code, { className: "w-4 h-4" })
    case "interview":
      return React.createElement(Video, { className: "w-4 h-4" })
    case "final":
      return React.createElement(Trophy, { className: "w-4 h-4" })
    default:
      return React.createElement(Clock, { className: "w-4 h-4" })
  }
}

export const getStageName = (stage: string) => {
  switch (stage) {
    case "cv":
      return "Lọc CV"
    case "test":
      return "Bài test"
    case "interview":
      return "Phỏng vấn"
    case "final":
      return "Kết quả cuối"
    default:
      return stage
  }
}

export const calculateStats = (applications: any[]) => {
  return {
    total: applications.length,
    hired: applications.filter((app) => app.status === "hired").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
    inProgress: applications.filter((app) => app.status === "in-progress").length,
  }
}

export const generateMockMatchingResult = () => {
  return {
    score: Math.floor(Math.random() * 30) + 70, // 70-100
    skills: ["React", "TypeScript", "Node.js", "MongoDB"],
    feedback: "CV của bạn có nhiều điểm mạnh phù hợp với vị trí này. Kinh nghiệm với React và TypeScript rất ấn tượng.",
    recommendation: "Chúng tôi khuyến nghị bạn tiếp tục với vòng tiếp theo. Hãy chuẩn bị cho bài test kỹ năng."
  }
}

export const generateMockTestResults = () => {
  return {
    coding: Math.floor(Math.random() * 30) + 70, // 70-100
    personality: Math.floor(Math.random() * 30) + 70 // 70-100
  }
}

export const generateMockInterviewResults = () => {
  return {
    score: Math.floor(Math.random() * 30) + 70, // 70-100
    feedback: "Ứng viên thể hiện tốt trong buổi phỏng vấn. Có kiến thức chuyên môn vững vàng, giao tiếp tự tin và có tư duy giải quyết vấn đề tốt."
  }
} 