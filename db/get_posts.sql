SELECT users.username, users.profile_pic, posts.* FROM posts
JOIN users ON users.id = posts.author_id;