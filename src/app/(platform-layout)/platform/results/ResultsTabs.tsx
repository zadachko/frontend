"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TestTube, GraduationCap } from "lucide-react"
import type { TestResult } from "@/types"
import { ResultRow } from "./ResultRow"
import { EmptyState } from "./EmptyState"

interface ResultsTabsProps {
    results: TestResult[]
    activeTab: string
    onTabChange: (value: string) => void
}

export const ResultsTabs = ({ results, activeTab, onTabChange }: ResultsTabsProps) => {
    const filteredResults = results.filter((result) => {
        if (activeTab === "all") return true
        if (activeTab === "tests") return result.type === "test"
        if (activeTab === "exams") return result.type === "exam"
        return true
    })

    return (
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="all" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Всички ({results.length})
                </TabsTrigger>
                <TabsTrigger value="tests" className="flex items-center gap-2">
                    <TestTube className="w-4 h-4" />
                    Тестове ({results.filter((r) => r.type === "test").length})
                </TabsTrigger>
                <TabsTrigger value="exams" className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Матури ({results.filter((r) => r.type === "exam").length})
                </TabsTrigger>
            </TabsList>

            <div className="mt-6">
                <TabsContent value="all" className="mt-0">
                    {filteredResults.length > 0 ? (
                        <div className="space-y-3">
                            {filteredResults.map((result) => (
                                <ResultRow key={result.id} result={result} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState type="all" />
                    )}
                </TabsContent>

                <TabsContent value="tests" className="mt-0">
                    {filteredResults.length > 0 ? (
                        <div className="space-y-3">
                            {filteredResults.map((result) => (
                                <ResultRow key={result.id} result={result} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState type="tests" />
                    )}
                </TabsContent>

                <TabsContent value="exams" className="mt-0">
                    {filteredResults.length > 0 ? (
                        <div className="space-y-3">
                            {filteredResults.map((result) => (
                                <ResultRow key={result.id} result={result} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState type="exams" />
                    )}
                </TabsContent>
            </div>
        </Tabs>
    )
}
