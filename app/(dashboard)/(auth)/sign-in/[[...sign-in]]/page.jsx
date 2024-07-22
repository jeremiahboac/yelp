import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="container flex justify-center mx-auto my-10">
      <SignIn />
    </div>
  )
}