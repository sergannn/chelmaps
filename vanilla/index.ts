import {
  FIRST_MARKER_PROPS,
  LOCATION,
  SECOND_MARKER_PROPS,
} from "../variables";
import { InfoMessage } from "../common";

window.map = null;

main();
async function main() {
  // Waiting for all api elements to be loaded
  await ymaps3.ready;
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapControls,
  } = ymaps3;

  // Import the package to add a default marker
  const { YMapDefaultMarker } = await ymaps3.import(
    "@yandex/ymaps3-default-ui-theme"
  );

  let popupWithImage = null;
  let popupWithButtons = null;

  // Create a custom popup
  const PopupWithImage = () => {
    const popupElement = document.createElement("div");
    popupElement.classList.add("popup");

    const imageElement = document.createElement("img");
    imageElement.src = "../waves.png";
    imageElement.alt = "waves";
    imageElement.classList.add("image");

    const popupContentElement = document.createElement("div");
    popupContentElement.classList.add("popup__content");

    const popupElementText = document.createElement("div");
    popupElementText.classList.add("popup__text");

    const popupElementTextTitle = document.createElement("div");
    popupElementTextTitle.classList.add("popup__text_title");
    popupElementTextTitle.textContent = "Title of that pop up";
    popupElementText.appendChild(popupElementTextTitle);

    const popupElementTextContent = document.createElement("div");
    popupElementTextContent.classList.add("popup__text_content");
    popupElementTextContent.textContent =
      "Some useful information about a place. You can add whatever you want: pictures, buttons, different headings.";
    popupElementText.appendChild(popupElementTextContent);

    const buttonElement = document.createElement("button");
    buttonElement.onclick = () => {
      popupWithImage.update({
        popup: {
          show: false,
        },
      });
    };
    buttonElement.classList.add("button");
    buttonElement.textContent = "Close";

    popupContentElement.appendChild(imageElement);
    popupContentElement.appendChild(popupElementText);

    popupElement.appendChild(popupContentElement);
    popupElement.appendChild(buttonElement);

    return popupElement;
  };

  // Create a custom popup
  const PopupWithButtons = () => {
    const popupElement = document.createElement("div");
    popupElement.classList.add("popup", "second_variant");

    const popupElementText = document.createElement("div");
    popupElementText.classList.add("popup__text");

    const popupElementTextTitle = document.createElement("div");
    popupElementTextTitle.classList.add("popup__text_title");
    popupElementTextTitle.textContent = "Title of that pop up";
    popupElementText.appendChild(popupElementTextTitle);

    const popupElementTextContent = document.createElement("div");
    popupElementTextContent.classList.add("popup__text_content");
    popupElementTextContent.textContent =
      "Some useful information about a place. You can add whatever you want: pictures, buttons, different headings.";
    popupElementText.appendChild(popupElementTextContent);

    const popupButtonsElement = document.createElement("div");
    popupButtonsElement.classList.add("popup__buttons");

    const popupButtonsBlockElement = document.createElement("div");
    popupButtonsBlockElement.classList.add("popup__buttons__block");

    const buttonElementFirst = document.createElement("button");
    buttonElementFirst.classList.add("button");
    buttonElementFirst.textContent = "Button 1";
    buttonElementFirst.onclick = () => {
      alert("Clicked!");
    };

    const buttonElementSecond = document.createElement("button");
    buttonElementSecond.classList.add("button");
    buttonElementSecond.textContent = "Button 2";
    buttonElementSecond.onclick = () => {
      alert("Clicked!");
    };

    popupButtonsBlockElement.appendChild(buttonElementFirst);
    popupButtonsBlockElement.appendChild(buttonElementSecond);

    const buttonElement = document.createElement("button");
    buttonElement.classList.add("button_close");
    buttonElement.textContent = "Primary Button";
    buttonElement.onclick = () => {
      alert("Clicked!");
    };

    const closeIconElement = document.createElement("button");
    closeIconElement.classList.add("close_icon");
    closeIconElement.onclick = () => {
      popupWithButtons.update({
        popup: {
          show: false,
        },
      });
    };

    popupButtonsElement.appendChild(popupButtonsBlockElement);
    popupButtonsElement.appendChild(buttonElement);

    popupElement.appendChild(popupElementText);
    popupElement.appendChild(popupButtonsElement);
    popupElement.appendChild(closeIconElement);

    return popupElement;
  };

  // Initialize the map
  map = new YMap(
    // Pass the link to the HTMLElement of the container
    document.getElementById("app"),
    // Pass the map initialization parameters
    { location: LOCATION, showScaleInCopyrights: true },
    [
      // Add a map scheme layer
      new YMapDefaultSchemeLayer({}),
      // Add a layer of geo objects to display the markers
      new YMapDefaultFeaturesLayer({}),
    ]
  );

  popupWithImage = new YMapDefaultMarker({
    ...FIRST_MARKER_PROPS,
    onClick() {
      popupWithImage.update({ popup: { show: true } });
    },
    popup: { content: PopupWithImage, position: "right" },
  });

  popupWithButtons = new YMapDefaultMarker({
    ...SECOND_MARKER_PROPS,
    onClick() {
      popupWithButtons.update({ popup: { show: true } });
    },
    popup: { content: PopupWithButtons, position: "right" },
  });

  map
    // Add a default marker with a popup window from the package to the map
    .addChild(popupWithImage)
    .addChild(popupWithButtons);

  map.addChild(
    // Using YMapControls you can change the position of the control
    new YMapControls({ position: "top left" })
      // Add the geolocation control to the map
      .addChild(
        new InfoMessage({
          text: "Click on markers",
        })
      )
  );
}
