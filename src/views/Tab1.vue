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
      <p>{{ isEnabled }}</p>
      <p>{{ isConnected }}</p>
      <p>{{ connectedDevice }}</p>
      <ul>
        <li
          v-for="device of visibleDevices"
          v-bind:key="device.name"
          @click="connect(device)"
        >
          {{ device }}
        </li>
      </ul>
      <ion-button @click="bleInit"> Initialize </ion-button>
      <ion-button @click="bleScan"> Start Scanning </ion-button>
      <ion-button @click="bleDisconnect"> Disconnect </ion-button>
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

export default {
  name: "Tab1",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
  },
  methods: {
    bleInit() {
      ble.initialize();
    },
    bleScan() {
      ble.startScanning(["1801"]);
    },
    bleDisconnect() {
      ble.disconnect();
    },
    bleConnect(device: ble.Device) {
      ble.connectToDevice(device.address);
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
    ]),
  },
};
</script>