const logerLimiter = require('../middleware/loginLimiter');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Bad Request' });
        }
        const findUser = await User.findOne({ username }).exec();

        if (!findUser || !findUser.active) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const match = await bcrypt.compare(password, findUser.password);
        if (!match) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": findUser.username,
                    "roles": findUser.roles,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10s" }
        )


        const refreshToken = jwt.sign(
            { "username": findUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "20s" }
        )

        res.cookie('jwt', refreshToken);

        res.json({ accessToken });


    } catch (err) {
        throw new Error(`Error ${err}`);
    }
}

const refresh = (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(401).json({ message: "Unathorized" })
    }
    const refreshToken = cookies.jwt;


    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            try {
                if (err) {
                    return res.status(403).json({ message: "Forbidden" })
                }
                const foundUser = await User.findOne({ username: decoded.username })

                if (!foundUser) {
                    return res.status(401).json({ message: "Unathorized" })
                }

                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            username: foundUser.username,
                            roles: foundUser.roles,
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "10s"
                    },

                )

                res.json({ accessToken });
            } catch (err) {
                throw new Error("JWT ERROr");
            }
        }

    )


}

const logout = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(204).json({ message: "No content" })
    }

    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true
    })

    res.json({ message: "Cookies cleared" })
}


module.exports = { login, refresh, logout };