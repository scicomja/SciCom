import React from "react"
import { Badge } from "reactstrap"
import Locale from "../locale"
export default function({ status, ...props }) {
	let color = "info"
	switch (status) {
		case "open":
			color = "success"
			break
		case "closed":
			color = "danger"
			break
	}
	return (
		<Badge {...props} color={color}>
			{" "}
			{Locale.projectStatus[status]}{" "}
		</Badge>
	)
}
