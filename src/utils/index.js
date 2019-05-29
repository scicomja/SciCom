import * as moment from "moment"
export const delay = ms =>
	new Promise((resolve, _) => {
		setTimeout(resolve, ms)
	})

export const formatDate = date => moment(new Date(date)).format("DD.MM.YYYY")
