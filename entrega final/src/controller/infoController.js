import os from 'os'

const infoController = async(req, res) => {
    const { args } = req
    const info = {
      puerto: args.port,
      plataforma: process.platform,
      versionNode: process.version,
      memoriaTotalReservada: process.memoryUsage().rss,
      pathExec: process.execPath,
      processId: process.pid,
      capetaProyecto: process.cwd(),
      cantCpus: os.cpus().length,
      bbddName: `MongoDB: ${args.bbddName}`
    }
    res.render('plantillaInfo.ejs', { info })
}

export { infoController }