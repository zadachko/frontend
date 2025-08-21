import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LoadingStateProps {
    message?: string;
}

export const LoadingState = ({ message = "Зареждане..." }: LoadingStateProps) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-emerald-600" />
            <p className="text-gray-600">{message}</p>
        </div>
    </div>
);

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

export const ErrorState = ({
    title = "Грешка",
    message = "Възникна грешка. Моля, опитайте отново.",
    onRetry
}: ErrorStateProps) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
            <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <h3 className="font-semibold text-red-800">{title}</h3>
                    </div>
                    <p className="text-red-700 mb-4">{message}</p>
                    {onRetry && (
                        <Button
                            onClick={onRetry}
                            className="w-full"
                            variant="outline"
                        >
                            Опитай отново
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
);

interface EmptyStateProps {
    icon?: React.ReactNode;
    message?: string;
}

export const EmptyState = ({
    icon = <AlertCircle className="h-8 w-8" />,
    message = "Няма налични данни."
}: EmptyStateProps) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
            <div className="mx-auto mb-4 text-gray-400">
                {icon}
            </div>
            <p className="text-gray-600">{message}</p>
        </div>
    </div>
);
