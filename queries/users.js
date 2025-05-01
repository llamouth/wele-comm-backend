const bcrypt = require('bcrypt');

const createUser = async (user) => {
    try {
        const { username, email, password, profile_picture, bio, first_name, last_name } = user; 

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds); 

        const newUser = await db.one(
            "INSERT INTO users (email, username, password_hash, profile_picture, bio, first_name, last_name) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [email, username, hashedPassword, profile_picture, bio, first_name, last_name]
        );
        return newUser;
    } catch (err) {
        return {error: err};
    }
};

const loginUser = async (user) => {
    try {
        const loggedInUser = await db.oneOrNone("SELECT * FROM users WHERE username=$1", user.username);
        if (!loggedInUser) {
            return false;
        }

        const passwordMatch = await bcrypt.compare(user.password, loggedInUser.password_hash); 
        if (!passwordMatch) {
            return false;
        }

        return loggedInUser;
    } catch (err) {
        return { error: err };
    }
};

module.exports = {
    loginUser,
    createUser
};