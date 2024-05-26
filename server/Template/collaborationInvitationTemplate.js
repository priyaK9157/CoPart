const collaborationInvitationTemplate = (userName, interestedPersonName, interestedGmail,linkedin, github) => {
	return `<!DOCTYPE html>
	<html>

	<head>
		<meta charset="UTF-8">
		<title>Collaboration Invitation</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}

			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}

			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}

			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}

			.body {
				font-size: 16px;
				margin-bottom: 20px;
				text-align: left;
			}

			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}

			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}

			.highlight {
				font-weight: bold;
			}

			.profile-links {
				margin-top: 20px;
			}

			.profile-link {
				display: block;
				color: #1a0dab;
				text-decoration: none;
				margin-bottom: 10px;
			}
		</style>

	</head>

	<body>
		<div class="container">
			<a href="https://studynotion-edtech-project.vercel.app">
				<img class="logo" src="https://t3.ftcdn.net/jpg/03/15/59/52/360_F_315595201_Owbc34I9RVou1DXeOAiKXUZz2hjvQETf.jpg" alt="StudyNotion Logo">
			</a>
			<div class="message">Collaboration Invitation</div>
			<div class="body">
				<p>Dear ${userName},</p>
				<p>We are excited to inform you that ${interestedPersonName} is interested in collaborating with you on a project. Here are their professional profiles for your reference:</p>
				<div class="profile-links">
                    <p>this is the ${interestedPersonName} Gmail ${interestedGmail}</p>
					<a class="profile-link" href="${linkedin}" target="_blank">LinkedIn Profile</a>
					<a class="profile-link" href="${github}" target="_blank">GitHub Profile</a>
				</div>
				<p>${interestedPersonName} is enthusiastic about the opportunity to work with you and looks forward to discussing potential collaborations. Please feel free to reach out to them via their provided profiles.</p>
				<p>Thank you for considering this opportunity.</p>
				<p>Best regards,</p>
				<p>The CoPartner Team</p>
			</div>
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:info@CoPartner.com">info@Copartner.com</a>. We are here to help!</div>
		</div>
	</body>

	</html>`;
};

module.exports = collaborationInvitationTemplate;
