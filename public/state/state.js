"use strict";

export default {
	INITIALIZE_LIST: {
		isFetchingData: false,
		error: "",
		listData: { data: [], metadata: {} },
		detailsData: { currency: { data: [] }, btc: { data: [] } },
		selectedId: "",
		currency: "USD",
		shouldUpdateList: true,
		shouldUpdateDetails: true,
	}
};
