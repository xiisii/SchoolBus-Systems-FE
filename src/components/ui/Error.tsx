import React from "react";

interface ErrorProps {
  statusCode: number;
  title: string;
}

const ErrorState: React.FC<ErrorProps> = (props) => {
  const { statusCode, title } = props;

  const text = `${statusCode}: ${title}`;

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-lg mx-auto py-16">
          <h1 className={`text-center text-4xl`}>{text}</h1>
        </div>
      </div>
    </>
  );
};

export default ErrorState;
