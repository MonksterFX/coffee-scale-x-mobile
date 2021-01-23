import { Device } from '@ionic-native/bluetooth-le';
import { createStore } from 'vuex';

function debug(key: string, value: any) {
  console.info(`ble state changed | ${key}::${JSON.stringify(value)}`);
}

export default {
  state: () => ({
    isEnabled: true,
    isConnected: false,
    visibleDevices: [] as {}[],
    connectedDevice: {} as Device,
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
    connectedDevice(state: any, device: Device) {
      state.connectedDevice = device;
      debug('connectedDevice', state.connectedDevice);
    },
  },
  actions: {},
  modules: {},
};
