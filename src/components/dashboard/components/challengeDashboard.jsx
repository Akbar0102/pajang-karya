import React from "react";
import { Card, CardBody } from "@nextui-org/react";

export const Challenge=()=>{
    return(
        <main className="space-y-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold ">Challenge</h1>
        <p>you got it.</p>
      </section>
      <section className="grid grid-cols-2 gap-6">
        <Card shadow="sm">
          <CardBody className="p-8 space-y-4">
            <h6>There's no available challenge yet.</h6>
          </CardBody>
        </Card>

        
      </section>
    </main>
    )
}