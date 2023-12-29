export const getEntries = (state) => state.entries;

export const getIsLoading = (state) => state.isLoading;

export const getRoute = (state) => state.route;

export const getSearchValue = (state) => state.searchValue;

export const getSelectedEntryData = (state) => state.entries.find(entry => entry.id === state.selectedEntryId);

export const getSelectedEntryId = (state) => state.selectedEntryId;

export const getTime = (state) => state.time;

export const searchEntries = (state) => state.entries.filter(item => item.text.toLowerCase().includes(state.searchValue.toLowerCase()));