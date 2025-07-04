"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowLeft, Clock, CheckCircle, Code, User, Timer, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Application } from "@/types/dashboard"
import { DashboardNavigation } from "./DashboardNavigation"

interface TestInterfaceProps {
  application: Application
  onBack: () => void
  onComplete: (personalityScore: number, codeScore: number) => void
  onLogout?: () => void
  onGoHome?: () => void
}

interface PersonalityQuestion {
  id: number
  question: string
  options: string[]
  scores: number[]
}

interface CodeQuestion {
  id: number
  question: string
  codeTemplate: string
  expectedOutput: string
  testCases: { input: string; output: string }[]
}

const personalityQuestions: PersonalityQuestion[] = [
  {
    id: 1,
    question: "Bạn thường tiếp cận vấn đề như thế nào?",
    options: ["Phân tích logic và có hệ thống", "Sáng tạo và linh hoạt", "Kết hợp cả hai", "Theo trực giác"],
    scores: [10, 8, 9, 7],
  },
  {
    id: 2,
    question: "Trong nhóm, bạn thường đảm nhận vai trò nào?",
    options: ["Người dẫn dắt", "Người hỗ trợ", "Người sáng tạo ý tưởng", "Người thực thi"],
    scores: [9, 7, 8, 6],
  },
  {
    id: 3,
    question: "Khi gặp khó khăn trong công việc, bạn sẽ?",
    options: [
      "Tìm hiểu và nghiên cứu kỹ",
      "Hỏi ý kiến đồng nghiệp",
      "Thử nhiều cách khác nhau",
      "Tập trung vào giải pháp nhanh nhất",
    ],
    scores: [10, 8, 9, 6],
  },
  {
    id: 4,
    question: "Bạn thích làm việc trong môi trường nào?",
    options: ["Yên tĩnh, tập trung", "Năng động, nhiều tương tác", "Linh hoạt, thay đổi", "Có cấu trúc rõ ràng"],
    scores: [8, 9, 7, 10],
  },
  {
    id: 5,
    question: "Điều gì thúc đẩy bạn làm việc hiệu quả nhất?",
    options: ["Thử thách kỹ thuật", "Làm việc nhóm", "Sự công nhận", "Mục tiêu rõ ràng"],
    scores: [10, 8, 7, 9],
  },
]

const codeQuestions: Record<string, CodeQuestion[]> = {
  "Frontend Developer": [
    {
      id: 1,
      question: "Viết hàm JavaScript để đảo ngược chuỗi",
      codeTemplate: `function reverseString(str) {\n  // Your code here\n}`,
      expectedOutput: "hello -> olleh",
      testCases: [
        { input: '"hello"', output: '"olleh"' },
        { input: '"world"', output: '"dlrow"' },
      ],
    },
    {
      id: 2,
      question: "Tạo component React hiển thị danh sách",
      codeTemplate: `function ListComponent({ items }) {\n  // Your code here\n}`,
      expectedOutput: "Renders unordered list",
      testCases: [{ input: '["item1", "item2"]', output: "<ul><li>item1</li><li>item2</li></ul>" }],
    },
    {
      id: 3,
      question: "Viết CSS cho button responsive",
      codeTemplate: `.button {\n  /* Your code here */\n}`,
      expectedOutput: "Responsive button styles",
      testCases: [
        { input: "mobile", output: "width: 100%" },
        { input: "desktop", output: "width: 200px" },
      ],
    },
    {
      id: 4,
      question: "Tối ưu hóa performance React component",
      codeTemplate: `function HeavyComponent() {\n  // Your code here\n}`,
      expectedOutput: "Optimized component",
      testCases: [{ input: "render count", output: "1" }],
    },
    {
      id: 5,
      question: "Xử lý form submission trong React",
      codeTemplate: `function FormComponent() {\n  // Your code here\n}`,
      expectedOutput: "Handle form submission",
      testCases: [{ input: "form data", output: "submitted" }],
    },
  ],
}

export function TestInterface({ application, onBack, onComplete, onLogout, onGoHome }: TestInterfaceProps) {
  const [testType, setTestType] = useState<"personality" | "code">("code") // Mặc định là code test
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [personalityAnswers, setPersonalityAnswers] = useState<number[]>([])
  const [codeAnswers, setCodeAnswers] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState(1800) // 30 phút cho cả 2 bài
  const [showResults, setShowResults] = useState(false)
  const [codeInput, setCodeInput] = useState("")
  const [showTestSelection, setShowTestSelection] = useState(true)
  const [completedTests, setCompletedTests] = useState<("personality" | "code")[]>([])

  const codeQues = codeQuestions[application.position] || codeQuestions["Frontend Developer"]
  const totalPersonalityQuestions = personalityQuestions.length
  const totalCodeQuestions = codeQues.length

  const handleCodeAnswer = useCallback(() => {
    const newAnswers = [...codeAnswers]
    newAnswers[currentQuestion] = codeInput
    setCodeAnswers(newAnswers)
    setCodeInput("")
  }, [codeAnswers, currentQuestion, codeInput])

  const handleSubmit = useCallback(() => {
    if (testType === "code") handleCodeAnswer()

    // Thêm test hiện tại vào danh sách đã hoàn thành
    const newCompletedTests = [...completedTests]
    if (!newCompletedTests.includes(testType)) {
      newCompletedTests.push(testType)
      setCompletedTests(newCompletedTests)
    }

    // Kiểm tra xem đã làm đủ 2 bài test chưa
    if (newCompletedTests.length < 2) {
      // Chuyển sang bài test còn lại
      const nextTest = testType === "code" ? "personality" : "code"
      setTestType(nextTest)
      setCurrentQuestion(0)
      setTimeLeft(nextTest === "personality" ? 900 : 1800)
      return
    }

    // Nếu đã làm đủ 2 bài thì hiển thị kết quả
    const personalityScore = personalityAnswers.reduce(
      (sum, answer, index) => sum + (personalityQuestions[index]?.scores[answer] || 0),
      0,
    )

    const codeScore = codeAnswers.reduce((sum, answer) => {
      const isCorrect = answer.length > 0
      return sum + (isCorrect ? 20 : 0)
    }, 0)

    onComplete(personalityScore, codeScore)
    setShowResults(true)
  }, [testType, personalityAnswers, codeAnswers, completedTests, onComplete, handleCodeAnswer])

  useEffect(() => {
    if (!showTestSelection) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [handleSubmit, showTestSelection])

  const handlePersonalityAnswer = (answerIndex: number) => {
    const newAnswers = [...personalityAnswers]
    newAnswers[currentQuestion] = answerIndex
    setPersonalityAnswers(newAnswers)
  }

  const handleNext = () => {
    if (testType === "personality" && currentQuestion < totalPersonalityQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (testType === "code" && currentQuestion < totalCodeQuestions - 1) {
      handleCodeAnswer()
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      if (testType === "code") handleCodeAnswer()
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const startTest = (type: "personality" | "code") => {
    setTestType(type)
    setShowTestSelection(false)
    setCurrentQuestion(0)
    setTimeLeft(type === "personality" ? 900 : 1800) // 15 phút cho personality, 30 phút cho code
  }

  if (showTestSelection) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNavigation 
          onLogout={onLogout || (() => {})}
          onGoHome={onGoHome}
          showBackButton={true}
          onBackToDashboard={onBack}
          title={`Bài Test - ${application.position}`}
        />
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Bài Test Tuyển Dụng</h1>
              <p className="text-lg text-gray-600 mb-4">
                Vị trí: <span className="font-semibold text-blue-600">{application.position}</span> tại{" "}
                <span className="font-semibold">{application.company}</span>
              </p>
              <div className="flex justify-center">
                <Badge variant="outline" className="text-sm px-4 py-2 bg-blue-50 text-blue-700 border-blue-200">
                  Bạn cần hoàn thành cả 2 bài test để nộp bài
                </Badge>
              </div>
            </div>

            {/* Test Selection Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Code Test Card */}
              <Card className="border-2 border-blue-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-3 bg-blue-500 rounded-lg">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">Bài Test Code</CardTitle>
                      <p className="text-sm text-gray-600">Kiểm tra kỹ năng lập trình</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Timer className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">30 phút</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium">5 câu hỏi</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Nội dung bài test:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Thuật toán và cấu trúc dữ liệu</li>
                      <li>• Kỹ năng lập trình {application.position.includes("Frontend") ? "Frontend" : "Backend"}</li>
                      <li>• Tối ưu hóa performance</li>
                      <li>• Best practices</li>
                    </ul>
                  </div>

                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3"
                    onClick={() => startTest("code")}
                  >
                    <Code className="w-4 h-4 mr-2" />
                    Bắt đầu bài test Code
                  </Button>
                </CardContent>
              </Card>

              {/* Personality Test Card */}
              <Card className="border-2 border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-3 bg-gray-500 rounded-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">Bài Test Tính Cách</CardTitle>
                      <p className="text-sm text-gray-600">Đánh giá phong cách làm việc</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Timer className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">15 phút</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">5 câu hỏi</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Nội dung đánh giá:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Phong cách giải quyết vấn đề</li>
                      <li>• Khả năng làm việc nhóm</li>
                      <li>• Tư duy logic và sáng tạo</li>
                      <li>• Khả năng thích ứng</li>
                    </ul>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 bg-transparent"
                    onClick={() => startTest("personality")}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Bắt đầu bài test Tính cách
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Instructions */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Lưu ý quan trọng
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
                  <div>
                    <p className="mb-2">• Bạn có thể làm cả 2 bài test hoặc chỉ 1 bài</p>
                    <p className="mb-2">• Khuyến nghị làm bài test Code trước</p>
                    <p>• Không thể tạm dừng khi đã bắt đầu</p>
                  </div>
                  <div>
                    <p className="mb-2">• Đảm bảo kết nối internet ổn định</p>
                    <p className="mb-2">• Chuẩn bị môi trường yên tĩnh</p>
                    <p>• Đọc kỹ đề bài trước khi trả lời</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Back Button */}
            <div className="text-center mt-8">
              <Button variant="outline" onClick={onBack} className="px-6 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Navbar chuyển đổi loại bài test và header
  const renderTestNavbar = () => (
    <div className="flex flex-col gap-2 mb-8">
      <div className="flex justify-center gap-4">
        <button
          className={`px-6 py-2 rounded-t-lg font-semibold border-b-2 transition-colors duration-150 ${
            testType === "personality"
              ? "border-purple-500 text-purple-600 bg-white"
              : "border-transparent text-gray-500 bg-gray-100 hover:text-purple-500"
          }`}
          onClick={() => setTestType("personality")}
        >
          Tính cách
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg font-semibold border-b-2 transition-colors duration-150 ${
            testType === "code"
              ? "border-blue-500 text-blue-600 bg-white"
              : "border-transparent text-gray-500 bg-gray-100 hover:text-blue-500"
          }`}
          onClick={() => setTestType("code")}
        >
          Code
        </button>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-1">
          {testType === "personality" ? "Bài test tính cách" : "Bài test code"}
        </h2>
        <p className="text-gray-500">
          {testType === "personality"
            ? "Đánh giá phong cách làm việc, vai trò nhóm, tư duy cá nhân của bạn."
            : "Kiểm tra kỹ năng lập trình, giải quyết vấn đề và tư duy logic của bạn."}
        </p>
      </div>
    </div>
  )

  if (showResults) {
    const personalityScore = personalityAnswers.reduce(
      (sum, answer, index) => sum + (personalityQuestions[index]?.scores[answer] || 0),
      0,
    )

    const codeScore = codeAnswers.reduce((sum, answer) => {
      const isCorrect = answer.length > 0
      return sum + (isCorrect ? 20 : 0)
    }, 0)

    // Mock AI analysis
    const getPersonalityAnalysis = (score: number) => {
      if (score >= 40)
        return "Bạn thể hiện tư duy logic mạnh mẽ và khả năng làm việc nhóm tốt. Phong cách làm việc có hệ thống và chú trọng đến chi tiết."
      if (score >= 30)
        return "Bạn có cân bằng tốt giữa tư duy logic và sáng tạo. Thích ứng linh hoạt với môi trường làm việc."
      return "Bạn có xu hướng làm việc theo trực giác và sáng tạo. Cần phát triển thêm kỹ năng làm việc có hệ thống."
    }

    const getCodeAnalysis = (score: number) => {
      if (score >= 80)
        return "Kỹ năng lập trình xuất sắc với khả năng giải quyết vấn đề phức tạp. Hiểu rõ về best practices và tối ưu hóa."
      if (score >= 60)
        return "Kỹ năng lập trình tốt với nền tảng vững chắc. Có thể cải thiện thêm về thuật toán và tối ưu hóa."
      if (score >= 40) return "Kỹ năng lập trình cơ bản ổn định. Cần học hỏi thêm về cấu trúc dữ liệu và thuật toán."
      return "Cần củng cố thêm kiến thức lập trình cơ bản và thực hành nhiều hơn."
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardNavigation 
          onLogout={onLogout || (() => {})}
          onGoHome={onGoHome}
          showBackButton={true}
          onBackToDashboard={onBack}
          title={`Kết quả Test - ${application.position}`}
        />
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <CheckCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2 text-gray-900">Hoàn thành bài test thành công!</h2>
                  <p className="text-gray-600">Cảm ơn bạn đã dành thời gian hoàn thành bài test của chúng tôi</p>
                </div>

                {/* AI Analysis */}
                <div className="space-y-6 mb-8">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Phân tích tính cách (Điểm: {personalityScore}/50)
                    </h3>
                    <p className="text-blue-800 text-sm leading-relaxed">{getPersonalityAnalysis(personalityScore)}</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      Phân tích kỹ năng code (Điểm: {codeScore}/100)
                    </h3>
                    <p className="text-gray-800 text-sm leading-relaxed">{getCodeAnalysis(codeScore)}</p>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Bước tiếp theo
                  </h3>
                  <div className="text-yellow-700 text-sm space-y-2">
                    <p>• Kết quả bài test của bạn đã được gửi đến nhà tuyển dụng</p>
                    <p>• Đội ngũ HR sẽ xem xét và phản hồi trong vòng 3-5 ngày làm việc</p>
                    <p>• Bạn sẽ nhận được email thông báo về kết quả và lịch phỏng vấn (nếu được chọn)</p>
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

  const progress =
    testType === "personality"
      ? ((currentQuestion + 1) / totalPersonalityQuestions) * 100
      : ((currentQuestion + 1) / totalCodeQuestions) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation 
        onLogout={onLogout || (() => {})}
        onGoHome={onGoHome}
        showBackButton={true}
        onBackToDashboard={onBack}
        title={`${testType === "personality" ? "Test Tính cách" : "Test Code"} - ${application.position}`}
      />
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {renderTestNavbar()}

          <div className="flex justify-between items-center mb-6">
            <Button variant="outline" onClick={() => setShowTestSelection(true)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Chọn lại bài test
            </Button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow">
                <Clock className="w-4 h-4 text-red-500" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
              <div className="text-sm text-gray-600">
                Câu {currentQuestion + 1}/{testType === "personality" ? totalPersonalityQuestions : totalCodeQuestions}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <div className="text-sm text-gray-600 mt-2">Tiến độ: {Math.round(progress)}%</div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {testType === "personality" ? "Bài test tính cách" : "Bài test code"} - Câu hỏi {currentQuestion + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {testType === "personality" ? (
                <>
                  <div className="text-lg font-medium">{personalityQuestions[currentQuestion].question}</div>
                  <div className="space-y-3">
                    {personalityQuestions[currentQuestion].options.map((option, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          personalityAnswers[currentQuestion] === index
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handlePersonalityAnswer(index)}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-5 h-5 rounded-full border-2 mr-3 ${
                              personalityAnswers[currentQuestion] === index
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {personalityAnswers[currentQuestion] === index && (
                              <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-lg font-medium">{codeQues[currentQuestion].question}</div>
                  <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <pre>{codeQues[currentQuestion].codeTemplate}</pre>
                    </div>
                    <div>
                      <p className="font-medium">Kết quả mong muốn:</p>
                      <p>{codeQues[currentQuestion].expectedOutput}</p>
                    </div>
                    <textarea
                      className="w-full h-40 p-4 border rounded-lg"
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                      placeholder="Viết code của bạn tại đây..."
                    />
                  </div>
                </>
              )}

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                  Câu trước
                </Button>
                <div className="flex space-x-3">
                  {completedTests.length < 1 ? (
                    testType === "personality" && currentQuestion < totalPersonalityQuestions - 1 ? (
                      <Button onClick={handleNext}>Câu tiếp</Button>
                    ) : testType === "code" && currentQuestion < totalCodeQuestions - 1 ? (
                      <Button onClick={handleNext}>Câu tiếp</Button>
                    ) : (
                      <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600">
                        Hoàn thành bài {testType === "code" ? "Code" : "Tính cách"}
                      </Button>
                    )
                  ) : testType === "personality" && currentQuestion < totalPersonalityQuestions - 1 ? (
                    <Button onClick={handleNext}>Câu tiếp</Button>
                  ) : testType === "code" && currentQuestion < totalCodeQuestions - 1 ? (
                    <Button onClick={handleNext}>Câu tiếp</Button>
                  ) : (
                    <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600">
                      Nộp bài
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
