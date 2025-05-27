import Link from "next/link";

export default function StudentInfo(){
    return(
        <main>
            <h1 className="text-blue-900 text-2xl text-shadow-pink-200">Student Info</h1>
            <p>Student Name: komalpreet Kaur</p>
            <Link href="https://github.com/komalpreetkaur05/cprg306-assignments.git " className="hover: underline">Github Repository Link</Link>
        </main>
    );
}