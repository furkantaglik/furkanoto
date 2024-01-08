import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <section className=" lex flex-1 w-fit justify-center items-center mx-auto mt-20 mb-60">
      <SignUp />
    </section>
  );
};
export default SignUpPage;
