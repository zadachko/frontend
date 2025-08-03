import Link from "next/link"

export function Logo() {
    return (
        <Link
            href="/platform"
            className="md:w-80 text-center text-xl sm:text-2xl font-bold text-white hover:text-[#f0eeff] transition-colors cursor-pointer"
        >
            Задачко
        </Link>
    )
}
