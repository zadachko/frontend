import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type ControlsProps = {
    atStart: boolean
    atEnd: boolean
    prev: () => void
    next: () => void
}

const Controls = ({ atStart, atEnd, prev, next }: ControlsProps) => {
    return (
        <div className="border-t bg-white p-3 md:p-4 flex-shrink-0">
            <div className="mx-2 md:mx-4 flex items-center justify-between gap-2 md:gap-4">
                <Button
                    variant="outline"
                    onClick={prev}
                    disabled={atStart}
                    className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-4 py-1 md:py-2 bg-transparent"
                    size="sm"
                >
                    <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Предишна</span>
                    <span className="sm:hidden">Пред.</span>
                </Button>
                <div className="text-xs text-gray-500 text-center">
                    <span className="hidden md:inline">Навигирай със стрелките ← →</span>
                    <span className="md:hidden">← →</span>
                </div>
                <Button
                    onClick={next}
                    disabled={atEnd}
                    className="gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-4 py-1 md:py-2"
                    size="sm"
                >
                    <span className="hidden sm:inline">Следваща</span>
                    <span className="sm:hidden">След.</span>
                    <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
            </div>
        </div>
    )
}

export default Controls;