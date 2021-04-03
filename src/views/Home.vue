<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home2</ion-title>
        </ion-toolbar>
      </ion-header>
      <!-- <p>{{ isEnabled }}</p>
      <p>{{ isConnected }}</p> -->
      <h1>Connected Scale</h1>
      <device-component
        v-if="connectedDevice.name"
        :device="connectedDevice"
      ></device-component>
      <h1>Visible Scales</h1>
      <device-component
        v-for="device of visibleDevices"
        v-bind:key="device.name"
        :device="device"
        @click="bleConnect(device)"
      ></device-component>
      <h1>Controls</h1>
      <p>(BETA: not in final version)</p>
      <ion-button @click="bleInit" expand="full"> Init </ion-button>
      <ion-button @click="bleScan" expand="full"> Start Scanning </ion-button>
      <ion-button @click="bleDisconnect" expand="full"> Disconnect </ion-button>
      <ion-button @click="bleSubscribe" expand="full"> Subscribe </ion-button>
      <ion-button @click="bleUnSubscribe" expand="full">
        Unsubscribe
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from "@ionic/vue";

import { mapState } from "vuex";
import * as ble from "@/lib/ble/bluetooth";
import { defineComponent } from "vue";
import { SERVICE_UUID, READ_CHAR_UUID, WRITE_CHAR_UUID } from "@/lib/const";
import DeviceComponent from "@/components/DeviceComponent.vue";

export default defineComponent({
  name: "Home",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
    DeviceComponent,
  },
  data() {
    return {
      dataValues: [] as string[],
    };
  },
  methods: {
    bleInit() {
      ble.initialize();
    },
    bleScan() {
      ble.startScanning([SERVICE_UUID]);
    },
    bleDisconnect() {
      ble.disconnect([SERVICE_UUID]);
    },
    bleConnect(device: ble.Device) {
      console.log(device);
      ble.connectToDevice(device.address, true);
    },
    bleResults(value: string) {
      console.log("push data", value);
    },
    async bleSubscribe() {
      await ble.checkServices([SERVICE_UUID]);
      await ble.checkCharacteristics(READ_CHAR_UUID);
      await ble.subscribe(SERVICE_UUID, READ_CHAR_UUID);
    },
    bleUnSubscribe() {
      ble.unsubscribe(SERVICE_UUID, READ_CHAR_UUID);
    },
  },
  computed: {
    supportedFunctions() {
      return Object.keys(ble);
    },
    ...mapState([
      "isEnabled",
      "isConnected",
      "visibleDevices",
      "connectedDevice",
      "values",
    ]),
  },
});
</script>