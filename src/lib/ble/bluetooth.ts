// Plugin Doc: https: www.npmjs.com/package/@capacitor-community/bluetooth-le
import store from '@/store';
import {
  BleClient,
  hexStringToDataView,
} from '@capacitor-community/bluetooth-le';

// constants
import { SERVICE_UUID, READ_CHAR_UUID, WRITE_CHAR_UUID } from '@/lib/const';

export enum SCALE_COMMAND {
  TARE = 'c0 00',
  START = 'c1 00',
  STOP = 'c2 00',
  CALIBRATION = 'c3 00',
}

export function initialize() {
  console.log('BLE::initialize');
  // TODO: split isBleEnabled and initialized
  BleClient.initialize()
    .then(() => store.commit('isBleEnabled', true))
    .catch(() => store.commit('isBleEnabled', false));
}

export async function stopScanning() {
  console.log('BLE::stop scanning');
  return BleClient.stopLEScan();
}

export async function startScanning(services: string[] = [], timeout = -1) {
  await stopScanning();
  console.log('BLE::start scanning');

  // reset devices
  store.commit('resetVisibleDevices');

  return BleClient.requestLEScan({ services }, (result) => {
    store.commit('addVisibleDevices', result);
  });
}

// bluetoothle.stringToBytes("hallo welt");
export async function sendCommand(cmd: SCALE_COMMAND) {
  await BleClient.write(
    store.state.connectedDevice.device.deviceId,
    SERVICE_UUID,
    WRITE_CHAR_UUID,
    hexStringToDataView(cmd)
  );
}

export async function subscribe(callback: Function | null = null) {
  await BleClient.startNotifications(
    store.state.connectedDevice.device.deviceId,
    SERVICE_UUID,
    READ_CHAR_UUID,
    (value) => {
      store.commit('recievedValue', value.buffer);

      if (callback) {
        callback(value);
      }
    }
  );
}

async function _disconnect(deviceId: string) {
  // first disconnect
  console.log('BLE::disconnect from ', deviceId);
  BleClient.disconnect(deviceId);
}

export async function connectToDevice(deviceId: string, force = false) {
  // force disconnect
  if (force) {
    await _disconnect(deviceId).catch(console.error);
  }

  await BleClient.connect(deviceId, (closingDevice) => {
    console.log(`BLE::device closed connection - ${closingDevice}`);
  }).then(() => {
    store.commit('connectedDevice', deviceId);
  });

  // subscribe after connection
  // subscribe();
}

export async function disconnect(services: string[] = []) {
  // check store for connected device
  _disconnect('F56015E3-14C4-0A1B-62A3-CA47B2E56AC2');
}

export async function unsubscribe() {
  return BleClient.stopNotifications(
    store.state.connectedDevice.device.deviceId,
    SERVICE_UUID,
    READ_CHAR_UUID
  );
}

// TODO: utility functions
export async function checkCharacteristics(service: string) {
  return null;
}
export async function checkServices(services: string[] = []) {
  return null;
}

// inject to dom
(window as any).BLE = {
  initialize,
  startScanning,
  stopScanning,
  connectToDevice,
  disconnect,
  subscribe,
  unsubscribe,
  checkServices,
  checkCharacteristics,
  sendCommand,
};
