const checkIframeLoaded = iframe => {
	const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

	if (iframeDoc.readyState == 'complete') {
		iframe.contentWindow.onload = () => {
			try {
				document.getElementById('preload').remove();
			} catch (error) {}
			iframe.style.display = 'block';
		};
		return;
	}

	iframe.src = iframe.src;

	window.setTimeout(() => {
		checkIframeLoaded(iframe);
	}, 100);
};

checkIframeLoaded(document.getElementById('iframe'));
checkIframeLoaded(document.getElementById('iframe2'));
checkIframeLoaded(document.getElementById('iframe3'));

document.getElementsByTagName(`title`)[0].innerHTML = `Scratch For Discord v${
	require(`${__filename}\\..\\..\\package.json`).version
}`;

setTimeout(() => {
	document.getElementById('ifTooLong').style.opacity = '1';
}, 20000);
