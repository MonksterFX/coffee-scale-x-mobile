import { Device } from '@/lib/ble/bluetooth';
import { Measurement } from '@/lib/ble/messages';
import { createStore } from 'vuex';

function debug(key: string, value: any) {
  console.info(`ble state changed | ${key}::${JSON.stringify(value)}`);
}

export default createStore({
  state: {
    isEnabled: true,
    isConnected: false,
    visibleDevices: [{ address: 'test', name: 'test' }] as Device[],
    connectedDevice: { address: 'test', name: 'test' } as Device,
    currentValue: {} as Measurement,
    values: [] as string[],
  },
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
    resetVisibleDevices(state: any) {
      state.visibleDevices.length = 0;
    },
    addNewValue(state: any, value: string) {
      state.values.push('' + value);
      state.currentValue = new Measurement(
        parseInt(value),
        parseInt(value) + 1
      );
    },
  },
  actions: {},
  modules: {},
});
