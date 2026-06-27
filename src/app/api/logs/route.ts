import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { timestamp, level, message, file, functionName, stack, metadata } = body;

    logger.info("Email placeholder: would send error notification", "api/logs/route.ts", "POST", {
      timestamp, level, message, file, functionName, stack: stack ? stack.substring(0, 200) : undefined, metadata
    });

    // PLACEHOLDER: Replace with actual email service (Resend, SendGrid, etc.) when domain is set up
    // await sendEmail({
    //   to: "author@example.com",
    //   subject: `[Idle Kingdom Revolution] ${level}: ${message.substring(0, 80)}`,
    //   text: JSON.stringify(body, null, 2),
    // });

    return NextResponse.json({ ok: true, queued: true });
  } catch (err) {
    logger.error("Failed to process log entry", "api/logs/route.ts", "POST", err);
    return NextResponse.json({ ok: false, error: "Failed to process log entry" }, { status: 500 });
  }
}
