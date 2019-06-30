import * as Yup from "yup"
import React from "react"
import Locale from "../../../locale"

export const initialValues = {
	username: "",
	password: "",
	email: "",
	confirmPassword: ""
}

function equalTo(ref, msg) {
	return this.test({
		name: "equalTo",
		exclusive: false,
		message: msg || "${path} must be the same as ${reference}",
		params: {
			reference: ref.path
		},
		test: function(value) {
			return value === this.resolve(ref)
		}
	})
}

Yup.addMethod(Yup.string, "equalTo", equalTo)

export const validationSchema = Yup.object().shape({
	username: Yup.string().required(Locale.registration.usernameRequired),
	password: Yup.string().required(Locale.registration.passwordRequired),
	email: Yup.string()
		.email(Locale.registration.invalidEmailError)
		.required(Locale.registration.emailRequired),
	confirmPassword: Yup.string()
		.equalTo(Yup.ref("password"), Locale.registration.passwordNotMatchError)
		.required(Locale.registration.confirmPasswordRequired)
})
