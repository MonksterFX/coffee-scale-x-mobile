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
          <ion-title size="large">Home</ion-title>
        </ion-toolbar>
      </ion-header>
      <!-- <p>{{ isEnabled }}</p>
      <p>{{ isConnected }}</p> -->
      <h1>Connected Scale</h1>
      <device-component :device="connectedDevice"></device-component>
      <h1>Visible Scales</h1>
      <device-component
        v-for="device of visibleDevices"
        v-bind:key="device.name"
        :device="device"
        @click="bleConnect(device)"
      ></device-component>

      <ion-button @click="bleInit"> Init2 </ion-button>
      <ion-button @click="bleScan"> Start Scanning </ion-button>
      <ion-button @click="bleDisconnect"> Disconnect </ion-button>
      <ion-button @click="bleSubscribe"> Subscribe </ion-button>
      <ion-button @click="bleUnSubscribe"> Unsubscribe </ion-button>
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
      ble.startScanning(["1801"]);
    },
    bleDisconnect() {
      ble.disconnect(["1801", "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"]);
    },
    bleConnect(device: ble.Device) {
      console.log(device);
      ble.connectToDevice(device.address, true);
    },
    bleResults(value: string) {
      console.log("push data", value);
    },
    async bleSubscribe() {
      await ble.checkServices();
      await ble.checkCharacteristics("6E400001-B5A3-F393-E0A9-E50E24DCCA9E");
      await ble.subscribe(
        "6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
        "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"
      );
    },
    bleUnSubscribe() {
      ble.unsubscribe(
        "6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
        "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"
      );
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