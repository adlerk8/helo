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
        const [newUser] = await db.add_user([username, hash]);
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

        const foundUser = await db.check_user(username);
        if(!foundUser[0]){
            return res.status(400).send("Dang it! That didn't work.")
        }

        const aunthenticated = bcrypt.compareSync(password, foundUser.password);
        if(authenticated) {
            req.session.user = {
                username: newUser.username,
                profile: newUser.profile_pic,
                userId: newUser.id
            }
            res.status(200).send(req.session.user);
        } else {
            res.status(401).send("Dang it! That didn't work.")
        }
        
        res.status(200).send(req.session.user);
    }
}