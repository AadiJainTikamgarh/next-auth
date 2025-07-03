export default function UserProfile({ params }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile Page
        <span className="p-2 rounded bg-orange-500 text-black ml-2">
          {params.id.replace("%20", " ")}
        </span>
      </p>
    </div>
  );
}
