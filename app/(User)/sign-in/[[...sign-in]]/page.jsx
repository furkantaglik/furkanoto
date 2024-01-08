import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Giriş Yap",
};

const SignInPage = () => {
  return (
    <section className=" lex flex-1 w-fit justify-center items-center mx-auto mt-20 mb-60">
      <SignIn />
    </section>
  );
};
export default SignInPage;
