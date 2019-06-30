import { authorizedGet, authorizedPost } from "./user"
import { serverURL, projectType } from "../constants"
import * as Yup from "yup"
import Locale from "../locale"
export const salaryOptions = {
	REQUIRED: Locale.searchPrompt.requiredSalary,
	NOT_REQUIRED: Locale.searchPrompt.notRequireSalary,
	DOES_NOT_MATTER: Locale.searchPrompt.salaryDoesNotMatter
}

export const initialValues = {
	searchTerm: "",
	salary: null,
	date: new Date(),
	type: null
}

export const validationSchema = Yup.object().shape({
	searchTerm: Yup.string(),
	salary: Yup.string().nullable(),
	date: Yup.date(),
	type: Yup.string().oneOf(projectType)
})

export const search = async (form, token, page = 1) => {
	return await authorizedPost(`${serverURL}/search`, { ...form }, token)
}
