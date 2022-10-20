import os from 'os'

const infoController = async(req, res) => {
    const { args } = req
    const info = {
      puerto: args.port,
      // puerto: process.argv[3],
      plataforma: process.platform,
      versionNode: process.version,
      memoriaTotalReservada: process.memoryUsage().rss,
      pathExec: process.execPath,
      processId: process.pid,
      capetaProyecto: process.cwd(),
      cantCpus: os.cpus().length
    }
    // console.log("Info del servidor:", info)
    res.render('plantillaInfo.ejs', { info })
}

export { infoController }