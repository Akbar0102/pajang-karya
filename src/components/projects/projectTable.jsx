import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";
import Link from "next/link.js";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "slug",
    label: "SLUG",
  },
  {
    key: "tech",
    label: "TECH",
  },
  {
    key: "action",
    label: "ACTION",
  },
];

export const ProjectTable = ({ projectsData }) => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (id) => {
    // Handle the delete action, e.g., show a confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);
        try {
          // Make the DELETE request
          const res = await fetch(`/api/projects/${id}`, {
            method: "DELETE",
            headers: {
              Cookie: `token=${token}`,
              // You may need additional headers depending on your server requirements
            },
          });

          if (res.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "Your project has been deleted.",
              icon: "success",
            }).then(() => {
              // Reload the page
              router.refresh();
            });
          } else {
            // Handle errors
            console.error(
              `Error deleting project with ID ${id}:`,
              res.status,
              res.statusText
            );
            Swal.fire(
              "Error",
              "Failed to delete the project. Please try again.",
              "error"
            );
          }
        } catch (error) {
          console.error("Error:", error);
          Swal.fire(
            "Error",
            "An unexpected error occurred. Please try again.",
            "error"
          );
        } finally {
          setIsDeleting(false);
        }
      }
    });
  };

  return (
    <>
      {isDeleting && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Spinner label="Loading.." color="primary" labelColor="primary"/>
        </div>
      )}

      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        {projectsData.length > 0 ? (
          <TableBody items={projectsData}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "action" ? (
                      <>
                        <Link href={`/dashboard/project/update/${item.id}`}>
                          Edit
                        </Link>{" "}
                        |{" "}
                        <button onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </>
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
