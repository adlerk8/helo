SELECT (posts.author_id, users.username, users.profile_pic) FROM posts
JOIN users ON users.id = posts.author_id;