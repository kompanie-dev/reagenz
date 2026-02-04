import { dependencyMap } from "../frameworkState.js";

export class DependencyInjectionModule {
  run(context) {
    const component = context.component;
    const requested = component.dependencies ?? {};
    const resolved = {};

    for (const [name, iface] of Object.entries(requested)) {
      const implementation = dependencyMap.get(iface);
      resolved[name] = implementation ?? iface;
    }

    component.dependencies = resolved;
  }
}
