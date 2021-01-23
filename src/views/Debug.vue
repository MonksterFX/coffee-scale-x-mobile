<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Debug</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Debug</ion-title>
        </ion-toolbar>
        <ion-button @click="isBleEnabled" color="tertiary" expand="full">
          Check for ScaleX
        </ion-button>
        <ion-button @click="connect" color="tertiary" expand="full">
          Connect
        </ion-button>

        <!-- <ion-card>
          <ion-card-content>
            Connection Status: {{ this.isEnabled }}</ion-card-content
          >
        </ion-card> -->
        <p>{{ this.isEnabled }}</p>
        <ul>
          <li v-for="device in devices" :key="device.id">{{ device }}</li>
        </ul>
      </ion-header>
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
  //IonCard,
  IonButton,
} from "@ionic/vue";

import { BLE } from "@ionic-native/ble";
import { defineComponent } from "vue";
// https://github.com/don/ionic-ble-examples/blob/master/scan/src/pages/home/home.ts

export default defineComponent({
  name: "Debug",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    //IonCard,
    IonButton,
  },
  data() {
    return {
      interval: -1,
      isEnabled: "",
      devices: new Array<any>(),
    };
  },
  methods: {
    getDevices(values: any) {
      console.log(values);
    },
    connect() {
      if (!this.devices.length) {
        console.log("no device to connect");
        return;
      }

      const _id = this.devices[0].id;

      BLE.connect(_id).subscribe((data) => {
        console.log("successfull connected to pheriaple");
        console.log(data);
        BLE.startNotification(
          _id,
          "6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
          "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"
        ).subscribe(
          (buffer) => {
            const parsed = new Uint8Array(buffer);
            console.log("got data", parsed, buffer, buffer.length);
            const parsed2 = String.fromCharCode.apply(
              null,
              Array.from(new Uint8Array(buffer))
            );
            console.log("got data2", parsed2);
          },
          (err) => console.error(err)
        );
      });
    },
    isBleEnabled() {
      this.isEnabled = "searching";
      BLE.isEnabled()
        .then(() => {
          this.isEnabled = "connected";
          console.log("enabled - scanning");
          BLE.startScanWithOptions(["1801"], {
            reportDuplicates: false,
          }).subscribe((value) => {
            console.log(value);
            this.devices.push(value);
          });
        })
        .catch((err) => {
          this.isEnabled = "disconnected";
          console.log("disabled", err);
        });
      setTimeout(BLE.stopScan, 10000);
    },
  },
});
</script>

<style lang="css">
button {
  padding: 20px;
}
</style>