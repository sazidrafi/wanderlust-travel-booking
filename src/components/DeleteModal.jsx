"use client";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AlertDialog, Button } from "@heroui/react";
import { redirect } from "next/navigation";
const DeleteModal = ({ destinationName, id }) => {
  const handleDelete = async () => {
    // console.log("Delete button clicked!");
    const res = await fetch(
      `http://localhost:5000/destination/${id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      },
    );

      const data = await res.json();
    redirect('/destinations')
    // console.log(data);
  };
  return (
    <div>
      <AlertDialog>
        <Button
          variant="danger"
          className="bg-white text-red-500 rounded-none pt-8 pb-7 pl-7 pr-7 border text-2xl"
        >
          <RiDeleteBin6Line className="!w-6 !h-6 shrink-0" />
          Cancel
        </Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-100 md:max-w-150">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>
                  Delete travel Package ?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{destinationName}</strong> ?. This action cannot be
                  undone and will permanently remove this travel package from
                  the system.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button onClick={handleDelete} slot="close" variant="danger">
                  Delete Package
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DeleteModal;
