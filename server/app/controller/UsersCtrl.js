class UsersCtrl {

    constructor() {
        this.users = require('../app').getTable('users');

    }

    login(request, response) {
            const sha1 = require('sha1')
            this.users.login([request.body.username, sha1(request.body.password)], (row) => {
                if (row !== null) {
                    response.json({ 'bool': true, 'id': row.id });
                } else {
                    response.json({ 'bool': false });
                }
            });
        } //END login

    passwordCheck(request, response) {
        const sha1 = require('sha1')
        this.users.findPass(request.body.id, sha1(request.body.password), (row) => {
            let bool = row !== null;
            response.json(bool);
        })
    }

    usernameChange(request, response) {
        this.users.update(request.body.id, { 'username': request.body.username });
        response.json({});
    }

    passwordChange(request, response) {
        const sha1 = require('sha1')
        this.users.update(request.body.id, { 'password': sha1(request.body.password) })
        response.json({});
    }

}
module.exports = new UsersCtrl();