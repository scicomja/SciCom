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
		.min(8, "Title is too short")
		.required("Title is required"),
	nature: Yup.string()
		.oneOf(ProjectNature, "Please select the nature of the project")
		.required("Nature is required"),
	from: Yup.date().required(),
	to: Yup.date().when("from", (from, schema) => {
		return Yup.date().min(from)
	}),
	salary: Yup.number()
		.min(0, "Salary must be greater than 0")
		.required("Invalid number"),
	questions: Yup.array().of(Yup.string())
})
