import React from "react";
import { Issue } from "@/types/Issue";
import { Card, Heading, Link, Separator } from "@chakra-ui/react";

type Props = {
  item: Issue;
};

export const IssueCard: React.FC<Props> = (props) => {
  const { item } = props;

  const calculateDaysAgo = (createdAt: string): number => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    
    const diffInMs = currentDate.getTime() - createdDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Перетворення мілісекунд у дні
  
    return diffInDays;
  };

  return (
    <Card.Root rounded="md">
      <Card.Header>
        <Heading size="md">{item.title}</Heading>
      </Card.Header>
      <Card.Body color="fg.muted">#{item.number} opened {calculateDaysAgo(item.created_at)} days ago</Card.Body>
      <Card.Footer gap="4" justifyContent="flex-end">
        <Link href={item.user.html_url} target="_blank">Admin</Link>
        <Separator orientation="vertical" height="4" />
        <Link href={item.comments_url}>Comments: {item.comments}</Link>
      </Card.Footer>
    </Card.Root>
  );
};
