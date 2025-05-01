const bcrypt = require('bcrypt');

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