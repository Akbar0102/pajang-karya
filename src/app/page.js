import { AllProjects } from "@/components/projects/allProjects";
import { Footer } from "@/components/sharedUI/footer";
import { Header } from "@/components/sharedUI/header";
import { apiUrl, imageUrl } from "@/config/apiUrl";
import { Button, Image } from "@nextui-org/react";
import Link from "next/link";


async function getData(query) {
  if (!query) {
    const res = await fetch(`${apiUrl}/projects`, { cache: 'no-cache' });
    const data = await res.json();
    return data;
  }

  const res = await fetch(`${apiUrl}/projects?q=${query}`, { cache: 'no-cache' });
  const data = await res.json();
  return data;
}

export default async function Home({ searchParams }) {
  const { data } = await getData(searchParams.q);
  return (
    <>
      <Header />
      <main>
        <section className=" flex flex-col items-center justify-center mt-[130px]">
          <Button radius="full" className=" bg-black-100 px-6 py-4 text-white font-normal text-base">Over 3 million interesting project!</Button>
          <h1 className=" font-bold text-[52px] text-center text-black-50">Join newly developer<br></br>show their project</h1>
          <p className=" text-xl text-grey">Encourage your fellow developer by giving a positive feedback</p>
        </section>

        <section className=" flex flex-col items-center mt-[130px]">
          <h2 className=" font-semibold text-4xl pb-[53px]">Explore project</h2>
          <AllProjects projectsData={data} />
          <Button radius="full" className=" font-medium text-lg text-grey bg-white px-6 py-3.5 border-1.5 my-[53px]">View More</Button>
        </section>

        <section className=" grid xl:grid-cols-2 xl:gap-12 justify-center xl:mx-[185px] mx-8 mt-[53px]">
          <Image
            alt="code-review"
            className=" w-[615px] h-[409px] rounded-3xl"
            src="/images/code-review.png"
            width={615}
            height={409}
          />
          <div className=" mt-[30px]">
            <h3 className=" font-semibold text-base text-violet mb-[20px]">Review Code</h3>
            <h2 className=" font-semibold text-4xl mb-[30px]">Expert Review Code</h2>
            <p className=" font-normal text-grey text-base">Ask expert in software engineer to review your<br></br>project code</p>
            <div className=" flex gap-12 mt-[30px]">
              <div>
                <p className=" font-semibold text-xl text-black-50">
                  120+
                </p>
                <p className=" font-normal text-base text-grey">
                  Expert
                </p>
              </div>
              <div>
                <p className=" font-semibold text-xl text-black-50">
                  560+
                </p>
                <p className=" font-normal text-base text-grey">
                  Tech stack
                </p>
              </div>
              <div>
                <p className=" font-semibold text-xl text-black-50">
                  135K+
                </p>
                <p className=" font-normal text-base text-grey">
                  Project
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className=" flex flex-col items-center my-[107px]">
          <div className=" xl:w-[1240px] h-[435px] lg:w-3/4 md:w-3/4 sm:w-[2/3] min-w-[500px] bg-violet-light rounded-3xl flex flex-col justify-center items-center">
            <h3 className=" font-semibold text-base text-violet mb-[20px]">Challenge</h3>
            <h2 className=" font-semibold text-4xl mb-[15px] text-center ">Still eager to learn about coding</h2>
            <h2 className=" font-semibold text-4xl mb-[30px] text-center ">join our challenge</h2>
            <p className=" font-normal text-black-50 text-base text-center">Gain experience writing HTML, CSS, and Javascript by building practical components.<br></br>
              We handle the design aspect, allowing you to focus on coding so you can take your skills to the next level!</p>
            <Link href="/register">
              <Button className=" bg-violet text-white text-lg font-medium mt-[30px] px-6 py-3.5">Register Account</Button>
            </Link>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
