import React from "react"
import { Button } from "reactstrap"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { ReactstrapInput, ReactstrapSelect } from "reactstrap-formik"
import Locale from "../locale"

import {
	quickQuestionInitalValues,
	quickQuestionValidationSchema
} from "../backend/project"

import * as _ from "lodash"

const style = {
	submitButton: {
		backgroundColor: "green"
	}
}
export default function({ content, onSubmit }) {
	return (
		<Formik
			enableReinitialize
			initialValues={quickQuestionInitalValues(content)}
			validationSchema={quickQuestionValidationSchema}>
			{({ values, isValid, errors, dirty, isSubmitting }) => (
				<Form>
					<Field
						name="title"
						label={Locale.quickQuestionPrompt.title}
						type="text"
						component={ReactstrapInput}
					/>
					<Field
						type="textarea"
						label={Locale.quickQuestionPrompt.description}
						name="description"
						component={ReactstrapInput}
					/>
					<Button
						block
						style={style.submitButton}
						onClick={() => onSubmit(values)}
						disabled={isSubmitting || !_.isEmpty(errors) || !dirty || !isValid}
						type="submit">
						{!!content
							? Locale.quickQuestionPrompt.update
							: Locale.quickQuestionPrompt.ask}
					</Button>
				</Form>
			)}
		</Formik>
	)
}
