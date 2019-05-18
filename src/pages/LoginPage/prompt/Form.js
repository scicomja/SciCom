import * as Yup from "yup"
import React from "react"

export const initialValues = {
	username: "",
	password: "",
	email: "",
	confirmPassword: ""
}

export const validationSchema = Yup.object().shape({
	username: Yup.string().required(),
	password: Yup.string().required(),
	email: Yup.string()
		.email("Invalid email")
		.required(),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password"), null], "Password does not match")
		.required()
})
