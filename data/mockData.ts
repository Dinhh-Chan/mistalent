import { Job, Application, CodingQuestion, PersonalityQuestion, InterviewQuestion } from "@/types/dashboard";

export const availableJobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Hà Nội",
    salary: "25-35 triệu",
    type: "Full-time",
    experience: "3-5 năm",
    posted: "2 ngày trước",
    description: "Chúng tôi đang tìm kiếm một Senior Frontend Developer có kinh nghiệm với React và TypeScript.",
    requirements: [
      "3+ năm kinh nghiệm với React/Vue.js",
      "Thành thạo TypeScript, HTML5, CSS3",
      "Kinh nghiệm với Redux/Vuex",
      "Hiểu biết về responsive design",
      "Kinh nghiệm với Git, CI/CD"
    ],
    benefits: [
      "Lương cạnh tranh 25-35 triệu",
      "Thưởng hiệu suất hàng quý",
      "Bảo hiểm sức khỏe cao cấp",
      "Làm việc hybrid",
      "Đào tạo và phát triển nghề nghiệp"
    ],
    skills: ["React", "TypeScript", "Redux", "CSS3", "Git"],
    applications: 45,
    status: "open"
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
      "Kinh nghiệm với Docker, AWS"
    ],
    benefits: [
      "Lương cạnh tranh 20-30 triệu",
      "Thưởng dự án",
      "Bảo hiểm đầy đủ",
      "Remote-friendly",
      "Cơ hội thăng tiến"
    ],
    skills: ["Node.js", "Python", "MongoDB", "Docker", "AWS"],
    applications: 32,
    status: "open"
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "TechCorp",
    location: "Remote",
    salary: "30-40 triệu",
    type: "Full-time",
    experience: "3-6 năm",
    posted: "3 ngày trước",
    description: "Xây dựng và duy trì hạ tầng cloud, CI/CD pipeline cho các dự án lớn.",
    requirements: [
      "3+ năm kinh nghiệm DevOps",
      "Thành thạo AWS/Azure/GCP",
      "Kinh nghiệm với Docker, Kubernetes",
      "Hiểu biết về CI/CD pipeline",
      "Kinh nghiệm với Infrastructure as Code"
    ],
    benefits: [
      "Lương 30-40 triệu",
      "Làm việc remote 100%",
      "Bảo hiểm cao cấp",
      "Budget học tập",
      "Flexible working hours"
    ],
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    applications: 28,
    status: "open"
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "TechCorp",
    location: "Đà Nẵng",
    salary: "18-25 triệu",
    type: "Full-time",
    experience: "2-4 năm",
    posted: "5 ngày trước",
    description: "Thiết kế giao diện người dùng cho các ứng dụng web và mobile hiện đại.",
    requirements: [
      "2+ năm kinh nghiệm UI/UX Design",
      "Thành thạo Figma, Adobe XD",
      "Kinh nghiệm với User Research",
      "Hiểu biết về Design System",
      "Kỹ năng Prototyping tốt"
    ],
    benefits: [
      "Lương 18-25 triệu",
      "Môi trường sáng tạo",
      "Bảo hiểm đầy đủ",
      "Team building thường xuyên",
      "Cơ hội học hỏi công nghệ mới"
    ],
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
    applications: 67,
    status: "hot"
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "TechCorp",
    location: "Hà Nội",
    salary: "35-45 triệu",
    type: "Full-time",
    experience: "4-7 năm",
    posted: "1 tuần trước",
    description: "Phân tích dữ liệu lớn và xây dựng mô hình machine learning cho business intelligence.",
    requirements: [
      "4+ năm kinh nghiệm Data Science",
      "Thành thạo Python, R",
      "Kinh nghiệm với Machine Learning",
      "Hiểu biết về Statistics, SQL",
      "Kinh nghiệm với Big Data tools"
    ],
    benefits: [
      "Lương 35-45 triệu",
      "Bonus theo hiệu suất",
      "Bảo hiểm cao cấp",
      "Budget conference/training",
      "Cơ hội research"
    ],
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Power BI"],
    applications: 23,
    status: "urgent"
  }
];

export const applications: Application[] = [
  {
    id: 1,
    position: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Hà Nội",
    salary: "25-35 triệu",
    appliedDate: "2024-01-10",
    status: "hired",
    stages: {
      cv: { status: "passed", date: "2024-01-11", feedback: "CV phù hợp với yêu cầu công việc" },
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
      },
      final: {
        status: "hired",
        date: "2024-01-16",
        feedback: "Chúc mừng! Bạn đã được tuyển dụng cho vị trí Senior Frontend Developer",
      },
    },
  },
  {
    id: 2,
    position: "Backend Developer",
    company: "TechCorp",
    location: "TP.HCM",
    salary: "20-30 triệu",
    appliedDate: "2024-01-05",
    status: "rejected",
    stages: {
      cv: { status: "passed", date: "2024-01-06", feedback: "CV đạt yêu cầu cơ bản" },
      test: {
        status: "failed",
        date: "2024-01-08",
        scores: { code: 65, personality: 78 },
        feedback: "Kỹ năng lập trình cần cải thiện thêm",
      },
      interview: { status: "not-reached", date: null, feedback: null },
      final: {
        status: "rejected",
        date: "2024-01-08",
        feedback: "Rất tiếc, bạn chưa đạt yêu cầu cho vị trí này lần này",
      },
    },
  },
  {
    id: 3,
    position: "Full Stack Developer",
    company: "TechCorp",
    location: "Đà Nẵng",
    salary: "18-28 triệu",
    appliedDate: "2024-01-12",
    status: "in-progress",
    stages: {
      cv: { status: "passed", date: "2024-01-13", feedback: "CV ấn tượng với nhiều dự án thực tế" },
      test: {
        status: "passed",
        date: "2024-01-15",
        scores: { code: 78, personality: 85 },
        feedback: "Kết quả test khá tốt",
      },
      interview: {
        status: "scheduled",
        date: "2024-01-20",
        feedback: "Phỏng vấn được lên lịch vào 14:00 ngày 20/01/2024",
      },
      final: { status: "pending", date: null, feedback: null },
    },
  },
  {
    id: 4,
    position: "DevOps Engineer",
    company: "TechCorp",
    location: "Remote",
    salary: "30-40 triệu",
    appliedDate: "2024-01-18",
    status: "in-progress",
    stages: {
      cv: { status: "passed", date: "2024-01-19", feedback: "CV phù hợp với yêu cầu DevOps" },
      test: {
        status: "pending",
        date: null,
        feedback: "Bạn cần hoàn thành bài test kỹ năng để tiếp tục",
      },
      interview: { status: "not-reached", date: null, feedback: null },
      final: { status: "pending", date: null, feedback: null },
    },
  },
  {
    id: 5,
    position: "UI/UX Designer",
    company: "TechCorp",
    location: "Đà Nẵng",
    salary: "18-25 triệu",
    appliedDate: "2024-01-16",
    status: "in-progress",
    stages: {
      cv: { status: "passed", date: "2024-01-17", feedback: "CV thiết kế rất ấn tượng" },
      test: {
        status: "passed",
        date: "2024-01-19",
        scores: { code: 82, personality: 88 },
        feedback: "Kỹ năng thiết kế tốt, tính cách phù hợp",
      },
      interview: {
        status: "pending",
        date: null,
        feedback: "Bạn đã qua bài test, hãy thực hiện phỏng vấn để hoàn tất",
      },
      final: { status: "pending", date: null, feedback: null },
    },
  },
];

export const codingQuestions: CodingQuestion[] = [
  {
    id: 1,
    title: "Bài tập 1: Đảo ngược chuỗi",
    description: "Viết hàm đảo ngược một chuỗi ký tự. Ví dụ: 'hello' -> 'olleh'",
    code: `function reverseString(str) {
  // Viết code của bạn ở đây
}`,
    testCases: [
      { input: "'hello'", expected: "'olleh'" },
      { input: "'world'", expected: "'dlrow'" },
      { input: "'12345'", expected: "'54321'" }
    ],
    timeLimit: 15
  },
  {
    id: 2,
    title: "Bài tập 2: Tìm số Fibonacci",
    description: "Viết hàm tìm số Fibonacci thứ n. F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)",
    code: `function fibonacci(n) {
  // Viết code của bạn ở đây
}`,
    testCases: [
      { input: "5", expected: "5" },
      { input: "10", expected: "55" },
      { input: "0", expected: "0" }
    ],
    timeLimit: 20
  },
  {
    id: 3,
    title: "Bài tập 3: Kiểm tra số nguyên tố",
    description: "Viết hàm kiểm tra một số có phải là số nguyên tố hay không",
    code: `function isPrime(n) {
  // Viết code của bạn ở đây
}`,
    testCases: [
      { input: "7", expected: "true" },
      { input: "10", expected: "false" },
      { input: "2", expected: "true" }
    ],
    timeLimit: 15
  }
];

export const personalityQuestions: PersonalityQuestion[] = [
  {
    id: 1,
    question: "Bạn thích làm việc một mình hay trong nhóm?",
    options: [
      { value: "A", text: "Hoàn toàn một mình" },
      { value: "B", text: "Chủ yếu một mình, đôi khi nhóm" },
      { value: "C", text: "Cân bằng giữa một mình và nhóm" },
      { value: "D", text: "Chủ yếu nhóm, đôi khi một mình" },
      { value: "E", text: "Hoàn toàn trong nhóm" }
    ]
  },
  {
    id: 2,
    question: "Khi gặp vấn đề khó khăn, bạn thường:",
    options: [
      { value: "A", text: "Tự tìm hiểu và giải quyết" },
      { value: "B", text: "Tìm kiếm thông tin trước khi hỏi" },
      { value: "C", text: "Thảo luận với đồng nghiệp" },
      { value: "D", text: "Hỏi người có kinh nghiệm" },
      { value: "E", text: "Tổ chức họp nhóm để giải quyết" }
    ]
  },
  {
    id: 3,
    question: "Bạn đánh giá mình là người:",
    options: [
      { value: "A", text: "Rất chi tiết và cẩn thận" },
      { value: "B", text: "Có óc sáng tạo cao" },
      { value: "C", text: "Lãnh đạo tốt" },
      { value: "D", text: "Giao tiếp hiệu quả" },
      { value: "E", text: "Thích nghi nhanh" }
    ]
  },
  {
    id: 4,
    question: "Trong môi trường làm việc, bạn thích:",
    options: [
      { value: "A", text: "Có quy trình rõ ràng" },
      { value: "B", text: "Được tự do sáng tạo" },
      { value: "C", text: "Có cơ hội thăng tiến" },
      { value: "D", text: "Được học hỏi công nghệ mới" },
      { value: "E", text: "Có work-life balance tốt" }
    ]
  },
  {
    id: 5,
    question: "Khi deadline gấp, bạn sẽ:",
    options: [
      { value: "A", text: "Làm thêm giờ để hoàn thành" },
      { value: "B", text: "Tối ưu hóa quy trình làm việc" },
      { value: "C", text: "Phân chia công việc cho team" },
      { value: "D", text: "Thương lượng deadline mới" },
      { value: "E", text: "Tập trung vào phần quan trọng nhất" }
    ]
  }
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: 1,
    type: "introduction",
    question: "Hãy giới thiệu về bản thân và kinh nghiệm làm việc của bạn?",
    timeLimit: 120
  },
  {
    id: 2,
    type: "experience",
    question: "Bạn có thể chia sẻ về dự án ấn tượng nhất mà bạn đã tham gia?",
    timeLimit: 180
  },
  {
    id: 3,
    type: "technical",
    question: "Bạn giải thích thế nào về RESTful API và khi nào nên sử dụng?",
    timeLimit: 120
  },
  {
    id: 4,
    type: "problem-solving",
    question: "Nếu website của bạn bị chậm, bạn sẽ debug như thế nào?",
    timeLimit: 150
  },
  {
    id: 5,
    type: "teamwork",
    question: "Bạn đã từng xử lý xung đột trong team như thế nào?",
    timeLimit: 120
  },
  {
    id: 6,
    type: "motivation",
    question: "Tại sao bạn muốn làm việc tại TechCorp và vị trí này?",
    timeLimit: 90
  }
];

export const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions Inc",
    location: "Hà Nội",
    salary: "20-30 triệu VNĐ",
    type: "Toàn thời gian",
    experience: "2-3 năm",
    posted: "3 ngày trước",
    description: "Chúng tôi đang tìm kiếm một Frontend Developer có kinh nghiệm để tham gia vào đội ngũ phát triển sản phẩm của công ty. Bạn sẽ được làm việc với các công nghệ hiện đại như React, TypeScript và tham gia vào việc xây dựng các ứng dụng web có tính tương tác cao.",
    requirements: [
      "Có ít nhất 2 năm kinh nghiệm làm việc với React",
      "Thành thạo JavaScript/TypeScript",
      "Hiểu biết sâu về HTML, CSS và responsive design",
      "Có kinh nghiệm làm việc với REST API",
      "Có kiến thức về testing (Jest, React Testing Library)"
    ],
    benefits: [
      "Lương cạnh tranh theo năng lực",
      "Chế độ bảo hiểm đầy đủ",
      "13 tháng lương + thưởng theo hiệu quả công việc",
      "Môi trường làm việc chuyên nghiệp, năng động",
      "Cơ hội học hỏi và phát triển bản thân"
    ],
    skills: ["React", "TypeScript", "HTML/CSS", "Redux", "Git"],
    applications: 24,
    urgency: "hot"
  },
  {
    id: 2,
    title: "Backend Developer (Node.js)",
    company: "Fintech Vietnam",
    location: "TP. Hồ Chí Minh",
    salary: "25-35 triệu VNĐ",
    type: "Toàn thời gian",
    experience: "3-5 năm",
    posted: "1 tuần trước",
    description: "Fintech Vietnam đang tìm kiếm Backend Developer có kinh nghiệm với Node.js để phát triển các hệ thống tài chính. Bạn sẽ được tham gia vào việc xây dựng và duy trì các API, microservices và hệ thống xử lý thanh toán.",
    requirements: [
      "Có ít nhất 3 năm kinh nghiệm với Node.js",
      "Kinh nghiệm với các framework như Express, NestJS",
      "Hiểu biết về cơ sở dữ liệu SQL và NoSQL",
      "Kinh nghiệm với Docker, Kubernetes là một lợi thế",
      "Có kinh nghiệm làm việc trong lĩnh vực fintech là một lợi thế"
    ],
    benefits: [
      "Lương cạnh tranh + bonus dự án",
      "Chế độ bảo hiểm sức khỏe cao cấp",
      "Làm việc từ xa 2 ngày/tuần",
      "Cơ hội đi công tác nước ngoài",
      "Môi trường làm việc quốc tế"
    ],
    skills: ["Node.js", "Express", "MongoDB", "SQL", "Docker", "AWS"],
    applications: 18,
    urgency: "urgent"
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Creative Studio",
    location: "Đà Nẵng",
    salary: "15-25 triệu VNĐ",
    type: "Toàn thời gian",
    experience: "2+ năm",
    posted: "2 tuần trước",
    description: "Creative Studio cần tuyển UX/UI Designer có khả năng thiết kế giao diện người dùng hấp dẫn và trải nghiệm người dùng tốt. Bạn sẽ làm việc với đội ngũ sáng tạo để phát triển các sản phẩm số cho khách hàng trong và ngoài nước.",
    requirements: [
      "Có ít nhất 2 năm kinh nghiệm thiết kế UX/UI",
      "Thành thạo các công cụ thiết kế như Figma, Adobe XD",
      "Có portfolio thể hiện các dự án đã thực hiện",
      "Hiểu biết về quy trình thiết kế UX",
      "Có khả năng làm việc độc lập và theo nhóm"
    ],
    benefits: [
      "Môi trường làm việc sáng tạo",
      "Được trang bị MacBook và các công cụ thiết kế",
      "Thời gian làm việc linh hoạt",
      "Cơ hội tham gia các dự án quốc tế",
      "Đào tạo và phát triển kỹ năng chuyên môn"
    ],
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "Design Thinking"],
    applications: 12,
    urgency: "normal"
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "E-commerce Group",
    location: "Hà Nội",
    salary: "18-28 triệu VNĐ",
    type: "Toàn thời gian",
    experience: "1-3 năm",
    posted: "5 ngày trước",
    description: "E-commerce Group đang tìm kiếm Data Analyst để phân tích dữ liệu kinh doanh và hỗ trợ ra quyết định. Bạn sẽ làm việc với dữ liệu lớn từ nền tảng thương mại điện tử của công ty để tìm ra các insight và đề xuất cải thiện hiệu suất kinh doanh.",
    requirements: [
      "Có kinh nghiệm phân tích dữ liệu trong lĩnh vực thương mại điện tử",
      "Thành thạo SQL, Excel và các công cụ BI như Tableau, Power BI",
      "Có kinh nghiệm với Python hoặc R là một lợi thế",
      "Kỹ năng trình bày và truyền đạt thông tin tốt",
      "Tư duy phân tích và giải quyết vấn đề"
    ],
    benefits: [
      "Lương cạnh tranh theo năng lực",
      "Thưởng theo hiệu quả công việc",
      "Chế độ bảo hiểm đầy đủ",
      "Môi trường làm việc năng động",
      "Cơ hội thăng tiến nhanh"
    ],
    skills: ["SQL", "Tableau", "Excel", "Python", "Data Visualization"],
    applications: 9,
    urgency: "normal"
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Cloud Solutions",
    location: "TP. Hồ Chí Minh",
    salary: "30-45 triệu VNĐ",
    type: "Toàn thời gian",
    experience: "3-5 năm",
    posted: "2 ngày trước",
    description: "Cloud Solutions cần tuyển DevOps Engineer có kinh nghiệm để quản lý và tối ưu hóa hệ thống cloud. Bạn sẽ làm việc với các công nghệ container, CI/CD và cloud services để đảm bảo hệ thống hoạt động ổn định và hiệu quả.",
    requirements: [
      "Có ít nhất 3 năm kinh nghiệm trong vai trò DevOps",
      "Kinh nghiệm với AWS, Azure hoặc GCP",
      "Thành thạo Docker, Kubernetes",
      "Kinh nghiệm với các công cụ CI/CD như Jenkins, GitLab CI",
      "Hiểu biết về Infrastructure as Code (Terraform, CloudFormation)"
    ],
    benefits: [
      "Mức lương hấp dẫn theo năng lực",
      "Làm việc từ xa toàn thời gian",
      "Được trang bị máy tính và thiết bị làm việc",
      "Chế độ bảo hiểm sức khỏe cao cấp",
      "Cơ hội học hỏi và phát triển kỹ năng mới"
    ],
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux"],
    applications: 7,
    urgency: "urgent"
  }
] 