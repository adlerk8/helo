INSERT INTO users (username, password, profile_pic)
VALUES ($1, $2, 'https://robohash.org/?set=set4')
RETURNING *;