const joiErrorCustomizer = (errors: any): string[] =>
  errors.details.map((error: any) => error.message);

export default joiErrorCustomizer;
