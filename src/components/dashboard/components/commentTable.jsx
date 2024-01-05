"use client"

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

const columns = [
  {
    key: "firstName",
    label: "NAME",
  },
  {
    key: "content",
    label: "CONTENT",
  },
];

export const CommentTable = ({ commentsData }) => {
  return (
    <>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        {commentsData.length > 0 ? (
          <TableBody items={commentsData}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "firstName" ? (
                      <span>{item.firstName} {item.lastName}</span>
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
