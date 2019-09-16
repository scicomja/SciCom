import * as Yup from "yup"
import moment from "moment"

export const serverURL =
	process.env.NODE_ENV == "production"
		? "https://api.scicom.sci-com.org"
		: "http://localhost:3000"

export const colors = {
	primary: "#3070b3",
	background: "#d9dadb",
}
// server-side definition
export const germanStates = [
	"Bayern",
	"Berlin",
	"Niedersachsen",
	"Baden-Württemberg",
	"Rheinland-Pfalz",
	"Sachsen",
	"Thüringen",
	"Hessen",
	"Nordrhein-Westfalen",
	"Sachsen-Anhalt",
	"Brandenburg",
	"Mecklenburg-Vorpommern",
	"Hamburg",
	"Schleswig-Holstein",
	"Saarland",
	"Bremen"
]

export const projectStatus = ["open", "active", "completed", "closed"]

export const projectType = [
	"internship",
	"thesis",
	"masterThesis",
	"parttime",
	"voluntary",
	"quick-question"
]

export const projectTypeDict = {
	internship: "Praktikum",
	thesis: "Bachelorarbeit",
	masterThesis: "Masterarbeit",
	parttime: "Teilzeitstelle",
	voluntary: "Freiwilliges Projekt",
	"quick-question": "Forumsfrage"
}

export const applicationStatus = ["pending", "accepted", "rejected"]

export const Mode = {
	REGISTER_POLITICIAN: "REGISTER_POLITICIAN",
	REGISTER_PHD: "REGISTER_PHD",
	LOGIN: "LOGIN"
}

export const ModalMode = {
	// when one creates / modifies / view project
	PROJECT_DETAILS: "PROJECT_DETAILS",
	QUICK_QUESTIONS: "QUICK_QUESTIONS",
	// only when user updates their profile
	USER_DETAILS: "USER_DETAILS"
}

export const Icon = {
	email: "at",
	phone: "phone",
	linkedin: "linkedin",
	project: "wrench",
	bookmark: "bookmark",
	application: "edit",

	// search filters' icon
	name: "person",
	salary: "money",
	title: "tag",
	state: "pin"
}

// alias
export const ProjectNature = projectType

export const defaultIconPath =
	"data:image/png;base64,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"
