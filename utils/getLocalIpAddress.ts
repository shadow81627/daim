import os from 'os';
export default function getLocalIpAddress(): string | void {
  try {
    const interfaces = os.networkInterfaces();
    for (const ifaceName in interfaces) {
      const iface = interfaces[ifaceName];
      if (iface) {
        for (const ifaceInfo of iface) {
          if (!ifaceInfo.internal && ifaceInfo.family === 'IPv4') {
            return ifaceInfo.address;
          }
        }
      }
    }
  } catch (e) {
    console.error('get local ip address', e);
  }
}
