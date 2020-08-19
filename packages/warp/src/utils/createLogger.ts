export let createLogger = () => {
  return (err: any) => {
    if ((typeof err.data == 'string' || typeof err.data?.code == 'string') && typeof err.status == 'number') {
      console.error(`${err.status} - ${err.data?.code || err.data || 'Error in HTTP Handler'}`);
    } else {
      console.error(err.message || 'Error in HTTP Handler');
    }

    if (err?.stack) {
      console.error(err.stack);
    }
  };
};
