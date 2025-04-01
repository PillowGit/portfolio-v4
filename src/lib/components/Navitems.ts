interface NavItem {
	name: string;
	href: string;
	hoverCallback?: () => void;
}
const navitems: NavItem[] = [
	{ name: 'Home', href: '/' },
	{ name: 'About', href: '/about' },
	{ name: 'Projects', href: '/projects' },
	{ name: 'Skills', href: '/skills' },
	{ name: 'Contact', href: '/contact' }
];

export default navitems;
