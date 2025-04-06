"use client";

import { CreateEventInterceptedModal } from "@/app/common/components/Event/Create/CreateEventInterceptedModal";
import { useParams } from "next/navigation";

export default function Page() {
  const { id }: { id: string } = useParams();
  return <CreateEventInterceptedModal groupId={id} />;
}
