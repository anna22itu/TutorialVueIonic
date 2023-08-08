<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Camera actions</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-row>
        <ion-col col-1>
          <ion-button style="width:100%" @click="startVideoStream">Start video stream</ion-button>
        </ion-col>
        <ion-col col-2>
          <ion-button style="width:100%" color="danger" @click="stopVideoStream">Stop video stream</ion-button>
        </ion-col>
      </ion-row>
      <canvas style = "margin-left: 5%; margin-top: 5%; width: 60%; height: 70%; border-style: solid" id = "output"></canvas>
      <ion-list>
        <ion-item>
          <ion-select v-model="mode" interface="popover">
            <ion-select-option value="Normal">Normal</ion-select-option>
            <ion-select-option value="Shovel">Shovel</ion-select-option>
            <ion-select-option value="Scharr">Scharr</ion-select-option>
            <ion-select-option value="Laplacian">Laplacian</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-list>
        <ion-item>
          <ion-select v-model="mode" interface="popover">
            <ion-select-option value="Normal">Normal</ion-select-option>
            <ion-select-option value="Gray">Gray</ion-select-option>
            <ion-select-option value="Canny">Canny</ion-select-option>
            <ion-select-option value="Blued">Blued</ion-select-option>
            <ion-select-option value="Pinked">Pinked</ion-select-option>
          </ion-select>
        </ion-item>
        </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonItem, IonSelect, IonSelectOption, IonList } from '@ionic/vue';
import { defineComponent, ref, onMounted } from 'vue';
import cv from 'opencv.js';
import { useMQTT } from 'mqtt-vue-hook';
import { mqttHook } from 'mqtt-vue-hook/dist/hook';


export  default defineComponent({
  name: 'Tab2Page',
  components:{
    IonContent,IonHeader,IonPage,IonTitle,IonToolbar, IonRow, IonCol, IonItem, IonSelect, IonSelectOption, IonList
  }, 
  setup() {
    let mode = ref("Normal");
    const mqttHook = useMQTT()  
    onMounted(() => {
      // tenemos que registrar eventos en especifico
      mqttHook.registerEvent('"cameraService/IonicTutorial/videoFrame"', (topic, message) => {
        
        const img = new Image();
        img.src = "data:image/jpg;base64,"+message.toString;

        let dst = new cv.Mat();
        let source = cv.imread(img);

        cv.cvtColor(source, source, cv.COLOR_RGB2GRAY, 0);
        if (mode.value == "Normal") {
          dst = cv.imread(img);
        }

        if (mode.value == "Shovel") {
          cv.Sobel(source, dst, cv.CV_8U, 1, 0, 3, 1, 0, cv.BORDER_DEFAULT);
        }

        if (mode.value == 'Scharr') {
            cv.Scharr(source, dst, cv.CV_8U, 1, 0, 1, 0, cv.BORDER_DEFAULT);
        }

        if (mode.value == 'Laplacian') {
          cv.Laplacian(source, dst, cv.CV_8U, 1, 1, 0, cv.BORDER_DEFAULT);
        }

        if (mode.value == 'Gray') {
          dst = source;
        }

        if (mode.value == 'Canny') {
          let mat = cv.imread(img);
          dst = new cv.Mat();
          cv.cvtColor(mat, dst, cv.COLOR_RGB2GRAY,0);
          cv.Canny(mat, dst, 50, 100, 3, false);
          mat.delete()
        }

        if(mode.value == 'Blued'){
          let mat = cv.imread(img);
          dst = new cv.Mat();
          cv.cvtColor(mat, dst, cv.COLOR_RGB2XYZ,0);
          mat.delete()
        }
        
        if(mode.value == 'Pinked'){
          let mat = cv.imread(img);
          dst = new cv.Mat();
          cv.cvtColor(mat, dst, cv.COLOR_RGB2YCrCb,0);
          mat.delete()
        }
        cv.imshow('output', dst)
      })
    })
    function startVideoStream(){
      mqttHook.subscribe(["cameraService/IonicTutorial/videoFrame"], undefined, { description: "Images from video frame" });
      mqttHook.publish("IonicTutorial/cameraService/startVideoStream", "Start a video stream",1);
    }
    function stopVideoStream(){
      mqttHook.publish("IonicTutorial/cameraService/stopVideoStream", "Stop a video stream",1)
    }

    return {
      startVideoStream, stopVideoStream, mode
    }
  } 
});

</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
