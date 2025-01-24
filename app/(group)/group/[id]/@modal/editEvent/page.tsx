import { CreateEventIntercepted } from "@/app/common/components/Event/Create/create-event-intercepted";
import { getSearchCategories } from "@/app/mock/mock-api";

export default function Page() {
  return (
    <CreateEventIntercepted
      type="edit"
      details={{
        categories: getSearchCategories(),
        description: "Irure eu ad non tempor nisi commodo elit ad laborum ea Lorem commodo eu aute.",
        name: "Ea ea do laborum duis excepteur voluptate qui.",
      }}
      dateAndLocation={{
        date: "2020-10-10",
        from: "10:00:00",
        to: "11:30:00",
      }}
    />
  );
}
