
// https://ionic.io/ionicons
  
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import mqttVueHook from 'mqtt-vue-hook'
import mitt from 'mitt';
const emitter = mitt();

const app = createApp(App)
  .use(IonicVue)
  .use(router);
   

app.provide('emitter', emitter);
/*
app.use(mqttVueHook,'mqtt://localhost:8083',{
  clean:false,
  keepalive: 60,
  clientId:'IonicTutorial',
  connectTimeout:4000,

})*/
import { useMQTT } from 'mqtt-vue-hook'
const mqttHook = useMQTT()

mqttHook.connect('mqtt://localhost:8083', {
    clean: false,
    keepalive: 60,
    clientId: 'IonicTutorial',
    connectTimeout: 4000,
})

router.isReady().then(() => {
  app.mount('#app');
});