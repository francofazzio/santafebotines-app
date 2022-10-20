process.on('message', cantidad => {
    const objectResponse = {}

    for (let i = 0; i < cantidad; i++) {
        const rand = Math.floor(Math.random() * 1000 + 1);

        if (objectResponse.hasOwnProperty(rand)) {
            objectResponse[rand]++;
        }
         else {
            objectResponse[rand] = 1;
        }
    }

    process.send(objectResponse);
    process.exit()
})

process.send("ready")