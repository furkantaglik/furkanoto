import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Kaydol",
};

const SignUpPage = () => {
  return (
    <section className="flex flex-1 w-fit justify-center items-center mx-auto mt-5  mb-60">
      <SignUp />
    </section>
  );
};
export default SignUpPage;
