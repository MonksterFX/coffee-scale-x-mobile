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
          <ion-col> {{ toFixed(currentValue.top, 2) }} g </ion-col>
          <ion-col> {{ toFixed(currentValue.bottom, 2) }} g </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            {{ toFixed(currentValue.top * 3 + currentValue.bottom, 2) }} g
          </ion-col>
          <ion-col> {{ elapsedTime }} s </ion-col>
        </ion-row>
      </ion-grid>
      <ion-button expand="block" color="success" @click="startTimer">
        Start
      </ion-button>
      <ion-button expand="block" color="danger" @click="stopTimer">
        Stop
      </ion-button>
      <ion-button expand="block" @click="tare"> Tare </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { write } from "@/lib/ble/bluetooth";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
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
    IonButton,
  },
  methods: {
    toFixed(value: number, n: number) {
      return (value || 0).toFixed(n);
    },
    startTimer() {
      this.$store.commit("startTimer");
      write(
        "6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
        "6E400002-B5A3-F393-E0A9-E50E24DCCA9E",
        new Uint8Array([0xc1, 0x00])
      );
    },
    stopTimer() {
      this.$store.commit("stopTimer");
      // todo to libary for scale
      write(
        "6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
        "6E400002-B5A3-F393-E0A9-E50E24DCCA9E",
        new Uint8Array([0xc2, 0x00])
      );
    },
    tare() {
      // todo to libary for scale
      write(
        "6E400001-B5A3-F393-E0A9-E50E24DCCA9E",
        "6E400002-B5A3-F393-E0A9-E50E24DCCA9E",
        new Uint8Array([0xc0, 0x00])
      );
    },
  },
  computed: {
    elapsedTime() {
      const startTime = this.$store.state.startTime;
      const stopTime = this.$store.state.stopTime;

      // if brew is stoped
      if (stopTime > 0) {
        return ((stopTime - startTime) / 1000).toFixed(2);
      }

      // check if both times are set
      if (startTime && this.$store.state.currentValue.time) {
        return (
          (this.$store.state.currentValue.time - startTime) /
          1000
        ).toFixed(2);
      } else {
        return (0).toFixed(2);
      }
    },
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
