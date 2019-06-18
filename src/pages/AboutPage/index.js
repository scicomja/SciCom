import React from "react"
export default class AboutPage extends React.Component {
	render() {
		return (
			<div className="center" style={style.container}>
				<h4>The Project</h4>
				<p style={style.paragraph}>
					Team SciCom is a part of the year 2017/II of the TUM: Junge Akademie
					scholarship program. The project topic is ‘the influence of
					communication of scientific insights on political decision-making
					processes’. Our goal is to develop a platform to foster increased
					collaboration between university students and local politicians in
					Bavaria. Interviews and surveys - with both politicians and students -
					show that there is mutual interest in increased interaction and a
					desire to collaborate. Especially in local politics, the opportunity
					to incorporate external scientific advice is often feasible due to
					time and cost reasons. On the other hand, students are looking for
					co-operation partners for theses and internships with the ambition to
					do scientific work. Combining these two interests for a mutually
					beneficial relationship is the central concern of Team SciCom.
				</p>
				<h4>The Website</h4>
				<p>
					This website has been developed with the aim to support local
					politicians in their job as well as to get university students
					motivated to participate in politics. The website offers both groups
					the opportunity to get in touch with each other and to exchange
					tenders and applications. The key feature of the website is a
					tendering platform for politicians to float internships, theses or
					student-assistant jobs. Search functions are integrated to enable both
					parties to develop a personal contact in case of mutual interest.
				</p>
				<h4>The Team</h4>
				<ul>
					<li>Barbara Gleißl</li>
					<li>Sebastian Leicher</li>
					<li>Himanshu Panandikar</li>
					<li>Sabrina Schwarzmeier</li>
					<li>Sebastian Siegel</li>
					<li>Patrick Strobl</li>
					<li>Maryam Tatari</li>
					<li>Victoria Treßel</li>
				</ul>
				<h4>With Support From</h4>
				<h5>Tutors</h5>
				<ul>
					<li>Alexander Biederer</li>
					<li>Matthias Lehner</li>
					<li>Xenia Priebe</li>
				</ul>

				<h5>Mentors</h5>
				<ul>
					<li>Alexander Biederer</li>
					<li>Matthias Lehner</li>
					<li>Xenia Priebe</li>
				</ul>

				<h5>Coder</h5>
				<ul>
					<li>Travis Tang</li>
				</ul>

				<h5>TUM: Junge Akademie Office</h5>
				<ul>
					<li>Peter Finger</li>
					<li>Maria Hannecker</li>
				</ul>
			</div>
		)
	}
}

const style = {
	container: {
		padding: 32,
		paddingLeft: 64,
		paddingRight: 64
	},
	paragraph: {
		textAlign: "justify"
	}
}
