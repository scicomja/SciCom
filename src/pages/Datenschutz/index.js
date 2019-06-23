import React from "react"

export default class DatenSchutz extends React.Component {
	render() {
		return (
			<div style={style.container}>
				<h3 style={style.title}>Datenschutzerklärung</h3>
				<p style={style.paragraph}>
					Diese Datenschutzerklärung (Informationspflicht nach Art. 13, 14
					Datenschutz-Grundverordnung DSGVO) bezieht sich auf die Verarbeitung
					personenbezogener Daten im Rahmen dieses Internetauftritts.
				</p>
				<h4>Verantwortliche Stelle</h4>
				<p style={style.paragraph}>
					Technische Universität München
					<br />
					Arcisstraße 21
					<br />
					80333 München
					<br />
					Telefon: +4989289-01
					<br />
				</p>
				<h4>Datenschutzbeauftragter der Technischen Universität München</h4>
				<p style={style.paragraph}>
					Prof. Dr. Uwe Baumgarten
					<br />
					Arcisstraße 21
					<br />
					80333 München
					<br />
					E-Mail: beauftragter(at)datenschutz.tum.de
					<br />
					Weitere Kontaktdaten finden Sie auf www.datenschutz.tum.de. <br />
				</p>
				<h4>Zweck der Datenverarbeitung</h4>
				<p style={style.paragraph}>
					Die Website, über welche die Daten erhoben werden, dient der
					Kontaktherstellung zwischen Studenten/Doktoranden und politisch
					aktiven Personen. Die Daten werden somit erhoben, um ein optimales
					Matching der Interessen von Studenten/Doktoranden und politisch
					aktiven Personen sicherzustellen. Auch die Seriosität der Plattform
					wird damit zu einem gewissen Grad sichergestellt. Im weitesten Sinne
					handelt es sich hierbei also um eine Matching-Plattform.Die
					anonymisierten Daten dienen in einem nächsten Schritt der
					Erfolgsmessung einer derartigen Plattform. Nutzerzahlen und Erfolg des
					Matchings sind hierbei wichtige Parameter.
				</p>
				<h4>Rechtsgrundlage für die Verarbeitung personenbezogener Daten</h4>
				<p style={style.paragraph}>
					Für die Verarbeitung personenbezogener Daten zur sinnvollen Betreibung
					der Internetplattform wird zu Beginn eine Einwilligung der Nutzer
					eingeholt (Art 6 Abs. 1, Buchst. a, DSGVO).
				</p>
				<h4>Rechte der betroffenen Person</h4>
				<p style={style.paragraph}>
					Soweit Ihre personenbezogenen Daten verarbeitet werden, haben
					diesbezüglich im Grundsatz nachfolgende Rechte:
					<ul>
						<li>
							Auskunft über Ihre bei uns gespeicherten Daten und deren
							Verarbeitung (Art. 15 DSGVO),
						</li>
						<li>
							Berichtigung/Vervollständigung unrichtiger personenbezogener Daten
							(Art. 16 DSGVO),
						</li>
						<li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
						<li>
							Einschränkung der Datenverarbeitung, sofern wir Ihre Daten
							aufgrund gesetzlicher Pflichten noch nicht löschen dürfen (Art. 18
							DSGVO),
						</li>
						<li>
							Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21
							DSGVO).
						</li>
						<li>
							Einschränkungen und Modifikationen der vorgenannten Rechte können
							sich aus Art. 9 und 10 BayDSG sowie aus Art. 20 BayDSG ergeben.
						</li>
					</ul>
					Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese
					jederzeit mit Wirkung für dieZukunft widerrufen (Team SciCom der TUM:
					Junge Akademie; Technische Universität München, Arcisstr. 21, 80333
					München; E-Mail: insights(at)ja.tum.de). Sie können sich jederzeit mit
					einer Beschwerde an die für Sie zuständige Aufsichtsbehörde wenden.
					Die zuständige Datenschutzaufsichtsbehörde für die Technische
					Universität München ist: <br />
					Der Bayerische Landesbeauftragte für den Datenschutz,
					<br />
					Prof. Dr. Thomas Petri, <br />
					Wagmüllerstraße 18, 80538 München, <br />
					E-Mail: poststelle(at)datenschutz-bayern.de <br />
					Telefon: 089 212672-0 <br />
					https://www.datenschutz-bayern.de <br />
				</p>
				<h4>Technische Umsetzung</h4>
				<p style={style.paragraph}>
					Die Webserver von sci-com.org (im Folgenden SciCom) werden von Amazon
					Web Services (im Folgenden aws), einem zu Amazon, Inc. gehörendem
					Unternehmen, zur Verfügung gestellt. Alle Instanzen werden in der
					“Region EU Central” und damit physisch in Frankfurt am Main,
					Deutschland ausgeführt. Wenn Sie SciCom aufrufen, übermitteln Sie über
					Ihren Internetbrowser Daten an unseren Webserver. <br /> <br />
					<h5 style={{ fontWeight: "bold" }}>Amazon Web Services, Inc. </h5>
					410 Terry Avenue North <br />
					Seattle WA 98109 <br />
					United States <br />
					Amazon Web Services, Inc. ist eine nach dem Recht des Staates Delaware
					gegründete und registrierte Gesellschaft. <br />
					Registernummer: 4152954, Secretary of State, State of Delaware. <br />
					Steuernr.: 204938068 <br />
					Vertretungsberechtigter: Associate General Counsel, EMEA
					<br />
					aws.amazon.com
					<br />
					Fax: +1 206 266-7010
					<br />
					Stand 26. Mai 2019
					<br />
				</p>
			</div>
		)
	}
}

const style = {
	paragraph: {
		textAlign: "justify"
	},
	title: {
		fontWeight: "bold"
	},
	container: {
		padding: 32
	}
}
