import express, {Express, Request, request} from 'express'
import {initialize, isEnabled} from 'unleash-client'

const instance = initialize({
    url: 'http://localhost:4242/api',
    appName: 'node-unleash-example',
    instanceId: 'my-server-instance',
});

instance.on('ready', () => {
    console.log('unleash is ready')
})
instance.on('error', console.error);
instance.on('warn', console.warn);

const app = express()

function getUserDetails(req: Request) {
    const userId  = req.header('UserId')
    console.log(req.headers)

    const unleashContext = {
        userId
    }

    return {
       name: 'FakeUser',
       unleashContext
    } 
}

const config = {
    getBool(key: string) { return true }
}

app.get('/greeting', (req, res) => {
    const user = getUserDetails(req)
    if (isEnabled('greet-by-name-feature', user.unleashContext)) {
        return res.send(`Hello ${user.name}`)
    }
    res.send('Hello World')
})

app.listen(8000)