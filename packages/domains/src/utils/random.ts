export function randomCuid2() {
	const timestamp = Date.now().toString(36); // Base 36 for shorter output
	let counter = 0; // Simple counter for within-millisecond uniqueness
	const maxCounter = 999; // Maximum value for the counter

	// A simple and somewhat unique "fingerprint" for the generating process.
	// In a real-world scenario, you might want something more robust for
	// highly distributed systems (e.g., process ID, hostname hash).
	const fingerprint = Math.random().toString(36).substring(2, 6);

	// Increment the counter, reset if it reaches maxCounter
	if (counter >= maxCounter) {
		counter = 0;
	} else {
		counter++;
	}

	const randomString = Math.random().toString(36).substring(2);

	// Combine components. The order is chosen to provide good distribution
	// and some level of human readability/sortability by timestamp if needed.
	return `${timestamp}${fingerprint}${counter.toString(36)}${randomString}`;
}
