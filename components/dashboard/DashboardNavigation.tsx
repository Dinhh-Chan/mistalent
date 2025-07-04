import { Bot, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardNavigationProps {
  onLogout: () => void
  onGoHome?: () => void
  onBackToDashboard?: () => void
  showBackButton?: boolean
  showHomeButton?: boolean
  title?: string
}

export function DashboardNavigation({ 
  onLogout, 
  onGoHome, 
  onBackToDashboard,
  showBackButton = false,
  showHomeButton = false,
  title = "TechCorp AI"
}: DashboardNavigationProps) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Bot className="w-8 h-8 text-blue-500 mr-2" />
            <span 
              className="text-xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors" 
              onClick={onBackToDashboard}
            >
              {title}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {showBackButton && onBackToDashboard && (
              <Button variant="ghost" onClick={onBackToDashboard}>
                ← Quay lại Dashboard
              </Button>
            )}
            {showHomeButton && onGoHome && (
              <Button variant="ghost" size="sm" onClick={onGoHome}>
                Về trang chủ
              </Button>
            )}
            <span className="text-sm text-gray-600">Xin chào, Admin</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 