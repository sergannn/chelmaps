import {FIRST_MARKER_PROPS, SECOND_MARKER_PROPS, LOCATION} from '../variables';
import {InfoMessage} from '../common';

window.map = null;

async function main() {
    // For each object in the JS API, there is a Vue counterpart
    // To use the Vue version of the API, include the module @yandex/ymaps3-vuefy
    const [ymaps3Vue] = await Promise.all([ymaps3.import('@yandex/ymaps3-vuefy'), ymaps3.ready]);
    const vuefy = ymaps3Vue.vuefy.bindTo(Vue);
    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapControls} = vuefy.module(ymaps3);

    // Import the package to add a default marker
    const {YMapDefaultMarker} = await vuefy.module(await ymaps3.import('@yandex/ymaps3-default-ui-theme'));
    const {InfoMessage: InfoMessageV} = await vuefy.module({InfoMessage});

    const app = Vue.createApp({
        components: {
            YMap,
            YMapDefaultSchemeLayer,
            YMapDefaultFeaturesLayer,
            YMapMarker,
            YMapControls,
            YMapDefaultMarker,
            InfoMessageV
        },
        setup() {
            const popupWithImageOpen = Vue.ref(false);
            const popupWithButtonsOpen = Vue.ref(false);

            const refMap = (ref) => {
                window.map = ref?.entity;
            };

            const alertFunc = (message) => {
                alert(message);
            };

            return {
                refMap,
                LOCATION,
                FIRST_MARKER_PROPS,
                SECOND_MARKER_PROPS,
                popupWithImageOpen,
                popupWithButtonsOpen,
                alertFunc
            };
        },
        template: `
          <YMap :location="LOCATION" :showScaleInCopyrights="true" :ref="refMap">
            <!-- Add a map scheme layer -->
            <YMapDefaultSchemeLayer/>
            <!-- Add a layer of geo objects to display the markers -->
            <YMapDefaultFeaturesLayer/>

            <!-- Add a default marker with a popup window from the package to the map -->
            <YMapDefaultMarker
                v-bind="FIRST_MARKER_PROPS"
                @click="() => {
                  popupWithImageOpen = !popupWithImageOpen
                }"
                :popup="{position: 'right', show: popupWithImageOpen}"
            >
              <template #popupContent>
                <div class="popup">
                  <img src="../waves.png" alt="waves" class="image"/>
                  
                  <div class="popup__content">
                    <div class="popup__text">
                      <div class="popup__text_title">Title of that pop up</div>
                      <div class="popup__text_content">Some useful information about a place. You can add whatever you want:
                        pictures, buttons, different headings.
                      </div>
                    </div>
                    <button class="button" @click="close">
                      Close
                    </button>
                  </div>
                </div>
              </template>
            </YMapDefaultMarker>
            
            <YMapDefaultMarker
                v-bind="SECOND_MARKER_PROPS"
                @click="() => {
                  popupWithButtonsOpen = !popupWithButtonsOpen
                }"
                :popup="{position: 'right', show: popupWithButtonsOpen}"
            >
              <template #popupContent>
                <div class="popup second_variant">
                  <div class="popup__text">
                    <div class="popup__text_title">Title of that pop up</div>
                    <div class="popup__text_content">Some useful information about a place. You can add whatever you want: pictures, buttons, different headings.</div>
                  </div>
                  <div class="popup__buttons">
                    <div class="popup__buttons__block" @click.stop="() => alertFunc('Clicked!')">
                      <button class="button">
                        Button 1
                      </button>
                      <button class="button" @click.stop="() => alertFunc('Clicked!')">
                        Button 2
                      </button>
                    </div>
                    <button class="button_close" @click.stop="() => alertFunc('Clicked!')">
                      Primary Button
                    </button>
                  </div>
                  <button class="close_icon" @click="close"/>
                </div>
              </template>
            </YMapDefaultMarker>
            
            <YMapControls position="top left">
              <InfoMessageV text="Click on markers"/>
            </YMapControls>
          </YMap>
        `
    });
    app.mount('#app');
}
main();
