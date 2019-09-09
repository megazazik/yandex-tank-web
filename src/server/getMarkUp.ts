export default ({ includeCss = false } = {}): string => `
<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Yandex tank</title>
		${includeCss ? '<link rel="stylesheet" href="/static/index.css" />' : ""}
	</head>
	<body>
		<div id="content"></div>
		<script src="/static/index.js"></script>
	</body>
</html>`;
