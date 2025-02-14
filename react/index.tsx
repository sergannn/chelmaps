import {FIRST_MARKER_PROPS, SECOND_MARKER_PROPS, LOCATION} from '../variables';
import {InfoMessage} from '../common';

window.map = null;

main();
async function main() {
    // For each object in the JS API, there is a React counterpart
    // To use the React version of the API, include the module @yandex/ymaps3-reactify
    const [ymaps3React] = await Promise.all([ymaps3.import('@yandex/ymaps3-reactify'), ymaps3.ready]);

    const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls} = reactify.module(ymaps3);
    const {useState} = React;

    // Import the package to add a default marker
    const {YMapDefaultMarker} = await reactify.module(await ymaps3.import('@yandex/ymaps3-default-ui-theme'));
    const {InfoMessage: InfoMessageR} = await reactify.module({InfoMessage});

    function App() {
        const [showPopupWithImage, setShowPopupWithImage] = useState(false);
        const [showPopupWithButtons, setShowPopupWithButtons] = useState(false);

        function PopupWithImage() {
            return (
                <div className="popup">
                    <img src="../waves.png" alt="waves" className="image" />

                    <div className="popup__content">
                        <div className="popup__text">
                            <div className="popup__text_title">Title of that pop up</div>
                            <div className="popup__text_content">
                                Some useful information about a place. You can add whatever you want: pictures, buttons,
                                different headings.
                            </div>
                        </div>
                        <button className="button" onClick={() => setShowPopupWithImage(false)}>
                            Close
                        </button>
                    </div>
                </div>
            );
        }

        function PopupWithButtons() {
            return (
                <div className="popup second_variant">
                    <div className="popup__text">
                        <div className="popup__text_title">Title of that pop up</div>
                        <div className="popup__text_content">
                            Some useful information about a place. You can add whatever you want: pictures, buttons,
                            different headings.
                        </div>
                    </div>
                    <div className="popup__buttons">
                        <div className="popup__buttons__block">
                            <button className="button" onClick={() => alert('Clicked!')}>
                                Button 1
                            </button>
                            <button className="button" onClick={() => alert('Clicked!')}>
                                Button 2
                            </button>
                        </div>
                        <button className="button_close" onClick={() => alert('Clicked!')}>
                            Primary Button
                        </button>
                    </div>
                    <button className="close_icon" onClick={() => setShowPopupWithButtons(false)} />
                </div>
            );
        }

        return (
            // Initialize the map and pass initialization parameters
            <YMap location={LOCATION} showScaleInCopyrights={true} ref={(x) => (map = x)}>
                {/* Add a map scheme layer */}
                <YMapDefaultSchemeLayer />
                {/* Add a layer of geo objects to display the markers */}
                <YMapDefaultFeaturesLayer />

                {/* Add a default marker with a popup window from the package to the map */}
                <YMapDefaultMarker
                    popup={{
                        content: PopupWithImage,
                        position: 'right',
                        show: showPopupWithImage
                    }}
                    onClick={() => setShowPopupWithImage(true)}
                    {...FIRST_MARKER_PROPS}
                />

                <YMapDefaultMarker
                    popup={{
                        position: 'right',
                        content: PopupWithButtons,
                        show: showPopupWithButtons
                    }}
                    onClick={() => setShowPopupWithButtons(true)}
                    {...SECOND_MARKER_PROPS}
                />

                <YMapControls position="top left">
                    <InfoMessageR text="Click on markers" />
                </YMapControls>
            </YMap>
        );
    }

    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('app')
    );
}
