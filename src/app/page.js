import { AllProducts, AllProjects } from "@/components/projects/allProjects";
import { apiUrl, imageUrl } from "@/config/apiUrl";
import { Button, Image } from "@nextui-org/react";


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
    <main>
      <section className=" flex flex-col items-center justify-center mt-[208px]">
        <Button radius="full" className=" bg-black-100 px-6 py-4 text-white font-normal text-base">Over 3 million interesting project!</Button>
        <h1 className=" font-bold text-[52px] text-center text-black-50">Join newly developer<br></br>show their project</h1>
        <p className=" text-xl text-grey">Your plain project is also a project</p>
      </section>

      <section className=" flex flex-col items-center pt-[130px]">
        <h2 className=" font-semibold text-4xl pb-[53px]">Explore project</h2>
        <AllProjects projectsData={data} />
        <Button radius="full" className=" font-medium text-lg text-grey bg-white px-6 py-3.5 border-1.5 my-[53px]">View More</Button>
      </section>

      <section className=" grid xl:grid-cols-2 xl:gap-12 justify-center xl:mx-[185px]">
        <Image
          alt="code-review"
          className=" w-[615px] h-[409px] rounded-3xl"
          src="/images/code-review.png"
          width={615}
          height={409}
        />
        <div className=" mt-[53px]">
          <h3 className=" font-semibold text-base text-violet">Review Code</h3>
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
              <p  className=" font-normal text-base text-grey">
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

    </main>);
}
