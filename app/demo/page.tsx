import { Stack } from "@mui/material";
import Link from "next/link";

export default function DemoPage() {
  return (
    <Stack gap={1}>
      <Link href="/demo/typography">Typography</Link>
    </Stack>
  );
}
