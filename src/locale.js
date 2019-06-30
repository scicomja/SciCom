/* Key: English, value: German */
const translation = {
	projectNature: {
		parttime: "WerkstudentIn/ Teilzeitstelle",
		internship: "Praktikum",
		"quick-question": "Forumsfrage",
		thesis: "Bachelorarbeit",
		voluntary: "Freiwillige Tätigkeit"
	},
	userAttributes: {
		firstName: "Vorname",
		lastName: "Nachname",
		phone: "Telefonnummer",
		city: "Stadt/Gemeinde",
		workingPhone: "Büronummer",
		position: "Politische Position",
		CV: "Lebenslauf",
		party: "Parteizugehörigkeit",
		duty: "Beruf",
		PLZ: "Postleitzahl",
		state: "Bundesland",
		download: "Herunterladen",
		title: "Akademischer Titel",
		website: "Website",
		linkedIn: "LinkedIn",
		semester: "Semester",
		university: "University",
		major: "Major"
	},
	header: {
		search: "Suche",
		logout: "Ausloggen",
		aboutus: "Über uns"
	},
	newsPageCard: {
		day: plural => (plural ? "Tagen" : "Tag"),
		month: plural => (plural ? "Monaten" : "Monat"),
		hour: plural => (plural ? "Stunden" : "Stunde"),
		minute: plural => (plural ? "Minuten" : "Minute"),
		recently: "Gerade eben"
	},
	newsPage: {
		title: "Neueste Projekte"
	},
	editInfoPage: {
		title: "Profil bearbeiten",
		clickToEdit: "Klicken zum Ändern",
		changePasswordButton: "Passwort ändern",
		deleteAccountButton: "Account löschen",
		saveButton: "Speichern",
		blockMessage:
			"Sie müssen die benötigten persönlichen Informationen (mit einem * markiert) eingeben, bevor Sie sci-com.org nutzen können."
	},
	loginForm: {
		username: "Ihren Benutzername",
		password: "Ihr Passwort"
	},
	registerForm: {
		title: "Account erstellen",
		register: "Registrieren",
		cancel: "Abbrechen",
		politicianTitle: "Als PolitikerIn registrieren",
		studentTitle: "Als StudentIn registrieren"
	},
	resetPasswordPrompt: {
		title: "Passwort zurücksetzen",
		resetExplanation:
			"Bitte geben Sie die E-Mail-Adresse des Accounts ein, für den Sie das Passwort zurücksetzen wollen. Sie erhalten dann einen Verifikations-Code.",
		email: "E-Mail-Adresse",
		sendRequestCode: "Verifikations-Code zuschicken",
		invalidEmailAddress: "Ungültige E-Mail-Adresse",
		passwordResetSuccessfulText:
			"Ihr Passwort wurde zurückgesetzt. Sie können sich nun mit dem neuen Passwort anmelden.",
		changePasswordText: "Passwort ändern",
		password: "Neues Passwort",
		verificationCode: "Verifikations-Code",
		confirmPassword: "Neues Passwort bestätigen",
		errorCodeMessage:
			"Code kann nicht verifiziert werden. Bitte schließen Sie dieses Popup und versuchen Sie es erneut."
	},
	projectForm: {
		title: "Titel",
		createProject: "Neues Projekt erstellen",
		createQuickQuestion: "Neue Forumsfrage erstellen",

		description: "Beschreibung",
		descriptionNotice:
			"Bitte geben Sie eine Projektbeschreibung und/oder laden Sie eine Zusatzdatei hoch",
		file: "Zusätzliche Datei",
		nature: "Projekttyp",
		from: "Frühester Starttermin",
		to: "Spätester Endtermin",
		tags: "Suchtags (bitte mit Komma trennen)",
		salary: "Gehalt (€ pro Monat)",
		workingHours: "Arbeitszeit (pro Woche)",
		qualication: "Mindestqualifikation",
		partyMembership: "Bevorzugte Parteizugehörigkeit des Bewerbers",
		location: "Ort",
		question: "Fragen an den Bewerber",
		questionExplaination:
			"Bitte geben Sie Ihre Fragen an die Bewerber an. Sie finden die Antworten bei der zugehörigen Bewerbung. Sie können die Fragen nicht ändern nachdem das Projekt erstellt wurden. "
	},

	projectPage: {},
	homePage: {
		project: "Projekte",
		applications: "Bewerbungen",
		editProfile: "Profil bearbeiten",
		createProjectButton: "Projekt erstellen",
		createQuickQuestionButton: "Forumsfrage erstellen"
	}
}

export default translation
