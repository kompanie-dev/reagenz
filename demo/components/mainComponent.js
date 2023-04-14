import { Component } from "../../index.js";

export class MainComponent extends Component {
    render() {
        return /*html*/`
            <h2>Time (Updated by Service)</h2>
            <time-display stateClass="TimeState"></time-display>
            <hr/>

            <h2>Counter</h2>
            <count-display stateClass="CounterState"></count-display>
            <counter-button stateClass="CounterState" modifier="1"></counter-button>
            <counter-button stateClass="CounterState" modifier="-1"></counter-button>
            <hr/>

            <h2>Color Picker</h2>
            <color-picker stateClass="ColorState"></color-picker>
            <color-preview stateClass="ColorState"></color-preview>
            <hr/>

            <h2>Attribute Change ▶︎ Re-Render Component</h2>
            <accordion-test state="open"></accordion-test>
            <hr/>

            <h2>Text</h2>
            <text-input stateClass="TextState"></text-input>
            <text-input stateClass="TextState"></text-input>
            <text-input-readonly stateClass="TextState"></text-input-readonly>
            <hr/>

            <h2>Same Component - Multiple Instances<h2>
            <transformation-display stateClass="TransformationState"></transformation-display>
            <point2d-input stateClass="TransformationState" stateName="position"></point2d-input>
            <point2d-input stateClass="TransformationState" stateName="rotation"></point2d-input>
            <point2d-input stateClass="TransformationState" stateName="scale"></point2d-input>
        `;
    }
}