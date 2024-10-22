import { Component } from "@kompanie/reagenz";

export class AboutPage extends Component {
    render() {
        return /*html*/`
            <div>
                <h1>About my Counter App</h1>
                <div>
                    This is the about page of my Counter App
                </div>
            </div>
        `;
    }
}

customElements.define("about-page", AboutPage);
