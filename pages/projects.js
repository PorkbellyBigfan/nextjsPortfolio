import Layout from "@/components/layout";
import Head from "next/head";
import {TOKEN, DATABASE_ID} from "@/config"
import ProjectItem from "@/components/projects/project-item";

export default function Projects({projects}){


  return(
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen px-5 py-24 mb-30">
        <Head>
          <title>Porkbelly&apos;s Projects</title>
          <meta name='description' content='Porkbelly is good'/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <h1 className="text-4xl font-bold sm:text-6xl">Porkbelly&apos;s Project</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 py-10 m-6 gap-8 sm:w-full">
          {projects.results.map((aProject)=>(
            <ProjectItem key={aProject.id} data={aProject}/>
            ))}
        </div>
      </div>
    </Layout>
  )
}

// getStaticProps는 빌드 타임에 호출이 됨 그 이후로는 X
// Notion API를 사용하여 DB에 있는 데이터를 Fetching 할것인데 여기에 필요한 설정들을 입력하는 Options
export async function getStaticProps(context) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'content-type': 'application/json',
      Authorization:`Bearer ${TOKEN}`
    },
    body: JSON.stringify({
      sorts: [
        {
          "property" : "Name",
          "direction" : "ascending"
        }
      ],
      page_size: 100
    })
  };
  //dotenv를 사용하여 환경변수를 외부유출 방지. Database_id인 데이터베이스에 접근하는데 필요한 options를 들고있음
  //await는 데이터를 fetching해 올때까지 대기한다. 비동기 작업이기때문에.
  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, options)
  // 가져온 데이터를 JSON 타입으로 변환
  const projects = await res.json()

  const projectNames = projects.results.map((project)=>(
    project.properties.Name.title[0].plain_text 
  ))
  console.log("Server side : projectNames >> "+projectNames);

  return {
    props: {projects}, // will be passed to the page component as props
  }
}