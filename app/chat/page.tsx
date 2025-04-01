import { Container } from "@mui/material";
import { Chat } from "../common/components/Chat/Chat";

export default function Page() {
  return (
    <Container
      maxWidth="md"
      sx={{
        paddingY: 4,
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Chat />
    </Container>
  );
}
