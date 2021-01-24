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
      <h1>Connection</h1>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-button expand="block" size="small">Log Stream</ion-button>
          </ion-col>
          <ion-col>
            <ion-button expand="block" size="small">Device Details</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
      <h1>Calibration</h1>
      <p>Please refer to documentation how to calibrate your scale!</p>
      <ion-segment @ionChange="segmentChanged($event)">
        <ion-segment-button value="top">
          <ion-label>Top Scale</ion-label>
        </ion-segment-button>
        <ion-segment-button value="bottom">
          <ion-label>Bottom Scale</ion-label>
        </ion-segment-button>
      </ion-segment>
      <ion-input placeholder="Calibration Weight"></ion-input>
      <ion-button> Calibrate Now </ion-button>
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
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
  IonLabel,
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
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonSegment,
    IonSegmentButton,
    IonLabel,
  },
});
</script>

<style lang="css">
button {
  padding: 20px;
}
</style>