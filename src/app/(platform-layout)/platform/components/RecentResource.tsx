import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TestTube, BookOpen } from 'lucide-react'
import React from 'react'
type Activity = {
    id: number
    type: string
    title: string
    status: string
    statusType: string
    date: string
    action: string
}
const RecentResource = ({ activity }: { activity: Activity }) => {

    const getStatusColor = (type: string) => {
        switch (type) {
            case "success":
                return "bg-green-100 text-green-800 hover:bg-green-200"
            case "warning":
                return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            case "partial":
                return "bg-blue-100 text-blue-800 hover:bg-blue-200"
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
    }

    return (
        <Card
            key={activity.id}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md"
        >
            <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${activity.type === "test" ? "bg-orange-100" : "bg-blue-100"}`}>
                        {activity.type === "test" ? (
                            <TestTube
                                className={`w-5 h-5 ${activity.type === "test" ? "text-orange-600" : "text-blue-600"}`}
                            />
                        ) : (
                            <BookOpen
                                className={`w-5 h-5 ${activity.type === "test" ? "text-orange-600" : "text-blue-600"}`}
                            />
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-gray-900 text-sm leading-tight">{activity.title}</h3>
                            <Badge
                                className={`text-xs px-2 py-0.5 ${activity.type === "test" ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}
                            >
                                {activity.type === "test" ? "Test" : "Task"}
                            </Badge>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(activity.statusType)} border-0`}>
                            {activity.status}
                        </Badge>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{activity.date}</span>
                    <Button size="sm" className="bg-[#6F58C9] hover:bg-[#5A4BA3] text-white text-xs px-3 py-1 h-7">
                        {activity.action}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default RecentResource