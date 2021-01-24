import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { Device } from './lib/ble/bluetooth';
import { Measurement } from './lib/ble/messages';

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    isEnabled: boolean;
    isConnected: boolean;
    visibleDevices: Device[];
    connectedDevice: Device;
    currentValue: Measurement;
    values: Measurement[];
    startFlag: boolean;
    startTime: number;
    stopTime: number;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
