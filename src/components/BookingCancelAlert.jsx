"use client";

import { AlertDialog, Button } from "@heroui/react";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/navigation";

export function BookingCancelAlert({ bookingId }) {
  const router = useRouter();
  //   console.log("bookingid ", bookingId);

  const handCancelBooking = async () => {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(`http://localhost:5000/booking/${bookingId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
    });
    const data = await res.json();
    if (data.acknowledged) {
      router.refresh();
    }
  };
  return (
    <AlertDialog>
      <Button variant="danger" className="text-3xl p-6">
        <MdDeleteForever className="w-7! h-7! shrink-0" />
        Cancel{" "}
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently cancel this booking and all of its data.
                This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={handCancelBooking}>
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
