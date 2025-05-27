import Link from "next/link";
import StudentInfo from "./student-info";

export default function Page() {
  return (
    <main>
      <h1 className="text-3xl text-center">Shopping List</h1>
      <StudentInfo />
    </main>

  );
}