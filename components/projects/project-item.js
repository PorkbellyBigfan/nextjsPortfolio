import Image from "next/legacy/image"

export default function ProjectItem({data}) {
  const title = data.properties.Name.title[0].plain_text
  const tags = data.properties.Tag.multi_select
  const imgSrc = data.cover.file?.url || data.cover.external.url
  const description = data.properties.Description.rich_text[0].plain_text
  
  const githubLink = data.properties.Github.rich_text[0].text.link.url

  const start = data.properties.Date.date.start
  const end = data.properties.Date.date.end

  const calculatedPeriod = (start, end) => {
    const startDateStringArray = start.split('-');
    const endDateStringArray = end.split('-');

    var startDate = new Date(startDateStringArray[0], startDateStringArray[1], startDateStringArray[2]);
    var endDate = new Date(endDateStringArray[0], endDateStringArray[1], endDateStringArray[2]);

    const diffInMs = Math.abs(endDate - startDate);
    const result = diffInMs / (1000 * 60 * 60 * 24);

    console.log(`기간 : ${result}`)
    return result;
};

  return(
    <div className="project-card">
      {/* 이미지 주소 확인용 */}
      console.log(imgSrc);
      <Image
          className="rounded-t-xl"
          src={imgSrc}
          alt="cover image"
          width="100%"
          height="50%"
          layout="responsive"
          objectFit="cover"
          quality={100}
      />
      <div className="p-4 flex flex-col">
        <h1 className="text-2xl font-bold">{title}</h1>
        <h3 className="mt-8 text-xl">{description}</h3>
        <a href={githubLink} className="mt-5 mb-5 w-fit">
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        </a>
        <div className="flex items-start mt-2 flex-wrap gap-y-1">
          {tags.map((aTag)=>(
            <h1 className={`px-2 py-1 mr-2 rounded-md bg-sky-600 dark:bg-sky-700`} key={aTag.id}>{aTag.name}</h1>
          ))}
        </div>
        <p className="my-5">
            작업기간 : {start} ~ {end} ({calculatedPeriod(start, end)}일)
        </p>
      </div>
    </div>
  )
}
