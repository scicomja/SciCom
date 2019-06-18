import { authorizedGet, authorizedPost } from "./user"
import { serverURL, projectType } from "../constants"
import * as Yup from "yup"

export const salaryOptions = {
	REQUIRED: "Required",
	NOT_REQUIRED: "Not Required",
	DOES_NOT_MATTER: "Does not matter"
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
