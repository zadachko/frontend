import { motion } from 'framer-motion'
import React from 'react'
import { Heart, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
interface ProblemsCategoryProps {
    category: {
        name: string;
        icon: React.ElementType;
        count: number;
        description: string;
        difficulty: string;
    };
    favorites: string[];
    toggleFavorite: (name: string) => void;
}


const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

const ProblemsCategory = ({ category, favorites, toggleFavorite }: ProblemsCategoryProps) => {
    const router = useRouter();
    const handleProblemCategoryClick = (categoryName: string) => {
        console.log(categoryName);
        router.push(`/platform/problems/1`)
    }
    return (
        <motion.div
            onClick={() => handleProblemCategoryClick(category.name)}
            key={category.name}
            variants={item}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`bg-white p-6 rounded-lg border transition-colors group ${favorites.includes(category.name)
                ? 'border-red-100 hover:border-red-200'
                : 'border-gray-100 hover:border-[#6F58C9] cursor-pointer'
                }`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <motion.div
                        className={`p-2 rounded-lg transition-colors ${favorites.includes(category.name)
                            ? 'bg-red-50 group-hover:bg-red-100'
                            : 'bg-[#6F58C9]/10 group-hover:bg-[#6F58C9]/20'
                            }`}
                        animate={{
                            scale: favorites.includes(category.name) ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        <category.icon className={`w-6 h-6 ${favorites.includes(category.name)
                            ? 'text-red-500'
                            : 'text-[#6F58C9]'
                            }`} />
                    </motion.div>
                    <div>
                        <h3 className={`font-medium transition-colors ${favorites.includes(category.name)
                            ? 'text-gray-900 group-hover:text-red-600'
                            : 'text-gray-900 group-hover:text-[#6F58C9]'
                            }`}>{category.name}</h3>
                        <p className="text-sm text-gray-500">{category.count} задачи</p>
                    </div>
                </div>
                <motion.button
                    onClick={() => toggleFavorite(category.name)}
                    className={`p-2 rounded-lg transition-colors ${favorites.includes(category.name)
                        ? 'hover:bg-red-50'
                        : 'hover:bg-gray-50'
                        }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        animate={{
                            scale: favorites.includes(category.name) ? 1.2 : 1,
                            rotate: favorites.includes(category.name) ? 360 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <Heart className={`w-5 h-5 ${favorites.includes(category.name)
                            ? 'text-red-500 fill-red-500'
                            : 'text-gray-400'
                            }`} />
                    </motion.div>
                </motion.button>
            </div>
            <p className="text-sm text-gray-600 mb-4">{category.description}</p>
            <div className="flex items-center justify-between">
                <span className={`text-sm px-2 py-1 rounded-full`}></span>
                <motion.button
                    className={`flex items-center text-sm group-hover:gap-2 transition-all ${favorites.includes(category.name)
                        ? 'text-red-600'
                        : 'text-[#6F58C9]'
                        }`}
                    whileHover={{ x: 5 }}
                >
                    <span>Виж задачи</span>
                    <ArrowRight className="w-4 h-4" />
                </motion.button>
            </div>
        </motion.div>
    )
}

export default ProblemsCategory