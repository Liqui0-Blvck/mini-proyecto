import React, { SVGProps } from 'react';

const SvgBulb2 = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path
					d='M5.112 2.038C7.062 1.346 9.358 1 12 1c2.642 0 4.938.346 6.887 1.038a2 2 0 011.087 2.843L15 14H9L4.026 4.88a2 2 0 011.086-2.842zM10 20h4a2 2 0 11-4 0z'
					fill='currentColor'
					opacity={0.3}
				/>
				<path
					d='M13 10v8a1 1 0 01-2 0v-8h-.5a.5.5 0 110-1h3a.5.5 0 110 1H13z'
					fill='currentColor'
					opacity={0.3}
				/>
				<path
					d='M9 18a1 1 0 010-2 1 1 0 010-2h6a1 1 0 010 2 1 1 0 010 2 1 1 0 010 2H9a1 1 0 010-2z'
					fill='currentColor'
				/>
			</g>
		</svg>
	);
};

export default SvgBulb2;
