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
          <ion-title size="large">DEBUG SCALE</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-button expand="block" size="small">Log Stream</ion-button>
          </ion-col>
          <ion-col>
            <ion-button expand="block" size="small">Device Details</ion-button>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ion-button expand="block" size="small"
              >Force Disconnect</ion-button
            >
          </ion-col>
          <ion-col>
            <ion-button expand="block" size="small"
              >Mass Desctruction</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>
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
    IonButton,
  },
});
</script>

<style lang="css">
button {
  padding: 20px;
}
</style>