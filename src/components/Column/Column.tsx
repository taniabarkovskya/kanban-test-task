import { Heading, Skeleton, Stack } from "@chakra-ui/react";
import { useIssues } from "../../app/store";
import { columnTitle } from "../../utils/titleHelper";
import { IssueCard } from "../IssueCard";
import { Issue } from "@/types/Issue";

type Props = {
  issueName: string;
  issueArr: Issue[];
};

export const Column: React.FC<Props> = (props) => {
  const {issueName, issueArr} = props

  const loading = useIssues((state) => state.loading);

  return (
    <Stack rounded="md" bg="gray.900" padding="4" minHeight={600}>
      <Heading>{columnTitle(issueName)}</Heading>
      {loading ? (
        <Skeleton height={200} />
      ) : (
        <Stack padding="4">
          {issueArr.map((item) => (
            <IssueCard item={item} key={item.id} />
          ))}
        </Stack>
      )}
    </Stack>
  );
};
