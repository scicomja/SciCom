import React from "react"

export default class ImpressumPage extends React.Component {
	render() {
		return (
			<div style={style.container}>
				<h3 style={style.title}>Impressum</h3>
				<h4>Angaben gemäß § 5 TMG</h4>
				<p style={style.paragraph}>
					Technische Universität München <br /> Arcisstraße 21 <br /> 80333
					München
				</p>
				<h5>Vertreten durch:</h5>
				<p style={style.paragraph}>
					Die Technische Universität München wird gesetzlich vertreten durch den
					Präsidenten Prof. Dr. Dr. h.c. mult. Wolfgang A. Herrmann. Die
					Technische Universität München ist gemäß Art. 11 Abs. 1 S. 1 BayHSchG
					eine Körperschaft des öffentlichen Rechts mit dem Recht der
					Selbstverwaltung im Rahmen der Gesetze und zugleich gemäß Art. 1 Abs.
					2 Satz 1 Nr. 1 BayHSchG staatliche Hochschule (staatliche
					Einrichtung). Die Technische Universität München nimmt eigene
					Angelegenheiten als Körperschaft (Körperschaftsangelegenheiten) unter
					der Rechtsaufsicht der Aufsichtsbehörde, staatliche Angelegenheiten
					als staatliche Einrichtung wahr (Art. 12 Abs. 1 BayHSchG).
				</p>
				<h5>Inhaltlich verantwortlich</h5>
				<p style={style.paragraph}>
					TUM: Junge Akademie <br />
					Team SciCom <br />
					Arcisstr. 21 <br />
					80333 München <br />
					E-Mail: insights(at)ja.tum.de
				</p>
				<h4>Konzept und Umsetzung</h4>
				<p style={style.paragraph}>
					Für das Konzept von SciCom wurde von dem gleichnamigen TUM: Junge
					Akademie Team (Jahrgang 2017/II) während ihrer Projektzeit
					ausgearbeitet.
				</p>
				<h5>Haftung für Inhalte</h5>
				<p style={style.paragraph}>
					Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
					auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
					§§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
					verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
					überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
					Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
					Nutzung von Informationen nach den allgemeinen Gesetzen bleiben
					hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
					Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
					Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
					Inhalte umgehend entfernen.
				</p>
				<h5>Haftung für Links</h5>
				<p style={style.paragraph}>
					Unser Angebot enthält Links zu externen Websites Dritter, auf deren
					Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
					fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
					verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
					Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
					Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
					Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
					permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
					konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
					Bekanntwerden von Rechtsverletzungen werden wir derartige Links
					umgehend entfernen.
				</p>
				<h5>Urheberrecht</h5>
				<p style={style.paragraph}>
					Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
					Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
					Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
					Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
					jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
					sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
					Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
					wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
					Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf
					eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
					entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
					werden wir derartige Inhalte umgehend entfernen. Quelle: eRecht24
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
