import { InlineMath } from 'react-katex';

export const renderWithMath = (input: string, mathClass = 'text-lg') => {
	const parts = input.split(/(\$[^$]*\$)/g);
	return parts.map((part, index) => {
		if (part.startsWith('$') && part.endsWith('$')) {
			return (
				<span key={index} className={mathClass}>
					<InlineMath math={part.slice(1, -1)} />
				</span>
			);
		}
		return <span className='leading-10' key={index} dangerouslySetInnerHTML={{ __html: part }} />;
	});
};
