<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Debug</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense"> </ion-header>
    </ion-content>
    <ion-button @click="initializeBle">Initialize</ion-button>
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

import { defineComponent } from "vue";
import { initialize } from "@/lib/ble/bluetooth";
// https://github.com/don/ionic-ble-examples/blob/master/scan/src/pages/home/home.ts

export default defineComponent({
  name: "Debug",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButton,
  },
  methods: {
    initializeBle() {
      return initialize;
    },
  },
});
</script>

<style lang="css">
button {
  padding: 20px;
}
</style>