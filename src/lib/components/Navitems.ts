interface NavItem {
	name: string;
	href: string;
	hoverCallback?: () => void;
	elementRef?: HTMLAnchorElement;
}
const navitems: NavItem[] = [
	{ name: 'Home', href: '/' },
	{ name: 'Resume', href: '/resources/Esteban_Escartin_Resume.pdf' },
	{ name: 'Projects', href: '/projects' },
	{ name: 'Skills', href: '/skills' },
	{ name: 'Contact', href: '/contact' }
];

export default navitems;
