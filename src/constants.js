import * as Yup from 'yup'

export const serverURL = "http://localhost:3000"
export const Mode = {
  REGISTER_POLITICIAN: "REGISTER_POLITICIAN",
  REGISTER_PHD: "REGISTER_PHD",
  LOGIN: "LOGIN"
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
  "application": "edit"

}

export const ProjectNature = [
  'internship',
  'thesis',
  'parttime',
  'voluntary'
]

export const InitialProjectSearchPayload = {
  "name": ""
}

export const ProjectSearchPayloadValidator = Yup.object()
  .shape({
    name: Yup.string().min(3, "Search term is too short")
          .required("Search term is required")
  })
