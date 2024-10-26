import { Component } from "@kompanie/reagenz";

export class LoadingIconComponent extends Component {
	render() {
		return /*html*/`
            <div class="loading-icon-ripple">
                <div></div>
                <div></div>
            </div>`;
	}

	styles = /*css*/`
		loading-icon {
			.loading-icon-ripple {
				display: inline-block;
				position: relative;
				width: 80px;
				height: 80px;
			}

			.loading-icon-ripple div {
				position: absolute;
				border: 4px solid #fff;
				opacity: 1;
				border-radius: 50%;
				animation: loading-icon-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
			}

			.loading-icon-ripple div:nth-child(2) {
				animation-delay: -0.5s;
			}
		}

		@keyframes loading-icon-ripple {
			0% {
				top: 36px;
				left: 36px;
				width: 0;
				height: 0;
				opacity: 0;
			}

			5% {
				top: 36px;
				left: 36px;
				width: 0;
				height: 0;
				opacity: 1;
			}

			100% {
				top: 0px;
				left: 0px;
				width: 72px;
				height: 72px;
				opacity: 0;
			}
		}
	`;
}

customElements.define("loading-icon", LoadingIconComponent);
