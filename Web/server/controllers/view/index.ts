﻿import * as Express from "express";
import * as Repository from "../../repository/repository";

const router = Express.Router();

router.get('/', (req: Express.Request, res: Express.Response) => {
    res.render('index', { title: 'Home', myinfo: 'This is myInfo' });
});

router.get('/users', (req: Express.Request, res: Express.Response) => {
    console.log("Going to render users passing in a list of users that I will later get from a datasource.");

    let userRep: Repository.Interface = Repository.Factory.create(Repository.Type.USER);

    /*
    const aPromise = new Promise((resolve, reject) => {
        let users = userRep.read();
        resolve(users)
//            setTimeout(resolve, 5000);
    });

    aPromise.then((users) => {
        console.log('I got the users');

        console.log('First user key: ' + users[0].id);
        console.log('First user first name: ' + users[0].firstName);

        res.render('users', { title: 'Users', users: users });
//        res.send(users);
    });
    aPromise.catch((err) => {
        console.log('I get called:', err.message); // I get called: 'Something awful happened'
    });
    */

//    let users = getUsers();// userRep.read();

    let usersPromise=userRep.read();
    usersPromise.then((users) => {
        console.log('I got the users');

        console.log('First user key: ' + users[0].id);
        console.log('First user first name: ' + users[0].firstName);

        res.render('users', { title: 'Users', users: users });
    });

    /*
    console.log('First user key: ' + users[0].id);
    console.log('First user first name: ' + users[0].firstName);

    res.render('users', { title: 'Users', users: users });
    */
});

export default router;

