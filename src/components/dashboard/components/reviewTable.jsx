"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Tooltip,
} from "@nextui-org/react";
import { PenSquareIcon } from "lucide-react";
import Link from "next/link.js";

const columns = [
  {
    key: "firstName",
    label: "NAME ASKED",
  },
  {
    key: "projectName",
    label: "PROJECT NAME",
  },
  {
    key: "statusName",
    label: "STATUS",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

export const ReviewTable = ({ reviewsData }) => {
  return (
    <>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        {reviewsData.length > 0 ? (
          <TableBody items={reviewsData}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "firstName" ? (
                      <span>
                        {item.firstName} {item.lastName}
                      </span>
                    ) : columnKey === "action" ? (
                      item.status === "OP" ? (
                        <Link href={`/dashboard/review/${item.id}`}>
                          <Tooltip content="Review" closeDelay={100}>
                            <PenSquareIcon size={15} />
                          </Tooltip>
                        </Link>
                      ) : (
                        <span>
                          {item.statusName}
                        </span>
                      )
                    ) : (
                      getKeyValue(item, columnKey)
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        )}
      </Table>
    </>
  );
};
