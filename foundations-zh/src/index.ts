export interface ErrorMessage {
  message: string
  stack: {
    line: number
    column: number
    filename: string
  }[]
}

export function parseError(err: Error): ErrorMessage {

  // implement
  return {
    message:'demo',
    stack:[{
      line:1,
      column:1,
      filename:"demo"
    }]
  };
}
