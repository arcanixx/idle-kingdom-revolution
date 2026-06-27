"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground text-sm">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
