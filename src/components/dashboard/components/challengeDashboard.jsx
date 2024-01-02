import React from "react";
import { Card, CardBody } from "@nextui-org/react";

export const Challenge=()=>{
    return(
        <main className="space-y-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold ">Dashboard</h1>
        <p>This is your progressssssssssssss so far, you rock it🤟.</p>
      </section>
      <section className="grid grid-cols-2 gap-6">
        <Card shadow="sm">
          <CardBody className="p-8 space-y-4">
            <h6>Project Count</h6>
            <h1>0</h1>
          </CardBody>
        </Card>
        <Card shadow="sm">
          <CardBody className="p-8 space-y-4">
            <h6>Challenge Done</h6>
            <h1>0</h1>
          </CardBody>
        </Card>
        
      </section>
    </main>
    )
}