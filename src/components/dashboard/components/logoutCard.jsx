import React from "react";
import Cookies from "js-cookie";
import { imageUrl } from "@/config/apiUrl";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

export const LogoutCard = ( {id, name, featuredImage,username, about}) => {
    const [isLoggedOut, setIsLoggedOut] = React.useState(false);
    const handleLogout = () => {
      // Delete the 'token' cookie
      Cookies.remove("token");
  
      // Redirect to the login page or other suitable page
      window.location.href = "/login";
    };
  return (
    <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          < isBordered radius="full" size="md" src={`${imageUrl}/projects/tr:w-300,h-200,c-at_max/${id}/${featuredImage}`}/>
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{name}</h4>
            <h5 className="text-small tracking-tight text-default-500">{username}</h5>
          </div>
        </div>
        <Button
          className={isLoggedOut ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isLoggedOut ? "bordered" : "solid"}
          onPress={() => setIsLoggedOut(handleLogout)}
        >
          {handleLogout ? "Log Out" : ""}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="text-small pl-px text-default-500">
          {about}
          <span aria-label="confetti" role="img">
            🎉
          </span>
        </p>
      </CardBody>
    </Card>
  );
};