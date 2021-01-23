<template>
  <ion-card>
    <ion-card-header>{{ device.name }}</ion-card-header>
    <ion-card-content>{{ device.address }}</ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "DeviceComponent",
  props: { device: Object },
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
  },
});
</script>

<style scoped>
</style>