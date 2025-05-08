interface ProjectLink {
	label: string;
	href: string;
}

interface ProjectItem {
	projectTitle: string;
	projectDesc: string;
	projectImage: string;
	projectImageAlt: string;
	projectLinks?: ProjectLink[];
	elementRef?: HTMLDivElement;
}

const projectItems: ProjectItem[] = [
	{
		projectTitle: 'GitGood',
		projectDesc:
			'A Leetcode style website that empowers anyone to uplaod their own coding problems and solutions, built for my CPSC-490/491 (senior capstone) class. Runs on Next.js, Vercel, Firebase, and PistonAPI.',
		projectImage: '/images/gitgood.png',
		projectImageAlt: 'GitGoods Homepage',
		projectLinks: [
			{
				label: 'Site',
				href: 'https://gitgood.cc/'
			},
			{
				label: 'Github',
				href: 'https://github.com/PillowGit/gitgood'
			}
		]
	},
	{
		projectTitle: 'RobloxRank',
		projectDesc:
			'A commissioned proprietary Discord Bot that serves 180,000+ users in the various discord servers items & benefits in their corresponding Roblox games. Runs on Discord.js, Docker, and the Roblox Cloud API Service.',
		projectImage: '/images/robloxrank.png',
		projectImageAlt: 'The Roblox and Discord logos together'
	},
	{
		projectTitle: 'Linkly',
		projectDesc:
			'A link shortener and QR code generator built for my CPSC-449 (backend) class. Runs on Sveltekit, Vercel, Supabase, and Postgres.',
		projectImage: '/images/linkly.png',
		projectImageAlt: 'Linkly Dashboard',
		projectLinks: [
			{
				label: 'Site',
				href: 'https://linkly.sh/'
			},
			{
				label: 'Github',
				href: 'https://github.com/PillowGit/linkly'
			}
		]
	},
	{
		projectTitle: 'TrelloAPI',
		projectDesc:
			'A commissioned proprietary Roblox Studio REST API wrapper library for Trello. Runs on Lua, TrelloAPI, and Roblox Studio.',
		projectImage: '/images/trelloapi.png',
		projectImageAlt: 'The Trello and Roblox logos together'
	},
	{
		projectTitle: 'Minecraft Update Bot',
		projectDesc:
			'My first project, a Discord bot that can be used to see the status of a Minecraft server. Runs on Discord.py and the Minecraft Server API.',
		projectImage: 'https://pbs.twimg.com/media/FNda4prVkAIB9B7.png',
		projectImageAlt: 'The Minecraft Update Bot Logo',
		projectLinks: [
			{
				label: 'Github',
				href: 'https://github.com/PillowGit/Minecraft-Update-Bot-4-Discord/tree/main'
			}
		]
	},
	{
		projectTitle: '362 Todo List',
		projectDesc:
			'A really simple todo list app built for my CPSC-362 (software engineering) class. Runs on Sveltekit, Vercel, and Firebase.',
		projectImage: '/images/362.png',
		projectImageAlt: 'The Todo Lists Homepage',
		projectLinks: [
			{
				label: 'Github',
				href: 'https://github.com/PillowGit/CPSC-362-Project'
			}
		]
	},
	{
		projectTitle: 'Base Discord.js Bot',
		projectDesc:
			'The base template for a Discord.js bot, publicized and open-sourced for anyone to use. Specifically made for instructional workshops I was running at the time. Runs on Discord.js.',
		projectImage: '/images/djs.png',
		projectImageAlt: 'The Discord.js logo',
		projectLinks: [
			{
				label: 'Github',
				href: 'https://github.com/PillowGit/base-discord-js-bot'
			}
		]
	}
];

export default projectItems;
