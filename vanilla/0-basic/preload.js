//contextBridge site
  for (const type of ['chrome', 'node', 'electron']) {
    console.log(`${type}-version`, process.versions[type])
  }