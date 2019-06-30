/* Key: English, value: German */
const translation = {
	registration: {
		registrationSuccess:
			"Sie haben die Registrierung abgeschlossen, Sie werden nun auf die Startseite weitergeleitet...",
		username: "Benutzername",
		email: "Email-Adresse",
		password: "Passwort",
		confirmPassword: "Passwort bestätigen",
		usernameRequired: "Benutzername benötigt",
		passwordRequired: "Passwort benötigt",
		emailRequired: "E-Mail benötigt",
		confirmPasswordRequired: "Bitte bestätigen Sie das Passwort",
		passwordNotMatchError: "Passwort nicht korrekt",
		invalidEmailError: "Ungültige E-Mail-Adresse"
	},
	emailVerification: {
		verifyEmailAddress: "E-Mail-Adresse verifizieren",
		description:
			"Bitte geben Sie den Code, der an Ihre angegebene E-Mail-Adresse geschickt wurde, ein, um die Registrierung abzuschließen.",
		verificationCode: "Verifikations-Code:",
		verificationCodeError:
			"Verifikation fehlgeschlagen. Bitte überprüfen Sie den Verifikations-Code und versuchen Sie es erneut.",
		returnToRegistration: "Zurück zur Registrierung",
		verify: "Verifizieren"
	},
	projectNature: {
		parttime: "WerkstudentIn/ Teilzeitstelle",
		internship: "Praktikum",
		"quick-question": "Forumsfrage",
		thesis: "Bachelorarbeit",
		masterThesis: "Masterarbeit",
		voluntary: "Freiwillige Tätigkeit"
	},
	projectStatus: {
		open: "Offen",
		closed: "Geschlossen",
		completed: "Abgeschlossen"
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
		phoneNumberFormatError: "Telefonnummer hat ein ungültiges Format",
		plzError: "Postleitzahl sollte 5 Ziffern lang sein",
		positionError: "Die Politische Position muss länger als fünf Zeichen sein.",
		fieldRequiredError: name => `${name} benötigt`,
		blockMessage:
			"Sie müssen die benötigten persönlichen Informationen (mit einem * markiert) eingeben, bevor Sie sci-com.org nutzen können.",
		updateFailError:
			"Profiländerung kann nicht gespeichert werden. Bitte überprüfen Sie den Dateityp ihres Lebenslaufes und versuchen Sie es in ein paar Minuten erneut."
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
	changePasswordPrompt: {
		title: "Passwort ändern",
		originalPassword: "Altes Passwort",
		newPassword: "Neues Passwort",
		confirmPassword: "Neues Passwort bestätigen",

		changePasswordButton: "Passwort ändern",
		cancelButton: "Abbrechen"
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
		qualication: "Vorausgesetzte Qualifikation",
		partyMembership: "Bevorzugte Parteizugehörigkeit des Bewerbers",
		location: "Ort",
		question: "Fragen an den Bewerber",
		questionExplaination:
			"Bitte geben Sie Ihre Fragen an die Bewerber an. Sie finden die Antworten bei der zugehörigen Bewerbung. Sie können die Fragen nicht ändern nachdem das Projekt erstellt wurden. ",
		addAQuestionButton: "Frage hinzufügen",
		submitButton: "Projekt erstellen",
		questionPlaceholder: "Fragen an den Bewerber...",
		add: "Hinzufügen",
		cancel: "Abbrechen",
		updateButton: "Frage ändern"
	},
	quickQuestionPrompt: {
		title: "Fragestellung",
		description: "Detaillierte Beschreibung",
		ask: "Frage abschicken",
		update: "Update"
	},
	projectPage: {
		edit: "Bearbeiten",
		salary: "Bezahlung",
		workingHours: "Arbeitsstunden",
		tags: "Projekttags",

		closed: "closed",
		markAsClosed: "Als ‚geschlossen‘ markieren",
		markAsCompleted: "Mark as Completed",
		reopen: "Projekt wieder öffnen",

		addToBookmark: "Als Lesezeichen speichern",
		removeBookmark: "Lesezeichen entfernen",

		changesSaved: "Änderung gespeichert",

		apply: "Bewerben",
		unapply: "Bewerbung zurückziehen",

		delete: "Löschen",
		party: "Präferierte Parteizugehörigkeit",
		none: "Keine",
		answers: "Antworten",
		applications: "Bewerbungen",
		noApplicationsFound: "keine Bewerbungen vorhanden",
		about: "Projektbeschreibung",
		creator: "Ersteller"
	},
	applicationDetailsPopup: {
		title: name => `Bewerbung von ${name} Angenommen`,
		accepted: "Angenommen",
		accept: "Annehmen",
		reject: "Ablehnen",
		acceptRejectNotice: accepted =>
			`Die Bewerbung wurde ${accepted ? "angenommen" : "abgelehnt"}`,
		rejected: "Abgelehnt",
		answersToQuestion: "Antworten auf die Fragen",
		applicant: "Bewerber",
		acceptedMessage: "Diese Bewerbung wurde angenommen.",
		rejectedMessage: "Diese Bewerbung wurde abgelehnt."
	},
	deleteAccountPopup: {
		title: "Account-Löschung bestätigen",
		description:
			"Sie sind dabei, Ihren Account zu löschen. Sind Sie sich sicher?",
		delete: "Account löschen",
		cancel: "Abbrechen"
	},
	applicationPopup: {
		title: "Bitte beantworten Sie diese Fragen für Ihre Bewerbung",
		yourAnswerPlaceholder: "Ihre Antwort...",
		answerEmptyError: "Sie müssen eine Antwort eingeben",
		submit: "Abschicken"
	},
	homePage: {
		project: "Projekte",
		applications: "Bewerbungen",
		bookmarks: "Lesezeichen",
		download: "Herunterladen",
		editProfile: "Profil bearbeiten",
		createProjectButton: "Projekt erstellen",
		createQuickQuestionButton: "Forumsfrage erstellen"
	},
	searchPrompt: {
		searchTerm: "Suchanfrage",
		searchTermPlaceholder:
			"Suchanfrage (Name, Projekttitel, Studienfach, etc...)",
		search: "Suche",
		nature: "Projektart",
		salary: "Bezahlung",
		date: "Frühester Starttermin",
		chooseAnOption: "-- Bitte wählen Sie aus --",
		requiredSalary: "Nur nach Projekten mit Bezahlung suchen",
		notRequireSalary: "Nur nach Projekten ohne Bezahlung suchen",
		salaryDoesNotMatter: "Nach allen Projekten suchen"
	},
	searchResultPage: {
		searchResultFor: word => `Suchergebnisse für "${word}"`,
		users: "Benutzer",
		noResults: "Keine Ergebnisse",
		projects: "Projekte",
		errorWhileSearching:
			"Ein Fehler ist bei der Suche aufgetreten. Bitte versuchen Sie es in ein paar Minuten erneut."
	},
	confirmDeletePopup: {
		projectDeleted: "Projekt gelöscht",
		title: "Bestätigung der Projektlöschung",
		description:
			"Sie sind gerade dabei, dieses Projekt und alle damit verbundenen Bewerbungen und Lesezeichen zu löschen.",
		delete: "Projekt löschen",
		cancel: "Abbrechen"
	}
}

export default translation
