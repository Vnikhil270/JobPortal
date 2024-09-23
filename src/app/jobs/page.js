import JobList from "@/components/jobs/jobList";

export default async function JobsPage({ searchParams }) {
  const page = searchParams?.page || 1;
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Basic 6dbbff94-fb66-4fcc-ac9a-69134518b284"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs?page=${page}`,
    requestOptions
  );
  console.log(res.ok);
  if (!res.ok) {
    throw new Error("Failed to fetch jobs data");
  }
  const data = await res.json();

  return (
    <div>
      <JobList
        jobsData={data.result}
        totalPages={data.pagination.totalPages}
        currentPage={page}
        totalJobs={data.pagination.totalJobs}
      />
    </div>
  );
}
