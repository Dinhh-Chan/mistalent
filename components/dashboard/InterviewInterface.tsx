"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ArrowLeft, Mic, MicOff, Video, VideoOff, Clock, CheckCircle, ChevronRight, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Application } from "@/types/dashboard"
import { DashboardNavigation } from "./DashboardNavigation"

interface InterviewInterfaceProps {
  application: Application
  onBack: () => void
  onComplete: (result: "passed" | "failed") => void
  onLogout?: () => void
  onGoHome?: () => void
}

interface InterviewQuestion {
  id: number
  question: string
  category: string
  expectedKeywords: string[]
}

const interviewQuestions: InterviewQuestion[] = [
  {
    id: 1,
    question: "Hãy giới thiệu về bản thân và kinh nghiệm làm việc của bạn?",
    category: "Giới thiệu",
    expectedKeywords: ["kinh nghiệm", "dự án", "công nghệ", "teamwork"],
  },
  {
    id: 2,
    question: "Bạn đã từng gặp khó khăn gì trong dự án và cách bạn giải quyết?",
    category: "Problem Solving",
    expectedKeywords: ["khó khăn", "giải quyết", "học hỏi", "cải thiện"],
  },
  {
    id: 3,
    question: "Bạn có thể mô tả một dự án thành công mà bạn đã tham gia không?",
    category: "Dự án",
    expectedKeywords: ["thành công", "kết quả", "đóng góp", "công nghệ"],
  },
  {
    id: 4,
    question: "Bạn thấy mình phù hợp với vị trí này như thế nào?",
    category: "Phù hợp",
    expectedKeywords: ["kỹ năng", "phù hợp", "mong muốn", "phát triển"],
  },
]

// Mock AI generated responses
const mockAIResponses: Record<number, string> = {
  1: "Tôi có 3 năm kinh nghiệm làm việc trong lĩnh vực phát triển web, chuyên về React và Node.js. Tôi đã tham gia nhiều dự án từ startup đến doanh nghiệp lớn, có khả năng làm việc nhóm tốt và luôn học hỏi công nghệ mới để cải thiện kỹ năng.",
  2: "Trong một dự án gần đây, tôi gặp khó khăn với việc tối ưu hóa performance của ứng dụng React. Tôi đã nghiên cứu, áp dụng lazy loading và memoization, đồng thời tham khảo ý kiến từ senior developer. Kết quả là cải thiện được 40% tốc độ load trang.",
  3: "Dự án thành công nhất tôi tham gia là xây dựng hệ thống e-commerce cho một công ty retail. Tôi đảm nhận phần frontend và API integration, sử dụng React, Redux và RESTful API. Dự án hoàn thành đúng deadline và tăng 25% doanh thu online cho khách hàng.",
  4: "Với kinh nghiệm về React, JavaScript và passion cho công nghệ, tôi tin mình phù hợp với vị trí Frontend Developer này. Tôi mong muốn được đóng góp vào các dự án thú vị và học hỏi thêm từ team để phát triển kỹ năng fullstack trong tương lai.",
}

export function InterviewInterface({ application, onBack, onComplete, onLogout, onGoHome }: InterviewInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isInterviewStarted, setIsInterviewStarted] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [showFinalResult, setShowFinalResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 phút
  const [stream, setStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const currentQuestion = interviewQuestions[currentQuestionIndex]

  // Start camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
        setStream(mediaStream)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      } catch (error) {
        console.error("Error accessing camera:", error)
      }
    }

    if (isInterviewStarted) {
      startCamera()
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isInterviewStarted, stream])

  const handleCompleteInterview = useCallback(() => {
    setShowReview(true)
    // Stop camera
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
  }, [stream])

  // Timer countdown
  useEffect(() => {
    if (!isInterviewStarted || showReview) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleCompleteInterview()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isInterviewStarted, showReview, handleCompleteInterview])

  const handleStartInterview = () => {
    setIsInterviewStarted(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < interviewQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handleSubmitInterview = () => {
    setShowFinalResult(true)
    onComplete("passed")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Final success screen
  if (showFinalResult) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNavigation 
          onLogout={onLogout || (() => {})}
          onGoHome={onGoHome}
          showBackButton={true}
          onBackToDashboard={onBack}
          title={`Kết quả Phỏng vấn - ${application.position}`}
        />
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2 text-gray-900">Phỏng vấn hoàn thành thành công!</h2>
                  <p className="text-gray-600">Cảm ơn bạn đã tham gia phỏng vấn với chúng tôi</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Bước tiếp theo
                  </h3>
                  <div className="text-blue-700 text-sm space-y-2">
                    <p>• Kết quả phỏng vấn của bạn đã được gửi đến nhà tuyển dụng</p>
                    <p>• Đội ngũ HR sẽ xem xét và phản hồi trong vòng 5-7 ngày làm việc</p>
                    <p>• Bạn sẽ nhận được email thông báo về kết quả cuối cùng</p>
                    <p>• Vui lòng kiểm tra email thường xuyên, bao gồm cả hộp thư spam</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button onClick={onBack} className="bg-blue-500 hover:bg-blue-600 px-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Quay lại Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Review screen with AI generated responses
  if (showReview) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNavigation 
          onLogout={onLogout || (() => {})}
          onGoHome={onGoHome}
          showBackButton={true}
          onBackToDashboard={onBack}
          title={`Xem lại Phỏng vấn - ${application.position}`}
        />
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Xem lại câu trả lời phỏng vấn</CardTitle>
                <p className="text-center text-gray-600">AI đã tạo ra các câu trả lời dựa trên phần phỏng vấn của bạn</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {interviewQuestions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="mb-3">
                      <span className="text-sm font-medium text-blue-600">Câu hỏi {index + 1}</span>
                      <h4 className="font-semibold text-gray-900">{question.question}</h4>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 leading-relaxed">{mockAIResponses[question.id]}</p>
                    </div>
                  </div>
                ))}

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Lưu ý:</strong> Đây là các câu trả lời được AI tạo ra dựa trên phần ghi âm phỏng vấn của bạn.
                    Bạn không thể chỉnh sửa nội dung này.
                  </p>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Quay lại Dashboard
                  </Button>
                  <Button onClick={handleSubmitInterview} className="bg-blue-500 hover:bg-blue-600">
                    <Send className="w-4 h-4 mr-2" />
                    Nộp bài phỏng vấn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation 
        onLogout={onLogout || (() => {})}
        onGoHome={onGoHome}
        showBackButton={true}
        onBackToDashboard={onBack}
        title={`Phỏng vấn - ${application.position}`}
      />
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
            <div className="flex items-center space-x-4">
              {isInterviewStarted && (
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                </div>
              )}
              <div className="text-sm text-gray-600">
                Phỏng vấn: {application.position} tại {application.company}
              </div>
            </div>
          </div>

          {/* Main Interview Area */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Phỏng vấn trực tuyến</span>
                {isInterviewStarted && (
                  <div className="flex space-x-2">
                    <Button size="sm" variant={isMicOn ? "default" : "secondary"} onClick={() => setIsMicOn(!isMicOn)}>
                      {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant={isVideoOn ? "default" : "secondary"}
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Video Area */}
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                  {!isInterviewStarted ? (
                    <div className="flex items-center justify-center h-full text-white">
                      <div className="text-center">
                        <Video className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                        <p className="text-lg font-medium mb-2">Sẵn sàng bắt đầu phỏng vấn</p>
                        <p className="text-gray-300 mb-4">Camera sẽ được bật khi bạn bắt đầu</p>
                        <Button onClick={handleStartInterview} className="bg-blue-500 hover:bg-blue-600">
                          Bắt đầu phỏng vấn
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className={`w-full h-full object-cover ${!isVideoOn ? "hidden" : ""}`}
                      />
                      {!isVideoOn && (
                        <div className="flex items-center justify-center h-full bg-gray-800 text-white">
                          <VideoOff className="w-16 h-16" />
                        </div>
                      )}

                      {/* Question Overlay */}
                      <div className="absolute top-4 left-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">
                            Câu hỏi {currentQuestionIndex + 1}/{interviewQuestions.length}
                          </span>
                          <span className="text-sm bg-blue-500 px-2 py-1 rounded">{currentQuestion.category}</span>
                        </div>
                        <p className="text-lg">{currentQuestion.question}</p>
                      </div>

                      {/* Mic Status */}
                      <div className="absolute bottom-4 left-4">
                        <div
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                            isMicOn ? "bg-green-500" : "bg-red-500"
                          } text-white`}
                        >
                          {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                          <span className="text-sm">{isMicOn ? "Đang ghi âm" : "Tắt mic"}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Controls */}
                {isInterviewStarted && (
                  <div className="mt-6 flex justify-between items-center">
                    <div className="text-sm text-gray-600">Hãy trả lời câu hỏi một cách tự nhiên và chi tiết</div>
                    <div className="flex space-x-3">
                      {currentQuestionIndex < interviewQuestions.length - 1 ? (
                        <Button onClick={handleNextQuestion} className="bg-blue-500 hover:bg-blue-600">
                          Chuyển câu tiếp
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button onClick={handleCompleteInterview} className="bg-green-500 hover:bg-green-600">
                          Hoàn thành phỏng vấn
                          <CheckCircle className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Interview Tips */}
          {isInterviewStarted && (
            <Card className="mt-6">
              <CardContent className="p-4">
                <h4 className="font-medium text-gray-900 mb-2">Lời khuyên cho phỏng vấn:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Nhìn thẳng vào camera khi trả lời</li>
                  <li>• Trả lời rõ ràng và chi tiết với ví dụ cụ thể</li>
                  <li>• Thể hiện sự nhiệt huyết và mong muốn học hỏi</li>
                  <li>• Hãy tự nhiên và thoải mái</li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
