import { app } from './app'

app.listen({ port: process.env.PORT }, () => console.log(`Server initialised on port: ${process.env.PORT}`))
