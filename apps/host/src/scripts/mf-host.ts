const mountPoint = document.getElementById('remote-widget');
const statusEl = document.getElementById('remote-status');

const setStatus = (text: string): void => {
	if (statusEl) statusEl.textContent = text;
};

const showError = (error: string): void => {
	if (!mountPoint) return;
	mountPoint.innerHTML = '';
	const pre = document.createElement('pre');
	pre.textContent = String(error);
	mountPoint.appendChild(pre);
};

const start = async () => {
	try {
		const remote = await import('astro_remote/widget');
		remote.renderRemoteWidget(mountPoint, {
			from: 'Astro host',
			loadedAt: new Date().toISOString(),
		});
		setStatus('Remote loaded from astro_remote/widget');
	} catch (error) {
		setStatus('Remote load failed');
		const details = error instanceof Error ? error.stack || error.message : String(error);
		showError(details);
	}
};

setTimeout(() => {
	if (statusEl?.textContent === 'Loading remote module...') {
		setStatus('Still waiting for remote. Check remote dev server on :4322.');
	}
}, 4000);

start();
