import { DataAttributesModule } from "./componentModules/dataAttributesModule.js";
import { EventAttributesModule } from "./componentModules/eventAttributesModule.js";
import { ForTemplateModule } from "./componentModules/forTemplateModule.js";
import { HtmlPatcherModule } from "./componentModules/htmlPatcherModule.js";
import { IfTemplateModule } from "./componentModules/ifTemplateModule.js";
import { RenderModule } from "./componentModules/renderModule.js";
import { StateModule } from "./componentModules/stateModule.js";
import { StyleModule } from "./componentModules/styleModule.js";
import { DependencyInjectionModule } from "./componentModules/dependencyInjectionModule.js";

export class Component extends HTMLElement {
  #modules = [
    new DependencyInjectionModule(),
    new StateModule(),
    new RenderModule(),
    new StyleModule(),
    new IfTemplateModule(),
    new ForTemplateModule(),
    new DataAttributesModule(),
    new EventAttributesModule(),
    new HtmlPatcherModule()
  ];

  connectedCallback() {
    this.runModules();
  }

  disconnectedCallback() {
    this.disposeModules();
  }

  disposeModules() {
    for (const module of this.#modules) {
      module.dispose?.(this);
    }
  }

  runModules() {
    const context = {
      component: this,
      template: undefined,
    };

    for (const module of this.#modules) {
      module.run(context);
    }
  }
}
