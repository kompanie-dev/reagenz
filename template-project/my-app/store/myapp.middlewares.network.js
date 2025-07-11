import { loadCountSuccess, saveCountSuccess } from "./myapp.actions.js";

export const myAppNetworkMiddleware = (store, next, action) => {
	switch (action.type) {
		case "COUNT_LOAD_REQUEST":
			// setTimeout is used here to simulate network latency.
			// You don't need this in a real app.
			setTimeout(
				() => {
					const storageItem = localStorage.getItem("count") ?? 0;
					const count = Number.parseInt(storageItem, 10);

					store.dispatch(loadCountSuccess(count));
				}, 100);
			break;

		case "COUNT_SAVE_REQUEST":
			// setTimeout is used here to simulate network latency.
			// You don't need this in a real app.
			setTimeout(
				() => {
					localStorage.setItem("count", store.state.count);

					store.dispatch(saveCountSuccess());
				},
				100);
			break;

		// No Default
	}

	next();
};
