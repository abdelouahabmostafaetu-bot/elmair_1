import { SignUp } from "@clerk/nextjs"

export const dynamic = "force-dynamic"

const appearance = {
  elements: {
    formButtonPrimary: "bg-[#D4AF37] hover:bg-[#B8962B] text-[#0B192C]",
    headerTitle: "text-[#0B192C]",
  },
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy p-6">
      <SignUp
        appearance={appearance}
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
      />
    </div>
  )
}
