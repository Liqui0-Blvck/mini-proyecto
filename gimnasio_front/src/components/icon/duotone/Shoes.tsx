import React, { SVGProps } from 'react';

const SvgShoes = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path
					d='M4.354 3.52C6.204 4.72 7.419 6.045 8 7.5c.53 1.326 1.588 3.073 3.173 5.242a3 3 0 003.37 1.077l1.96-.653a1 1 0 01.916.148l4.59 3.443a.5.5 0 01-.237.897l-8.38 1.047a4 4 0 01-3.758-1.653C8.13 14.931 7.085 13.581 6.5 13a68.688 68.688 0 00-2.82-2.609A4.254 4.254 0 012.5 5.75l.667-1.833a.8.8 0 011.187-.398z'
					fill='currentColor'
				/>
				<path
					d='M2.5 8.5c.667 3.333 1 5.5 1 6.5v4H5v-5.25c0-.833.5-1.083 1.5-.75l-4-4.5z'
					fill='currentColor'
					opacity={0.3}
				/>
			</g>
		</svg>
	);
};

export default SvgShoes;
