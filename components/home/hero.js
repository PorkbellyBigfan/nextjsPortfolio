import Link from "next/link";
import Animation from "./animation";

export default function Hero(){
  return(
    <>
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Welcome to Porkbelly's Portfolio page
          </h1>
          <p className="mb-8 leading-relaxed">안녕하세요. 저는 김형준이라고 합니다. 웹 개발자로 구직중인 상태구요.<br/>이것저것 해보고 있습니다.</p>
          <div className="flex justify-center">
            <Link href='/projects' legacyBehavior>
              <a className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">My Projects</a>
            </Link>
          </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <Animation/>
      </div>
    </>
  );
}