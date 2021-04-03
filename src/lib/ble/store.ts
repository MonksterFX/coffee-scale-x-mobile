import { ScanResult } from '@capacitor-community/bluetooth-le';

function debug(key: string, value: any) {
  console.info(`ble state changed | ${key}::${JSON.stringify(value)}`);
}

export default {
  state: () => ({
    isEnabled: true,
    isConnected: false,
    visibleDevices: [] as {}[],
    connectedDevice: {} as ScanResult,
  }),
  mutations: {
    isBleEnabled(state: any, isEnabled: boolean) {
      state.isEnabled = isEnabled;
      debug('isEnabled', state.isEnabled);
    },
    addVisibleDevices(state: any, devices: any[] = []) {
      state.visibleDevices = state.visibleDevices.concat([devices]);
      debug('visibleDevices', state.visibleDevices);
    },
    connectedDevice(state: any, device: ScanResult) {
      state.connectedDevice = device;
      debug('connectedDevice', state.connectedDevice);
    },
  },
  actions: {},
  modules: {},
};
