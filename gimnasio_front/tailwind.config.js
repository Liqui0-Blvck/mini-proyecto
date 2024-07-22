const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', ...defaultTheme.fontFamily.sans],
			},
			backgroundImage: {
				chevronDown: '/src/assets/required/chevron-down.svg',
				chevronDownDark: '/src/assets/required/dark:chevron-down.svg',
			},
			transitionProperty: {
				margin: 'margin',
			},
		},
	},
	safelist: [
		{
			pattern: /bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
			variants: ['hover', 'active', 'checked', 'indeterminate'],
		},
		{
			pattern: /bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)\/(10|20|30|40|50|60|70|80|90|100)$/,
		},
		{
			pattern: /border-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
			variants: ['hover', 'active', 'dark:hover', 'peer-checked'],
		},
		{
			pattern: /border-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)\/(10|20|30|40|50|60|70|80|90|100)$/,
			variants: ['hover', 'active'],
		},
		{
			pattern: /text-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
			variants: ['hover', 'active', 'dark:hover'],
		},
		{
			pattern: /text-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)\/(10|20|30|40|50|60|70|80|90|100)$/,
		},
	],
	plugins: [require('@tailwindcss/typography')],
	darkMode: 'class',
};
