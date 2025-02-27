// import React from "react";
import { useState } from "react";
import { useIssues, useUrl } from "../../app/store";

import { Button, Flex, Input, Breadcrumb } from "@chakra-ui/react";

export const Header = () => {
  const [url, setUrl] = useState("");

  const urlParts = url.split("/");
  const ownerPart = urlParts[urlParts.length - 2];
  const repoPart = urlParts[urlParts.length - 1];

  const loading = useIssues((state) => state.loading);
  const fetchIssues = useIssues((state) => state.fetchIssues);

  const currentUrl = useUrl((state) => state.currentUrl);
  const updateCurrentUrl = useUrl((state) => state.updateCurrentUrl);

  const currentUrlParts = currentUrl.split("/");
  const currentOwnerPart = currentUrlParts[currentUrlParts.length - 2];
  const currentRepoPart = currentUrlParts[currentUrlParts.length - 1];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!url) {
      return;
    }
    updateCurrentUrl(url);
    await fetchIssues(ownerPart, repoPart);

    setUrl("");
  };

  return (
    <>
      <form onSubmit={(event) => handleSubmit(event)}>
        <Flex gap="2">
          <Input
            type="text"
            placeholder="Enter repo Url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
          <Button loading={loading} type="submit">
            Load issues
          </Button>
        </Flex>
      </form>
      {currentUrl && (
        <Breadcrumb.Root marginY="4">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href={currentUrl}>
                {currentOwnerPart}
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link href={currentUrl}>
                {currentRepoPart}
              </Breadcrumb.Link>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
      )}
    </>
  );
};
