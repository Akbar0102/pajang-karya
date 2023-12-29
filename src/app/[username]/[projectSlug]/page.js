import { ProjectSingle } from '@/components/projects/projectSingle'
import { apiUrl } from '@/config/apiUrl';

async function getData(projectSlug) {
  const res = await fetch(`${apiUrl}/projects?slug=${projectSlug}`, { cache: 'no-cache' });
  const data = await res.json();
  return data;
}

export default async function Page({params}) {
  const { username, projectSlug } = params;
  const { data } = await getData(projectSlug)
  return <ProjectSingle data={data} />
}
