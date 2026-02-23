import Wizard from "./wizard";

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <Wizard token={token} />;
}