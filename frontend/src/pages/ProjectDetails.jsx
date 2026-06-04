import { useParams } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams();

  return (
    <main>
      <h1>Project Details</h1>

      <p>Project ID:</p>

      <p>{id}</p>
    </main>
  );
}
