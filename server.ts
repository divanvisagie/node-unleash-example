import express, {Express, Request} from 'express'

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
    if (config.getBool('greet-by-name-feature')) {
        let user = getUserDetails(req)
        return res.send(`Hello ${user.name}`)
    }
    res.send('Hello World')
})

app.listen(8000)