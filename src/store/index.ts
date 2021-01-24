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
    startTime: 0,
    stopTime: 0,
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
    startTimer(state: any) {
      state.startFlag = true;
      state.stopTime = 0;
      state.startTime = 0;
    },
    stopTimer(state: any) {
      state.stopTime = state.currentValue.time;
    },
    recievedValue(state: any, buffer: Uint8Array) {
      const measurementValue = Measurement.fromBuffer(buffer);
      state.values.push(measurementValue);

      // if start is triggered wait for first timestamp (no unix - missing RTC)
      if (state.startFlag) {
        state.startFlag = false;
        state.startTime = measurementValue.time;
      }

      state.currentValue = measurementValue;
    },
  },
  actions: {},
  modules: {},
});
