import React from "react"
import { Card, CardBody, Button } from "reactstrap"
import Icon from "../components/icon"
import Locale from "../locale"

const style = {
	questionCardContent: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center"
	},
	questionCard: {
		margin: 16,
		backgroundColor: "rgb(5, 46, 78)",
		borderRadius: 8
	},
	questionInputContainer: {
		display: "flex",
		flexDirection: "column"
	},
	addQuestionButtonGroup: {
		marginTop: 8,
		width: "100%",
		display: "flex",
		justifyContent: "space-between"
	},

	addQuestionComponent: {
		flex: 1,
		marginLeft: 16,
		marginRight: 16
	}
}

export default function({
	question,
	index,
	values,
	setFieldValue,
	editingQuestion,
	content,

	removeQuestion,
	onEditQuestionChange,
	addQuestion,

	editing = false
}) {
	return (
		<Card body inverse style={style.questionCard} key={index}>
			{!editing && (
				<div style={style.questionCardContent}>
					<div style={{ flex: 1 }}>{question}</div>
					{!content && (
						<Button
							color="danger"
							onClick={() =>
								removeQuestion({
									question,
									values,
									setFieldValue
								})
							}>
							<Icon name="trash" />
						</Button>
					)}
				</div>
			)}
			{editing && (
				<CardBody style={style.questionInputContainer}>
					<input
						placeholder={Locale.projectForm.questionPlaceholder}
						onChange={e => onEditQuestionChange(e.target.value)}
					/>
					<div style={style.addQuestionButtonGroup}>
						<Button
							disabled={!editingQuestion.length}
							style={{
								...style.addQuestionComponent,
								backgroundColor: "green"
							}}
							onClick={() =>
								addQuestion({
									values,
									setFieldValue
								})
							}>
							{Locale.projectForm.add}
						</Button>
						<Button
							style={{
								...style.addQuestionComponent,
								backgroundColor: "rgb(200,200,200)"
							}}
							onClick={() => onEditQuestionChange(null)}>
							{Locale.projectForm.cancel}
						</Button>
					</div>
				</CardBody>
			)}
		</Card>
	)
}
