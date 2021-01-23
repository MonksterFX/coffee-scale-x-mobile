// https://github.com/don/cordova-plugin-ble-central#advertising-data
// https://github.com/don/cordova-plugin-ble-central/blob/master/examples/rfduinoLedButton/www/js/index.js

import { BluetoothLE as ble } from '@ionic-native/bluetooth-le';
import store from '@/store';

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

export function connectToDevice(deviceId: string) {
  ble.connect({ address: deviceId }).subscribe((deviceResult) => {
    store.commit(
      'connectedDevice',
      new Device({ address: deviceId, name: deviceResult.name })
    );
    stopScanning();
  }, console.error);
}

export async function disconnect() {
  const connected = await ble.retrieveConnected();

  for (const device of connected.devices) {
    ble
      .disconnect({ address: device.address })
      .then(console.log)
      .catch(console.error)
      .finally(() => {
        ble
          .close({ address: device.address })
          .then(console.log)
          .catch(console.error);
      });
  }
}

export function checkServices(services: string[] = []) {
  ble
    .services({ address: store.state.connectedDevice.address, services })
    .then(console.log)
    .catch(console.error);
}

export function checkCharacteristics(service: string) {
  ble
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

export function subscribe(
  service: string,
  characteristic: string,
  callback: Function
) {
  const device = store.state.connectedDevice;
  ble
    .subscribe({ address: device.address, service, characteristic })
    .subscribe((notifcation) => {
      console.log(ble.encodedStringToBytes(notifcation.value));
      console.log(notifcation);
    }, console.error);
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
