export default function GameLoading() {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="text-center space-y-4">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
        <p className="text-muted-foreground text-sm">Loading game data...</p>
      </div>
    </div>
  );
}
