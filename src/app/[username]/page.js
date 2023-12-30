import { Profile } from "@/components/profile/profile";
import { Footer } from "@/components/sharedUI/footer";
import { Header } from "@/components/sharedUI/header";

const { apiUrl } = require("@/config/apiUrl");

async function getData(username) {

    const res = await fetch(`${apiUrl}/users?username=${username}`, { cache: 'no-cache' });
    const data = await res.json();
    return data;
}

export default async function Page({ params }) {
    const { username, projectSlug } = params;
    const { data } = await getData(username);
    return (
        <main className=" flex flex-col min-h-screen">
            <Header />
            <Profile profileData={data} />
            <Footer className=" hidden" />
        </main>
    )
}