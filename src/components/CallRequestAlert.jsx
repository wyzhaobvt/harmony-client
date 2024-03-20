import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function CallRequestAlert({from, acceptFunction, declineFunction}) {
  return (
    <Alert className="fixed top-14 right-2 w-max px-3 py-2 text-right shadow-md shadow-input">
      <AlertTitle>Incoming Call</AlertTitle>
      <AlertDescription className="flex flex-col items-end">
        <div className="pt-1 pb-2 w-fit">{from}</div>
        <div className="flex justify-end gap-3">
          <Button className="py-1 px-2 h-min" onClick={acceptFunction}>Accept</Button>
          <Button className="py-1 px-2 h-min" variant="destructive" onClick={declineFunction}>
            Decline
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
