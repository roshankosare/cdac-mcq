import ResponsiveSection from "./ui/responsiveSection";

type ErrorProps = {
  message: string;
};

export const ErrorPage: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <ResponsiveSection className="flex flex-col justify-center items-center">
        <p className="text-center text-sm font-bold text-gray-700 sm:text-lg lg:text-xl">
          {message}
        </p>
      </ResponsiveSection>
    </div>
  );
};
