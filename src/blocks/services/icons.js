/**
 * WordPress dependencies
 */
const { SVG, Path, G } = wp.components;

/**
 * Block user interface icons
 */
const icons = {};

icons.services = (
	<SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<G fill="currentColor" fillRule="nonzero">
			<Path d="m3 3h18v10h-18z"/>
			<Path d="m3 15h14v2h-14z"/>
			<Path d="m3 19h14v2h-14z" />
		</G>
	</SVG>
);

icons.service43 = (
	<svg height="32" viewBox="0 0 56 32" width="56" xmlns="http://www.w3.org/2000/svg">
		<g fill="currentColor" fill-rule="evenodd">
			<path d="m0 3h24v19.253906h-24z"/>
			<path className="service-svg-moving-path" d="m0 24h16v.8785807 1.1214193h-16z"/>
			<path className="service-svg-moving-path" d="m0 28h16v.8785807 1.1214193h-16z"/>
			<path d="m32 3h24v19.253906h-24z"/>
			<path className="service-svg-moving-path" d="m32 24h16v.8785807 1.1214193h-16z"/>
			<path className="service-svg-moving-path" d="m32 28h16v.8785807 1.1214193h-16z"/>
		</g>
	</svg>
);

icons.service169 = (
<svg height="32" viewBox="0 0 56 32" width="56" xmlns="http://www.w3.org/2000/svg">
	<g fill="currentColor" fill-rule="evenodd">
		<path d="m0 5h24v14h-24z"/>
		<path d="m32 5h24v14h-24z"/>
		<path className="service-svg-moving-path" d="m0 21h16v.8785807 1.1214193h-16z"/>
		<path className="service-svg-moving-path" d="m32 21h16v.8785807 1.1214193h-16z"/>
		<path className="service-svg-moving-path" d="m0 25h16v.8785807 1.1214193h-16z"/>
		<path className="service-svg-moving-path" d="m32 25h16v.8785807 1.1214193h-16z"/>
	</g>
</svg>
);

icons.serviceSquare = (
<svg height="32" viewBox="0 0 56 32" width="56" xmlns="http://www.w3.org/2000/svg">
	<g fill="currentColor" fill-rule="evenodd">
		<path d="m0 0h24v24h-24z"/>
		<path d="m32 0h24v24h-24z"/>
		<path className="service-svg-moving-path" d="m0 26h16v.8785807 1.1214193h-16z"/>
		<path className="service-svg-moving-path" d="m32 26h16v.8785807 1.1214193h-16z"/>
		<path className="service-svg-moving-path" d="m0 30h16v.8785807 1.1214193h-16z"/>
		<path className="service-svg-moving-path" d="m32 30h16v.8785807 1.1214193h-16z"/>
	</g>
</svg>
);

icons.serviceCircle = (
<svg height="32" viewBox="0 0 56 32" width="56" xmlns="http://www.w3.org/2000/svg">
	<g fill="currentColor" fill-rule="evenodd">
		<circle cx="12" cy="12" r="12"/>
		<path className="service-svg-moving-path" d="m0 26h16v.8785807 1.1214193h-16z"/>
		<path className="service-svg-moving-path" d="m32 26h16v.8785807 1.1214193h-16z"/>
		<path className="service-svg-moving-path" d="m0 30h16v.8785807 1.1214193h-16z"/>
		<path className="service-svg-moving-path" d="m32 30h16v.8785807 1.1214193h-16z"/>
		<circle cx="44" cy="12" r="12"/>
	</g>
</svg>
);

export default icons;
