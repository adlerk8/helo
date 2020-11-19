const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');

        const foundUser = await db.check_user(username);
        if(foundUser[0]){
            return res.status(400).send("Aw, rats! That username already exists.")
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [newUser] = await db.add_user([username, hash, `https://robohash.org/${username}`]);
        req.session.user = {
            username: newUser.username,
            profile: newUser.profile_pic,
            userId: newUser.id
        }
        res.status(200).send(req.session.user);
    },
    login: async (req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');

        const [foundUser] = await db.check_user(username);
        if(!foundUser){
            return res.status(400).send("Dang it! You need to register first.")
        }

        const authenticated = bcrypt.compareSync(password, foundUser.password);
        if(authenticated) {
            req.session.user = {
                username: foundUser.username,
                profile: foundUser.profile_pic,
                userId: foundUser.id
            }
            res.status(200).send(req.session.user);
        } else {
            res.status(401).send("Dang it! That didn't work.")
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getPosts: async (req, res) => {
        const {id} = req.params;
        const {userposts, search} = req.query;
        const db = req.app.get('db');
        
        if(userposts === true && search !== null) {
            const foundPost = db.posts.where({"title like": "%search%"})
            res.status(200).send(foundPost)
        } else if (userposts === false && search !== null) {
            const foundPost = db.posts.where({"title like": "%search%", "author_id !=": id})
            res.status(200).send(foundPost)
        } else if (userposts === false && search === null) {
            const foundPost = db.posts.where({"author_id !=": id})
            res.status(200).send(foundPost)
        } else {
            const posts = await db.get_posts(id);
            res.status(200).send(posts);
        }
    },
    getPost: async (req, res) => {
        const {id} = req.params;
        const db = req.app.get('db');

        const singlePost = await db.get_post(id)
        if (singlePost) {

            res.status(200).send(singlePost)
        } else {
            res.status(404).send("Oops! We cannot display posts at this time.")
        }
    }
}