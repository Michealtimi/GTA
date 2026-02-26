import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store (replace with DB or email service in production)
const waitlist: { email: string; vehicle: string }[] = [];

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const email = formData.get('email');
	const vehicle = formData.get('vehicle');

	if (!email || typeof email !== 'string') {
		return NextResponse.json(
			{ error: 'Email is required.' },
			{ status: 400 },
		);
	}

	// Store in memory (for demo; replace with DB or API call)
	waitlist.push({ email, vehicle: vehicle as string });

	// Respond with success
	return NextResponse.json({
		success: true,
		message: 'You have been added to the waitlist!',
	});
}
