import { Group} from "@chakra-ui/react";
import { Column } from "../Column/Column";
import { useIssues } from "../../app/store";

export const ColumnsContainer = () => {
  const issues = useIssues((state) => state.issues);
  return (
    <Group align="flex-start" gap="4" grow>
      {Object.entries(issues).map(([issueName, issueArr]) => (
        <Column issueName={issueName} issueArr={issueArr} />
      ))}
    </Group>
  );
};
