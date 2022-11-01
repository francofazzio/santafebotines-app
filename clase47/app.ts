import { Application, Router, Context } from "https://deno.land/x/oak/mod.ts"

const app = new Application()
const router = new Router()

router.get("/", (ctx:Context): void => {
    ctx.response.body = "Servidor deno con Oak"
})

router.get("/reverse", (ctx: Context):void => {
    const phrase = ctx.request.url.searchParams.get('frase')
    const phraseArray = phrase?.split(" ")
    const reversePhraseArray = phraseArray?.reverse()
    console.log("reversePhraseArray", reversePhraseArray)
    const joinReversePhraseArray = reversePhraseArray?.join(" ")
    ctx.response.status = 200
    ctx.response.body = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Frase Invertida</title>
        </head>
        <body>
        <h1 style="color: blue;">${joinReversePhraseArray}</h1>
        </body>
        </html>
    `
})
app.use(router.routes())

app.listen({ port: 3000 })
console.log("Server listening on: http://127.0.0.1:3000")