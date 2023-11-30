import ErrorComponent from "./NotFound"
import { useQueryErrorResetBoundary } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { ErrorBoundary as ErrorBoundaryComponent } from "react-error-boundary"

interface ErrorBoundaryProps {
  children: React.ReactNode
  isNull?: boolean
}

export const ErrorBoundary = ({
  children,
  isNull = false,
}: ErrorBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <ErrorBoundaryComponent
      onError={(error: Error) => {
        // 조건에 맞는 에러인 경우 해당 ErrorBonudary에서 처리하지 않고 상위로 throw 합니다.
        if (
          isAxiosError(error) &&
          error?.response?.status === 500 &&
          error?.response?.data === "CRITICAL_ERROR"
        ) {
          throw error
        }
      }}
      FallbackComponent={isNull ? () => null : ErrorComponent}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
        reset()
      }}
    >
      {children}
    </ErrorBoundaryComponent>
  )
}
