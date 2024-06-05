const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const Role = require('../models/Role');

async function login(req, res) {
    try {
        const allUsers = await Users.find();
        const users = JSON.parse(JSON.stringify(allUsers));

        let isValid = false;
        let userRole;
        let permissionNames;

        for (const user of users) {
            isValid = user.username === req.body.username && bcrypt.compareSync(req.body.password, user.password);

            if (isValid) {
                const permissions = await Role.findOne({ _id: user.roleId }).populate('RolePermission.permission');
                permissionNames = permissions.RolePermission.map(rp => rp.permission.name);
                userRole = await Role.findOne({ _id: user.roleId });

                const token = jwt.sign({
                    sub: user.id,
                    role: userRole.name,
                    permissions: permissionNames,
                    exp: Math.floor(Date.now() / 1000) + 86400 // 24 hours expiration
                }, process.env.JWT_SECRET);

                const refreshToken = jwt.sign({
                    sub: user.id,
                    role: userRole.name
                }, process.env.JWT_SECRET);

                await Users.updateOne({ _id: user.id }, { refreshToken });

                const userWithoutPassword = { ...user };
                delete userWithoutPassword.password;

                const responseObj = {
                    ...userWithoutPassword,
                    role: userRole.name,
                    token
                };

                res.status(200).json(responseObj);
                return;
            }
        }

        res.status(401).json({ error: 'Invalid username or password' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during user login. Please try again later.' });
    }
}

module.exports = login;
