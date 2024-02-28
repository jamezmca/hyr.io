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
      </Main >
    </CoolLayout>
  );
}
