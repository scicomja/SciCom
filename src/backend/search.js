import { authorizedGet, authorizedPost } from "./user"
import { serverURL } from "../constants"
import * as Yup from "yup"

export const salaryOptions = {
 	"REQUIRED": "Required",
 	"NOT_REQUIRED": "Not Required",
	"DOES_NOT_MATTER": "Does not matter"
}

export const initialValues = {
	searchTerm: "",
	salary: null,
	date: new Date()
}

export const validationSchema = Yup.object().shape({
	searchTerm: Yup.string(),
	salary: Yup.string().oneOf(Object.keys(salaryOptions)),
	date: Yup.date()
})
export const searchUser = async (params, token, page = 1) => {
	return await authorizedGet(`${serverURL}/user/`, token, {
		...params,
		page
	})
}

export const searchProject = async (params, token, page = 1) => {
	console.log("search with payload", params)
	return await authorizedGet(`${serverURL}/project/`, token, {
		...params,
		page
	})
}

export const search = async (form, token, page = 1) => {
	return await authorizedPost(`${serverURL}/search`, { ...form }, token)
}
