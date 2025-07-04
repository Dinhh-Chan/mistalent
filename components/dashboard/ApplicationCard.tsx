import { MapPin, DollarSign, Calendar, Code, Video, Eye, Mail, Clock, CheckCircle, Trophy, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Application } from "@/types/dashboard"
import { getStatusColor, getStatusText, getStageIcon, getStageName } from "@/utils/dashboardUtils"

interface ApplicationCardProps {
  application: Application
  onViewDetail: (application: Application) => void
  onStartTest: (application: Application) => void
  onStartInterview: (application: Application) => void
}

export function ApplicationCard({ 
  application, 
  onViewDetail, 
  onStartTest, 
  onStartInterview 
}: ApplicationCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{application.position}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {application.location}
              </span>
              <span className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                {application.salary}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Ứng tuyển: {application.appliedDate}
              </span>
            </div>
          </div>
          <Badge className={getStatusColor(application.status)}>{getStatusText(application.status)}</Badge>
        </div>

        {/* Progress Timeline */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Tiến trình ứng tuyển:</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(application.stages).map(([stage, data]) => (
              <div key={stage} className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    data.status === "passed" || data.status === "hired"
                      ? "bg-green-100 text-green-600"
                      : data.status === "failed" || data.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : data.status === "scheduled"
                          ? "bg-yellow-100 text-yellow-600"
                          : data.status === "pending"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {getStageIcon(stage)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{getStageName(stage)}</p>
                  <Badge className={`text-xs ${getStatusColor(data.status)}`}>
                    {getStatusText(data.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons for Pending Stages */}
        <div className="mt-6 flex flex-wrap gap-3">
          {/* Continue Test Button */}
          {application.stages.test.status === "pending" && (
            <Button 
              onClick={() => onStartTest(application)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Code className="w-4 h-4 mr-2" />
              Tiếp tục làm bài test
            </Button>
          )}

          {/* Continue Interview Button */}
          {application.stages.interview.status === "pending" && application.stages.test.status === "passed" && (
            <Button 
              onClick={() => onStartInterview(application)}
              className="bg-green-500 hover:bg-green-600"
            >
              <Video className="w-4 h-4 mr-2" />
              Tiếp tục phỏng vấn
            </Button>
          )}

          {/* View Details Button */}
          <Button 
            variant="outline"
            onClick={() => onViewDetail(application)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Xem chi tiết
          </Button>
        </div>

        {/* Latest Update */}
        {application.stages.final.feedback && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Mail className="w-4 h-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Thông báo mới nhất:</p>
                <p className="text-sm text-gray-700 mt-1">{application.stages.final.feedback}</p>
              </div>
            </div>
          </div>
        )}

        {/* Status-specific messages */}
        {application.stages.test.status === "pending" && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-2">
              <Clock className="w-4 h-4 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Bài test đang chờ</p>
                <p className="text-sm text-blue-700 mt-1">
                  Bạn cần hoàn thành bài test kỹ năng để tiếp tục quy trình ứng tuyển.
                </p>
              </div>
            </div>
          </div>
        )}

        {application.stages.interview.status === "pending" && application.stages.test.status === "passed" && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900">Đã vượt qua bài test!</p>
                <p className="text-sm text-green-700 mt-1">
                  Chúc mừng! Bạn đã vượt qua bài test. Bước tiếp theo là phỏng vấn với AI.
                </p>
              </div>
            </div>
          </div>
        )}

        {application.status === "hired" && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start space-x-2">
              <Trophy className="w-4 h-4 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900">Chúc mừng! Bạn đã được nhận!</p>
                <p className="text-sm text-green-700 mt-1">
                  Công ty sẽ liên hệ với bạn trong thời gian sớm nhất để thảo luận chi tiết.
                </p>
              </div>
            </div>
          </div>
        )}

        {application.status === "rejected" && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-start space-x-2">
              <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-900">Đơn ứng tuyển không thành công</p>
                <p className="text-sm text-red-700 mt-1">
                  Cảm ơn bạn đã quan tâm. Hãy tiếp tục tìm kiếm cơ hội khác phù hợp với bạn.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 