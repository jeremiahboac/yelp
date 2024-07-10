import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="container flex justify-center py-10 mx-auto my-10">
      <SignIn />
    </div>
  )
}