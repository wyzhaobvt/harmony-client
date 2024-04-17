import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Crown } from "lucide-react";

export default function AvailableTeams({ teams }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Teams</CardTitle>
        <CardDescription>Select a team to view files</CardDescription>
      </CardHeader>
      <CardContent>
        {teams.length
          ? teams
              .sort((a) => (a.owned ? -1 : 1))
              .map((team) => {
                return (
                  <div key={team.uid}>
                    <Button
                      asChild
                      variant="ghost"
                      className="rounded-none w-full justify-start"
                    >
                      <Link to={"/files/" + team.uid}>
                        {team.name}
                        {team.owned && (
                          <Crown className="ms-2 text-amber-500" />
                        )}
                      </Link>
                    </Button>
                    <Separator />
                  </div>
                );
                return (
                  <>
                    <Link
                      to={"/files/" + team.uid}
                      variant="ghost"
                      className="rounded-none w-full justify-start"
                    >
                      {team.name}
                    </Link>
                    <Separator />
                  </>
                );
              })
          : "No Teams"}
      </CardContent>
    </Card>
  );
}
