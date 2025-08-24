import { BlockMath, InlineMath } from "react-katex";

/**
 * Renders math in text.
 * @param text - The text to render.
 * @param textClass - The class to apply to the text.
 * @returns The rendered text.
 */
export const renderWithMath = (text: string, textClass = "text-md") => {
	return text.split(/(\$\$.*?\$\$|\$.*?\$)/g).map((part, idx) => {
		if (part.startsWith("$$") && part.endsWith("$$")) {
			return (
				<span key={idx} className={textClass}>
					<BlockMath math={part.slice(2, -2)} />
				</span>
			)
		}
		if (part.startsWith("$") && part.endsWith("$")) {
			return (
				<span key={idx} className={textClass}>
					<InlineMath math={part.slice(1, -1)} />
				</span>
			)
		}
		return (
			<span key={idx} className={textClass}>
				{part}
			</span>
		)
	})
}