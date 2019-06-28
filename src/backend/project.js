import * as Yup from "yup"
import * as moment from "moment"
import { ProjectNature } from "../constants"

export const initialValues = content => {
	const formatDate = date =>
		moment(date)
			.startOf("day")
			.toISOString()
	const tomorrow = moment()
		.add(1, "day")
		.endOf("day")
	const now = formatDate(tomorrow.toDate())
	if (!content)
		return {
			title: "",
			description: "",
			file: null,
			from: now,
			to: null,
			nature: ProjectNature[0],
			salary: 0,
			workingHours: 0,
			questions: [],
			tags: []
		}
	const { from, to } = content
	const result = {
		tags: [], // to fill in the missing tags input for the previous records
		...content,
		from: formatDate(from),
		to: formatDate(to)
	}
	return result
}

export const validationSchema = Yup.object().shape({
	title: Yup.string()
		.min(8, "Projektname ist zu kurz.")
		.required("Projektname benötigt."),
	nature: Yup.string()
		.oneOf(ProjectNature, "Bitten den Projekttyp auswählen.")
		.required("Projekttyp benötigt."),
	from: Yup.date().required(),
	to: Yup.date().when("from", (from, schema) => {
		return Yup.date().min(from)
	}),
	salary: Yup.number()
		.min(0, "Bezahlung muss mehr als 0€ sein.")
		.required("Ungültige Eingabe"),

	workingHours: Yup.number()
		.min(0, "Arbeitstunden müssen mehr als 0 Stunden sein.")
		.required("Ungültige Eingabe"),
	qualification: Yup.string(),
	partyMembership: Yup.string(),
	location: Yup.string(),

	questions: Yup.array().of(Yup.string())
})

export const quickQuestionInitalValues = content => {
	if (!content) {
		return { title: "", description: "" }
	} else {
		return content
	}
}

export const quickQuestionValidationSchema = Yup.object().shape({
	title: Yup.string()
		.min(8, "Name ist zu kurz")
		.required("Name benötigt")
})

export const qualificationOptions = {
	Keine: "Keine",
	Bachelor: "Bachelor",
	Master: "Master"
}
