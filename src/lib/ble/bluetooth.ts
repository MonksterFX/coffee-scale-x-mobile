// https://github.com/don/cordova-plugin-ble-central#advertising-data
// https://github.com/don/cordova-plugin-ble-central/blob/master/examples/rfduinoLedButton/www/js/index.js

import { BluetoothLE as ble } from '@ionic-native/bluetooth-le';
import store from '@/store';
import { base64ToUint8Array, uint8ArrayToBase64 } from '../binary/utils';

export const config = {
  request: true,
  statusReceiver: false,
  restoreKey: 'bluetoothleplugin',
};

export class Device {
  readonly address: string;
  readonly name: string;

  constructor(device: Device) {
    this.address = device.address;
    this.name = device.name;
  }
}

export function initialize() {
  console.log('initialize');
  ble.initialize(config).subscribe(
    (state) => store.commit('isBleEnabled', state.status),
    () => store.commit('isBleEnabled', false)
  );
}

export async function stopScanning() {
  return ble
    .stopScan()
    .then(console.log)
    .catch(console.error);
}

export async function startScanning(services: string[] = [], timeout = -1) {
  await stopScanning();

  // reset devices
  store.commit('resetVisibleDevices');

  return ble
    .startScan({ services, allowDuplicates: false })
    .subscribe((result) => {
      console.log(result);
      const device = new Device({
        address: result.address,
        name: (result.advertisement as any)?.locaName || result.name,
      });
      if (device.address) {
        store.commit('addVisibleDevices', device);
      }
    }, console.error);
}

export function write(
  service: string,
  characteristic: string,
  value: Uint8Array
) {
  const _value = uint8ArrayToBase64(value);
  return ble
    .write({
      address: store.state.connectedDevice.address,
      service,
      characteristic,
      value: _value,
    })
    .then(console.log)
    .catch(console.error);
}

export function subscribe(
  service: string,
  characteristic: string,
  callback: Function | null = null
) {
  return ble
    .subscribe({
      address: store.state.connectedDevice.address,
      service,
      characteristic,
    })
    .subscribe((notifcation) => {
      let buffer: Uint8Array;

      // values are base64 encoded
      try {
        buffer = base64ToUint8Array(notifcation.value);
      } catch (error) {
        console.error('atob conversion error', error);
        return;
      }

      // save result to store
      store.commit('recievedValue', buffer);

      // call callback if given
      if (callback) {
        callback(buffer);
      }
    }, console.error);
}

async function _disconnect(address: string) {
  // first disconnect
  console.log('disconnect from ', address);

  return (
    ble
      .disconnect({ address })
      .then(console.log)
      .catch(console.error)
      // then close
      .finally(() => {
        return ble
          .close({ address })
          .then(console.log)
          .catch(console.error);
      })
  );
}

export async function connectToDevice(deviceId: string, force = false) {
  // force disconnect
  if (force) {
    await _disconnect(deviceId).catch(console.error);
  }

  return ble.connect({ address: deviceId }).subscribe((deviceResult) => {
    store.commit(
      'connectedDevice',
      new Device({ address: deviceId, name: deviceResult.name })
    );

    // scanning is energy intense stop it here!
    stopScanning();

    // start subscribe - hardcoded
    subscribe(
      '6E400001-B5A3-F393-E0A9-E50E24DCCA9E',
      '6E400003-B5A3-F393-E0A9-E50E24DCCA9E',
      console.log
    );
  }, console.error);
}

export async function disconnect(services: string[] = []) {
  // get all connected devices
  const connected = await ble.retrieveConnected();

  console.log(connected, store.state.connectedDevice);

  // check store for connected device
  _disconnect(store.state.connectedDevice);

  // disconnect
  for (const device of connected.devices) {
    _disconnect(device.address);
  }
}

export async function checkServices(services: string[] = []) {
  return ble
    .services({ address: store.state.connectedDevice.address, services })
    .then(console.log)
    .catch(console.error);
}

export async function checkCharacteristics(service: string) {
  return ble
    .characteristics({ address: store.state.connectedDevice.address, service })
    .then(console.log)
    .catch(console.error);
}

export function unsubscribe(service: string, characteristic: string) {
  ble
    .unsubscribe({
      address: store.state.connectedDevice.address,
      service,
      characteristic,
    })
    .then(console.log)
    .catch(console.error);
}

// inject to dom
// (window as any).ble = ble;
(window as any).bleM = {
  initialize,
  startScanning,
  stopScanning,
  connectToDevice,
  disconnect,
  subscribe,
  unsubscribe,
  checkServices,
  checkCharacteristics,
};
