<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>ScaleX</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">ScaleX</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card>Top: {{ currentValues.top }}</ion-card>
      <ion-card>Bottom: {{ currentValues.bottom }}</ion-card>
      <ExploreContainer name="Tab 2 page" />
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
import ExploreContainer from "@/components/ExploreContainer.vue";

export default {
  name: "Tab2",
  components: {
    ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
  },
  data() {
    return {
      currentValues: { top: 0, bottom: 0 },
    };
  },
};
</script>