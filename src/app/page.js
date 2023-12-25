import { AllProducts, AllProjects } from "@/components/projects/allProjects";
import { apiUrl, imageUrl } from "@/config/apiUrl";
import {Button} from "@nextui-org/react";


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

        <AllProjects projectsData={data}/>
      </section>

    </main>);
}
