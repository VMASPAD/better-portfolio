"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getUserData } from "@/lib/formatData";
import GitHubPortfolio from "./minimal/page";
import GitHubPortfolioVercel from "./simple/page";
import GitHubPortfolioSupabase from "./rapy/page";
import GitHubPortfolioEnterprise from "./professional/page";
import BentoPortfolio from "./bento/page";

function PortfolioContent() {
  const [user, setUser] = useState<Awaited<ReturnType<typeof getUserData>>>();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchDataToView = async () => {
      const getData = await getUserData(searchParams.get("user") || "");
      setUser(getData);
    };
    fetchDataToView();
  }, [searchParams]);

  switch (searchParams.get("type")) {
    case "minimal":
      return <GitHubPortfolio user={user} />;
    case "simple":
      return <GitHubPortfolioVercel user={user} />;
    case "rapy":
      return <GitHubPortfolioSupabase user={user} />;
    case "professional":
      return <GitHubPortfolioEnterprise user={user} />;
    case "bento":
    default:
      return <BentoPortfolio user={user} />;
  }
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PortfolioContent />
    </Suspense>
  );
}
