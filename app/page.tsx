import Questions from "@/components/question/questions";
import ResponsiveSection from "@/components/ui/responsive-section";

export default function Home() {
  return (
    <div className="flex flex-col w-full gap-4  justify-center items-center ">
      <ResponsiveSection className="">
       <div className="w-full sm:max-w-[700px] mx-auto">
         <Questions />
       </div>
      </ResponsiveSection>
    </div>
  );
}
