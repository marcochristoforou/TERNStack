﻿import * as Express from "express";
import UsersController from "../controllers/users.controller";

const router = Express.Router();

router.get('/', (req: Express.Request, res: Express.Response) => {
    res.render('index', { title: 'Home', myinfo: 'This is myInfo' });
});

router.get('/users', (req: Express.Request, res: Express.Response) => {
    console.log("Going to render users passing in a list of users that I will later get from a datasource.");

    const userCtrl = new UsersController();

    let users = userCtrl.read();

    console.log('First user key: ' + users[0].id);
    console.log('First user first name: ' + users[0].firstName);

    res.render('users', { title: 'Users', users: users });
});

export default router;