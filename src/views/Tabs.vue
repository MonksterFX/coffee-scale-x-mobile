<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="triangle" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="scale" href="/scale">
          <ion-icon :icon="ellipse" />
          <ion-label>App</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="debug" href="/debug">
          <ion-icon :icon="square" />
          <ion-label>Debug</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
} from "@ionic/vue";
import { ellipse, square, triangle } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Tabs",
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      ellipse,
      square,
      triangle,
    };
  },
});
</script>