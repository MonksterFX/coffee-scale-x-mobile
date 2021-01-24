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
    visibleDevices: [] as Device[],
    connectedDevice: {} as Device,
    currentValue: {} as Measurement,
    values: [] as string[],
    start: 0,
    startFlag: false,
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
    recievedValue(state: any, buffer: Uint8Array) {
      const measurementValue = Measurement.fromBuffer(buffer);
      state.values.push(measurementValue);

      // if start is triggered wait for first timestamp (no unix - missing RTC)
      if (state.time === 0 || state.startFlag) {
        state.startFlag = false;
        state.start = measurementValue.time;
      }

      state.currentValue = measurementValue;
    },
  },
  actions: {},
  modules: {},
});
