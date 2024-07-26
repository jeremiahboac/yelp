import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="container flex justify-center mx-auto my-10 transform translate-y-20">
      <SignUp />
    </div>
  )
}