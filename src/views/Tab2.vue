<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>ScaleX Data</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">ScaleX Data</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-grid>
        <ion-row>
          <ion-col> {{ currentValue.top }} g </ion-col>
          <ion-col> {{ currentValue.bottom }} g </ion-col>
        </ion-row>
        <ion-row>
          <ion-col> {{ summary }} g </ion-col>
          <ion-col> {{ time }} s </ion-col>
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
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "Tab2",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
  },
  data() {
    return {
      summary: -1,
      time: 60,
    };
  },
  computed: {
    ...mapState(["currentValue"]),
  },
});
</script>
<style scoped>
ion-col {
  text-align: center;
  font-size: 2em;
  padding: 2.5rem 0px;
}
</style>
