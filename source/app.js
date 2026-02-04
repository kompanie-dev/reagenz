import { dependencyMap } from "./frameworkState.js";

export class App {
  static start({ components = [], containerElement, dependencies = [], mainComponent}) {
    for (const [iface, implementation] of dependencies) {
      dependencyMap.set(iface, implementation);
    }

    containerElement.setAttribute("framework", "@kompanie/reagenz@13.0.0");
    containerElement.append(new mainComponent());
  }
}
