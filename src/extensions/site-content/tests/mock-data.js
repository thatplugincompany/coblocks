/**
 * Mock Data for Testing
 */

/**
 * Entities
 *
 * @type {Array}
 */
export const propsPostTypeMockData = {
	_links: {
		collection: [
			{
				href: 'https://example.text/wp-json/wp/v2/types',
			},
		],
		curies: [
			{
				href: 'https://api.w.org/{rel}',
				name: 'wp',
				templated: true,
			},
		],
		'wp:items': [
			{
				href: 'https://example.text/wp-json/wp/v2/posts',
			},
		],
	},
	capabilities: {
		create_posts: 'edit_posts',
		delete_others_posts: 'delete_others_posts',
		delete_post: 'delete_post',
		delete_posts: 'delete_posts',
		delete_private_posts: 'delete_private_posts',
		delete_published_posts: 'delete_published_posts',
		edit_others_posts: 'edit_others_posts',
		edit_post: 'edit_post',
		edit_posts: 'edit_posts',
		edit_private_posts: 'edit_private_posts',
		edit_published_posts: 'edit_published_posts',
		publish_posts: 'publish_posts',
		read: 'read',
		read_post: 'read_post',
		read_private_posts: 'read_private_posts',
	},
	description: '',
	hierarchical: false,
	labels: {
		add_new: 'Add New',
		add_new_item: 'Add New Post',
		all_items: 'All Posts',
		archives: 'Post Archives',
		attributes: 'Post Attributes',
		edit_item: 'Edit Post',
		featured_image: 'Featured image',
		filter_items_list: 'Filter posts list',
		insert_into_item: 'Insert into post',
		item_published: 'Post published.',
		item_published_privately: 'Post published privately.',
		item_reverted_to_draft: 'Post reverted to draft.',
		item_scheduled: 'Post scheduled.',
		item_updated: 'Post updated.',
		items_list: 'Posts list',
		items_list_navigation: 'Posts list navigation',
		menu_name: 'Posts',
		name: 'Posts',
		name_admin_bar: 'Post',
		new_item: 'New Post',
		not_found: 'No posts found.',
		not_found_in_trash: 'No posts found in Trash.',
		parent_item_colon: null,
		remove_featured_image: 'Remove featured image',
		search_items: 'Search Posts',
		set_featured_image: 'Set featured image',
		singular_name: 'Post',
		uploaded_to_this_item: 'Uploaded to this post',
		use_featured_image: 'Use as featured image',
		view_item: 'View Post',
		view_items: 'View Posts',
	},
	name: 'Posts',
	rest_base: 'posts',
	slug: 'post',
	supports: {
		author: true,
		comments: true,
		'custom-fields': true,
		editor: true,
		excerpt: true,
		'post-formats': true,
		revisions: true,
		thumbnail: true,
		title: true,
		trackbacks: true,
	},
	taxonomies: [
		'category',
		'post_tag',
	],
	viewable: true,
};

export const propsMockData = {
	currentPostId: 1,
	entities: [
		{
			content: {
				raw: '',
				rendered: '',
			},
			excerpt: {
				raw: '',
				rendered: '',
			},
			id: 1,
			link: 'https://example.text/hello-world/',
			slug: 'home-page',
			status: 'publish',
			sticky: false,
			title: {
				raw: 'Hello world!',
				rendered: 'Hello world!',
			},
			type: 'page',
		},
		{
			content: {
				raw: '',
				rendered: '',
			},
			excerpt: {
				raw: '',
				rendered: '',
			},
			id: 2,
			link: 'https://example.text/hello-world/',
			slug: 'hello-world',
			status: 'publish',
			sticky: false,
			title: {
				raw: 'Hello world!',
				rendered: 'Hello world!',
			},
			type: 'page',
		},
		{
			content: {
				raw: '',
				rendered: '',
			},
			excerpt: {
				raw: '',
				rendered: '',
			},
			id: 101,
			link: 'https://example.text/hello-world/',
			slug: 'hello-world',
			status: 'publish',
			sticky: true,
			title: {
				raw: 'Hello world!',
				rendered: 'Hello world!',
			},
			type: 'post',
		},
		{
			content: {
				raw: '',
				rendered: '',
			},
			excerpt: {
				raw: '',
				rendered: '',
			},
			id: 102,
			link: 'https://example.text/hello-world/',
			slug: 'hello-world',
			status: 'publish',
			sticky: false,
			title: {
				raw: 'Hello world!',
				rendered: 'Hello world!',
			},
			type: 'post',
		},
	],
	postType: propsPostTypeMockData,
	postTypes: [
		{
			_links: {
				collection: [
					{
						href: 'https://example.org/wp-json/wp/v2/types',
					},
				],
				curies: [
					{
						href: 'https://api.w.org/{rel}',
						name: 'wp',
						templated: true,
					},
				],
				'wp:items': [
					{
						href: 'https://example.org/wp-json/wp/v2/pages',
					},
				],
			},
			capabilities: {
				create_posts: 'edit_pages',
				delete_others_posts: 'delete_others_pages',
				delete_post: 'delete_page',
				delete_posts: 'delete_pages',
				delete_private_posts: 'delete_private_pages',
				delete_published_posts: 'delete_published_pages',
				edit_others_posts: 'edit_others_pages',
				edit_post: 'edit_page',
				edit_posts: 'edit_pages',
				edit_private_posts: 'edit_private_pages',
				edit_published_posts: 'edit_published_pages',
				publish_posts: 'publish_pages',
				read: 'read',
				read_post: 'read_page',
				read_private_posts: 'read_private_pages',
			},
			description: '',
			hierarchical: true,
			labels: {
				add_new: 'Add New',
				add_new_item: 'Add New Page',
				all_items: 'All Pages',
				archives: 'Page Archives',
				attributes: 'Page Attributes',
				edit_item: 'Edit Page',
				featured_image: 'Featured image',
				filter_items_list: 'Filter pages list',
				insert_into_item: 'Insert into page',
				item_published: 'Page published.',
				item_published_privately: 'Page published privately.',
				item_reverted_to_draft: 'Page reverted to draft.',
				item_scheduled: 'Page scheduled.',
				item_updated: 'Page updated.',
				items_list: 'Pages list',
				items_list_navigation: 'Pages list navigation',
				menu_name: 'Pages',
				name: 'Pages',
				name_admin_bar: 'Page',
				new_item: 'New Page',
				not_found: 'No pages found.',
				not_found_in_trash: 'No pages found in Trash.',
				parent_item_colon: 'Parent Page:',
				remove_featured_image: 'Remove featured image',
				search_items: 'Search Pages',
				set_featured_image: 'Set featured image',
				singular_name: 'Page',
				uploaded_to_this_item: 'Uploaded to this page',
				use_featured_image: 'Use as featured image',
				view_item: 'View Page',
				view_items: 'View Pages',
			},
			name: 'Pages',
			rest_base: 'pages',
			slug: 'page',
			supports: {
				author: true,
				comments: true,
				'custom-fields': true,
				editor: true,
				'page-attributes': true,
				revisions: true,
				thumbnail: true,
				title: true,
			},
			taxonomies: [],
			viewable: true,
		},
		{
			_links: {
				collection: [
					{
						href: 'https://example.org/wp-json/wp/v2/types',
					},
				],
				curies: [
					{
						href: 'https://api.w.org/{rel}',
						name: 'wp',
						templated: true,
					},
				],
				'wp:items': [
					{
						href: 'https://example.org/wp-json/wp/v2/posts',
					},
				],
			},
			capabilities: {
				create_posts: 'edit_posts',
				delete_others_posts: 'delete_others_posts',
				delete_post: 'delete_post',
				delete_posts: 'delete_posts',
				delete_private_posts: 'delete_private_posts',
				delete_published_posts: 'delete_published_posts',
				edit_others_posts: 'edit_others_posts',
				edit_post: 'edit_post',
				edit_posts: 'edit_posts',
				edit_private_posts: 'edit_private_posts',
				edit_published_posts: 'edit_published_posts',
				publish_posts: 'publish_posts',
				read: 'read',
				read_post: 'read_post',
				read_private_posts: 'read_private_posts',
			},
			description: '',
			hierarchical: false,
			labels: {
				add_new: 'Add New',
				add_new_item: 'Add New Post',
				all_items: 'All Posts',
				archives: 'Post Archives',
				attributes: 'Post Attributes',
				edit_item: 'Edit Post',
				featured_image: 'Featured image',
				filter_items_list: 'Filter posts list',
				insert_into_item: 'Insert into post',
				item_published: 'Post published.',
				item_published_privately: 'Post published privately.',
				item_reverted_to_draft: 'Post reverted to draft.',
				item_scheduled: 'Post scheduled.',
				item_updated: 'Post updated.',
				items_list: 'Posts list',
				items_list_navigation: 'Posts list navigation',
				menu_name: 'Posts',
				name: 'Posts',
				name_admin_bar: 'Post',
				new_item: 'New Post',
				not_found: 'No posts found.',
				not_found_in_trash: 'No posts found in Trash.',
				parent_item_colon: null,
				remove_featured_image: 'Remove featured image',
				search_items: 'Search Posts',
				set_featured_image: 'Set featured image',
				singular_name: 'Post',
				uploaded_to_this_item: 'Uploaded to this post',
				use_featured_image: 'Use as featured image',
				view_item: 'View Post',
				view_items: 'View Posts',
			},
			name: 'Posts',
			rest_base: 'posts',
			slug: 'post',
			supports: {
				author: true,
				comments: true,
				'custom-fields': true,
				editor: true,
				excerpt: true,
				'post-formats': true,
				revisions: true,
				thumbnail: true,
				title: true,
				trackbacks: true,
			},
			taxonomies: [
				'category',
				'post_tag',
			],
			viewable: true,
		},
	],
};

/**
 * Post Types
 *
 * @type {Array}
 */
export const postTypesMockData = {
	postTypes: [
		{
			_links: {
				collection: [
					{
						href: 'https://example.org/wp-json/wp/v2/types',
					},
				],
				curies: [
					{
						href: 'https://api.w.org/{rel}',
						name: 'wp',
						templated: true,
					},
				],
				'wp:items': [
					{
						href: 'https://example.org/wp-json/wp/v2/pages',
					},
				],
			},
			capabilities: {
				create_posts: 'edit_pages',
				delete_others_posts: 'delete_others_pages',
				delete_post: 'delete_page',
				delete_posts: 'delete_pages',
				delete_private_posts: 'delete_private_pages',
				delete_published_posts: 'delete_published_pages',
				edit_others_posts: 'edit_others_pages',
				edit_post: 'edit_page',
				edit_posts: 'edit_pages',
				edit_private_posts: 'edit_private_pages',
				edit_published_posts: 'edit_published_pages',
				publish_posts: 'publish_pages',
				read: 'read',
				read_post: 'read_page',
				read_private_posts: 'read_private_pages',
			},
			description: '',
			hierarchical: true,
			labels: {
				add_new: 'Add New',
				add_new_item: 'Add New Page',
				all_items: 'All Pages',
				archives: 'Page Archives',
				attributes: 'Page Attributes',
				edit_item: 'Edit Page',
				featured_image: 'Featured image',
				filter_items_list: 'Filter pages list',
				insert_into_item: 'Insert into page',
				item_published: 'Page published.',
				item_published_privately: 'Page published privately.',
				item_reverted_to_draft: 'Page reverted to draft.',
				item_scheduled: 'Page scheduled.',
				item_updated: 'Page updated.',
				items_list: 'Pages list',
				items_list_navigation: 'Pages list navigation',
				menu_name: 'Pages',
				name: 'Pages',
				name_admin_bar: 'Page',
				new_item: 'New Page',
				not_found: 'No pages found.',
				not_found_in_trash: 'No pages found in Trash.',
				parent_item_colon: 'Parent Page:',
				remove_featured_image: 'Remove featured image',
				search_items: 'Search Pages',
				set_featured_image: 'Set featured image',
				singular_name: 'Page',
				uploaded_to_this_item: 'Uploaded to this page',
				use_featured_image: 'Use as featured image',
				view_item: 'View Page',
				view_items: 'View Pages',
			},
			name: 'Pages',
			rest_base: 'pages',
			slug: 'page',
			supports: {
				author: true,
				comments: true,
				'custom-fields': true,
				editor: true,
				'page-attributes': true,
				revisions: true,
				thumbnail: true,
				title: true,
			},
			taxonomies: [],
			viewable: true,
		},
		{
			_links: {
				collection: [
					{
						href: 'https://example.org/wp-json/wp/v2/types',
					},
				],
				curies: [
					{
						href: 'https://api.w.org/{rel}',
						name: 'wp',
						templated: true,
					},
				],
				'wp:items': [
					{
						href: 'https://example.org/wp-json/wp/v2/posts',
					},
				],
			},
			capabilities: {
				create_posts: 'edit_posts',
				delete_others_posts: 'delete_others_posts',
				delete_post: 'delete_post',
				delete_posts: 'delete_posts',
				delete_private_posts: 'delete_private_posts',
				delete_published_posts: 'delete_published_posts',
				edit_others_posts: 'edit_others_posts',
				edit_post: 'edit_post',
				edit_posts: 'edit_posts',
				edit_private_posts: 'edit_private_posts',
				edit_published_posts: 'edit_published_posts',
				publish_posts: 'publish_posts',
				read: 'read',
				read_post: 'read_post',
				read_private_posts: 'read_private_posts',
			},
			description: '',
			hierarchical: false,
			labels: {
				add_new: 'Add New',
				add_new_item: 'Add New Post',
				all_items: 'All Posts',
				archives: 'Post Archives',
				attributes: 'Post Attributes',
				edit_item: 'Edit Post',
				featured_image: 'Featured image',
				filter_items_list: 'Filter posts list',
				insert_into_item: 'Insert into post',
				item_published: 'Post published.',
				item_published_privately: 'Post published privately.',
				item_reverted_to_draft: 'Post reverted to draft.',
				item_scheduled: 'Post scheduled.',
				item_updated: 'Post updated.',
				items_list: 'Posts list',
				items_list_navigation: 'Posts list navigation',
				menu_name: 'Posts',
				name: 'Posts',
				name_admin_bar: 'Post',
				new_item: 'New Post',
				not_found: 'No posts found.',
				not_found_in_trash: 'No posts found in Trash.',
				parent_item_colon: null,
				remove_featured_image: 'Remove featured image',
				search_items: 'Search Posts',
				set_featured_image: 'Set featured image',
				singular_name: 'Post',
				uploaded_to_this_item: 'Uploaded to this post',
				use_featured_image: 'Use as featured image',
				view_item: 'View Post',
				view_items: 'View Posts',
			},
			name: 'Posts',
			rest_base: 'posts',
			slug: 'post',
			supports: {
				author: true,
				comments: true,
				'custom-fields': true,
				editor: true,
				excerpt: true,
				'post-formats': true,
				revisions: true,
				thumbnail: true,
				title: true,
				trackbacks: true,
			},
			taxonomies: [
				'category',
				'post_tag',
			],
			viewable: true,

		},
	],
};
