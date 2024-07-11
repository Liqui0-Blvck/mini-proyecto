import React, { SVGProps } from 'react';

const SvgSignIn = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<rect
					fill='currentColor'
					opacity={0.3}
					transform='rotate(90 9 12)'
					x={8}
					y={6}
					width={2}
					height={12}
					rx={1}
				/>
				<path
					d='M10.006 7a1 1 0 11-2 0V6a4 4 0 014-4h5.996A4 4 0 0122 6v12a4 4 0 01-3.998 4h-6.004A4 4 0 018 18v-1a1 1 0 112 0v1a2 2 0 001.998 2h6.004A2 2 0 0020 18V6a2 2 0 00-2-2h-5.996a2 2 0 00-1.999 2v1z'
					fill='currentColor'
					opacity={0.3}
				/>
				<path
					d='M12.293 9.707a1 1 0 011.414-1.414l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L14.586 12l-2.293-2.293z'
					fill='currentColor'
				/>
			</g>
		</svg>
	);
};

export default SvgSignIn;
