class systemData {
  // constructor() {}

  getSystemData(): object {
    var systemTitle = 'Generic';
    switch (process.platform) {
      case 'win32':
        systemTitle = 'Windows';
        break;
      case 'darwin':
        systemTitle = 'Mac';
        break;
      case 'openbsd':
      case 'freebsd':
      case 'linux':
      case 'sunos':
      case 'aix':
        systemTitle = 'Unix Based System';
        break;
      case 'android':
        systemTitle = 'Mobile';
        break;
      case 'cygwin':
        systemTitle = 'Cygwin';
        break;
    }
    return {
      os: process.platform,
      arch: process.arch,
      release: process.release,
      node: process.version,
      name: systemTitle,
    };
  }
}

module.exports = systemData;
