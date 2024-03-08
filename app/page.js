import CoolLayout from "@/components/CoolLayout";
import Hero from "@/components/Hero";
import Main from "@/components/Main";
import Product from "@/components/Product";
import RegisterBtn from "@/components/RegisterBtn";

export default function Home() {

  return (
    <CoolLayout>
      <Main>
        <Hero />
        <Product />
        <RegisterBtn />
        {/* <div className="flex flex-col gap-4">
          <div className="mx-auto">
            <h4
              className="jetbrains text-center font-bold text-4xl sm:text-5xl md:text-6xl text-slate-800  py-4 sm:py-6 md:py-8"
            >
              Sign Up <span className="jetbrains blueGradient">Today</span>
            </h4>
          </div>
        </div> */}
      </Main >
    </CoolLayout>
  );
}
