import React, { SVGProps } from 'react';

const SvgAddressBook1 = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path
					d='M17 2h2a3 3 0 013 3v14a3 3 0 01-3 3h-2V2z'
					fill='currentColor'
					opacity={0.3}
				/>
				<path
					d='M4 2h12a3 3 0 013 3v14a3 3 0 01-3 3H4a1 1 0 01-1-1V3a1 1 0 011-1zm7.118 11.71a1.462 1.462 0 01-1.689.274 1.462 1.462 0 00-1.688.273l-1.51 1.511a.5.5 0 00.195.828l1.354.452c1.3.433 2.733.095 3.702-.874l4-4c.89-.89 1.11-2.25.547-3.376l-.632-1.265a.5.5 0 00-.801-.13l-1.593 1.593a1.462 1.462 0 00-.274 1.688 1.462 1.462 0 01-.274 1.688l-1.337 1.338z'
					fill='currentColor'
				/>
			</g>
		</svg>
	);
};

export default SvgAddressBook1;
