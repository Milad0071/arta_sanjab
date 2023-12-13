/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import VueCookies from 'vue3-cookies'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import easySpinner from 'vue-easy-spinner';

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)
app.use(VueCookies);
app.use(VueSweetalert2);
app.use(easySpinner, {
    /*options*/
    prefix: 'easy',
});

registerPlugins(app)

app.mount('#app')
