import express, {Express, Request} from 'express'
import {initialize, isEnabled} from 'unleash-client'

const instance = initialize({
    url: 'http://localhost:4242',
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
   return {
       name: 'FakeUser'
   } 
}

const config = {
    getBool(key: string) { return true }
}

app.get('/greeting', (req, res) => {

    if (isEnabled('greet-by-name-feature')) {
        let user = getUserDetails(req)
        return res.send(`Hello ${user.name}`)
    }
    res.send('Hello World')

    
})

app.listen(8000)