import { useRouteError, isRouteErrorResponse } from 'react-router';

// ----------------------------------------------------------------------

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="flex min-h-screen flex-auto flex-col items-center bg-[#2c2c2e] px-[15px] pt-[10vh] font-sans text-white">
      <div className="flex w-full max-w-[960px] flex-col gap-6 rounded-lg bg-[#1c1c1e] p-5">
        {renderErrorMessage(error)}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------

function parseStackTrace(stack?: string) {
  if (!stack) return { filePath: null, functionName: null };

  const filePathMatch = stack.match(/\/src\/[^?]+/);
  const functionNameMatch = stack.match(/at (\S+)/);

  return {
    filePath: filePathMatch ? filePathMatch[0] : null,
    functionName: functionNameMatch ? functionNameMatch[1] : null,
  };
}

function renderErrorMessage(error: any) {
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1 className="m-0 text-xl leading-tight font-bold">
          {error.status}: {error.statusText}
        </h1>
        <p className="m-0 border-l-2 border-[#ff5555] bg-[#2a1e1e] p-3 px-4 font-mono text-sm leading-relaxed font-bold whitespace-pre-wrap text-[#ff5555]">
          {error.data}
        </p>
      </>
    );
  }

  if (error instanceof Error) {
    const { filePath, functionName } = parseStackTrace(error.stack);

    return (
      <>
        <h1 className="m-0 text-xl leading-tight font-bold">Unexpected Application Error!</h1>
        <p className="m-0 border-l-2 border-[#ff5555] bg-[#2a1e1e] p-3 px-4 font-mono text-sm leading-relaxed font-bold whitespace-pre-wrap text-[#ff5555]">
          {error.name}: {error.message}
        </p>
        <pre className="m-0 overflow-auto rounded-lg bg-[#111111] p-4 leading-relaxed text-[#e2aa53]">
          {error.stack}
        </pre>
        {(filePath || functionName) && (
          <p className="mt-0 text-[#2dd9da]">
            {filePath} ({functionName})
          </p>
        )}
      </>
    );
  }

  return <h1 className="m-0 text-xl leading-tight font-bold">Unknown Error</h1>;
}
