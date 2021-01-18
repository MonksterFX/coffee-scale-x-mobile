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
      </ion-header>
      <ion-card>
        <ion-card-content> Connection Status </ion-card-content>
      </ion-card>
      <ul>
        <li v-for="device in devices" v-bind:key="device.id">{{ device }}</li>
      </ul>
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
  IonCard,
} from "@ionic/vue";

export default {
  name: "Debug",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
  },
};
</script>