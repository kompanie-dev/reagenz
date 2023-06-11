import { Accordion } from "./components/accordion.js";
import { MainComponent } from "./components/mainComponent.js";
import { ColorPicker } from "./components/colorPicker.js";
import { ColorPreview } from "./components/colorPreview.js";
import { CountDisplay } from "./components/countDisplay.js";
import { CounterButton } from "./components/counterButton.js";
import { Point2DInput } from "./components/point2DInput.js";
import { TextInput } from "./components/textInput.js";
import { TextInputReadonly } from "./components/textInputReadonly.js";
import { TimeDisplay } from "./components/timeDisplay.js";
import { TransformationDisplay } from "./components/transformationDisplay.js";

import { ColorState } from "./states/colorState.js";
import { CounterState } from "./states/counterState.js";
import { TextState } from "./states/textState.js";
import { TimeState } from "./states/timeState.js";
import { TransformationState } from "./states/transformationState.js";

import { LocalStorageStore } from "../index.js";
import { Reagenz } from "../index.js";

Reagenz.registerComponents(
    ["accordion-test", Accordion],
    ["color-picker", ColorPicker],
    ["color-preview", ColorPreview],
    ["count-display", CountDisplay],
    ["counter-button", CounterButton],
    ["main-component", MainComponent],
    ["text-input", TextInput],
    ["text-input-readonly", TextInputReadonly],
    ["point2d-input", Point2DInput],
    ["time-display", TimeDisplay],
    ["transformation-display", TransformationDisplay]
);

Reagenz.startApp(
    MainComponent,
    [
        new ColorState(new LocalStorageStore("colorState")),
        new CounterState(new LocalStorageStore("countState")),
        new TextState(new LocalStorageStore("textState")),
        new TimeState(new LocalStorageStore("timeState")),
        new TransformationState(new LocalStorageStore("transformationState"))
    ],
    true
);

Reagenz.enableDevMode();