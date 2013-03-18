var config = {
	blogName: 'postit',
	blogDescription: 'Small lightweight and real-time system blogging',
	url: {
		admin: {
			index: '/admin',
			posts: '/admin/posts',
			categories: '/admin/categories',
			users: '/admin/users'
		},
		create: {
			post: '/create/post',
			user: '/create/user'
		},
		remove: {
			post: '/remove/post',
			user: '/remove/user'
		},
		edit: {
			post: '/edit/post',
			user: '/edit/user'
		},
		blog: {
			post: '',
			page: '',
			category: '/category',
			tag: '/tag'
		}
	}
}

module.exports = config;