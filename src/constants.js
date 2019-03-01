import * as Yup from 'yup'
import moment from 'moment'

export const serverURL = (process.env.NODE_ENV == 'production')?
  "https://api.scicom.travistang.rocks"
  :
  "http://localhost:3000"

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

export const projectStatus = [
  "open",
  "active",
  "completed",
  "closed"
]

export const projectType = [
  'internship',
  'thesis',
  'parttime',
  'voluntary',
  'quick-question'
]
export const applicationStatus = [
  "pending",
  "accepted",
  "rejected"
]

export const Mode = {
  REGISTER_POLITICIAN: "REGISTER_POLITICIAN",
  REGISTER_PHD: "REGISTER_PHD",
  LOGIN: "LOGIN"
}

export const SearchMode = {
  STUDENT: "STUDENT",
  POLITICIAN: "POLITICIAN",
  PROJECT: "PROJECT",
}
export const ModalMode = {
  SEARCH_PROJECT: "SEARCH_PROJECT",
  SEARCH_USER: "SEARCH_USER",

  // when one creates / modifies / view project
  PROJECT_DETAILS: "PROJECT_DETAILS",
  // only when user updates their profile
  USER_DETAILS: "USER_DETAILS"
}

export const Icon = {
  "email": "at",
  "phone": "phone",
  "linkedin": "linkedin",
  "project": "wrench",
  "bookmark": "bookmark",
  "application": "edit",

  // search filters' icon
  name: 'person',
  salary: 'money',
  title: 'tag',
  state: 'pin'
}

// alias
export const ProjectNature = projectType

export const SearchInitialValue = {
  [SearchMode.STUDENT]: {
    name: "",
    city: "",
    state: "",
    title: "",
    major: "",
    university: "",
  },
  [SearchMode.PROJECT]: {
    title: "",
    city: "",
    state: "",
    title: "",
    major: "",
    salary: 0,
    from: null
  },
  [SearchMode.POLITICIAN]: {
    title: "",
    city: "",
    state: "",
    title: "",
    position: "",
  }
}
export const SearchValidationSchema = {
  [SearchMode.STUDENT]: Yup.object().shape({
    name: Yup.string()
      .min(3, "Search name is too short"),
    city: Yup.string()
      .min(3, "Search term is too short"),
    state: Yup.string()
      .oneOf(germanStates),
    title: Yup.string()
      .min(3, "Search term is too short"),
    major: Yup.string()
      .min(3, "Search term is too short"),
    university: Yup.string()
      .min(3, "Search term is too short")
  }),
  [SearchMode.PROJECT]: Yup.object().shape({
    title: Yup.string()
      .min(3, "Search name is too short"),
    status: Yup.string()
      .oneOf(projectStatus),
    nature: Yup.string()
      .oneOf(projectType),
    topic: Yup.string()
      .min(3, "Search name is too short"),
    city: Yup.string()
      .min(3, "Search term is too short"),
    state: Yup.string()
      .oneOf(germanStates),
    salary: Yup.number()
      .min(0, "Salary must be greater than 0")
  }),
  [SearchMode.POLITICIAN]: Yup.object().shape({
    name: Yup.string()
      .min(3, "Search name is too short"),
    city: Yup.string()
      .min(3, "Search term is too short"),
    state: Yup.string()
      .oneOf(germanStates),
    title: Yup.string()
      .min(3, "Search term is too short"),
    position: Yup.string()
      .min(3, "Search term is too short"),
  })
}

export const ProjectSearchPayloadValidator = Yup.object()
  .shape({
    name: Yup.string().min(3, "Search term is too short")
          .required("Search term is required")
  })
